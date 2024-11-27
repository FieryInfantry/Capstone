import React, { useLayoutEffect, useState,useEffect,} from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import BudgetModal from "./SetBudgetModal"; // Ensure this component exists and is properly implemented
import { useNavigation,useFocusEffect  } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import styles from "../Styles/BudgetStyles";
import { useCallback } from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import BudgetStyles from "../Styles/BudgetStyles";
import { useUser } from "../Context/UserContext"; 

const categories = [
  { id: '1', name: 'Baby', icon: '🍼' },
  { id: '2', name: 'Beauty', icon: '💄' },
  { id: '3', name: 'Bills', icon: '🧾' },
  { id: '4', name: 'Car', icon: '🚗' },
  { id: '5', name: 'Clothing', icon: '👗' },
  { id: '6', name: 'Education', icon: '🎓' },
];

const BudgetScreen = () => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("Budget"); // To toggle between "Budget" and "Income & Expense"
  const [budgets, setBudgets] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [bankBalance, setBankBalance] = useState(0); // Add state for bank balance
  const [expenses, setExpenses] = useState([]); 
  const [incomes, setIncomes] = useState([]);
  // Fetch bank balance (simulated function)
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility of the amount
  const { theme } = useUser(); // 'dark' or 'light'
  const isDarkMode = theme === 'dark';
  const toggleVisibility = () => {
    setIsVisible(!isVisible); // Toggle visibility
  };
  const fetchBankBalance = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  

      const response = await fetch('http://192.168.0.115:3000/banks/balances', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.totalBalance !== undefined && data.totalBalance !== null) {
          setBankBalance(data.totalBalance); // Update the bank balance
        } else {
          Alert.alert('Error', 'Failed to fetch bank balance.');
        }
      } else {
        console.error('Failed to fetch bank balance:', response.statusText);
        Alert.alert('Error', 'Failed to fetch bank balance');
      }
    } catch (error) {
      console.error('Error fetching bank balance:', error);
      Alert.alert('Error', 'An error occurred while fetching the bank balance');
    }
  };
  
  

  const fetchExpenses = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch(
        `http://192.168.0.115:3000/expenses/monthly?month=${month + 1}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched expenses:', data);
        setExpenses(data); // Store the expenses in the state
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to fetch expenses.');
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'An error occurred while fetching expenses.');
    }
  };

  const fetchIncomes = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch(
        `http://192.168.0.115:3000/incomes/monthly?month=${month + 1}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched incomes:', data);
        setIncomes(data); // Store the incomes in the state
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to fetch incomes.');
      }
    } catch (error) {
      console.error('Error fetching incomes:', error);
      Alert.alert('Error', 'An error occurred while fetching incomes.');
    }
  };
  
  
  
  
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  };


  const handleSaveBudget = async (categoryName, amount, currentDate) => {
    const amountFloat = parseFloat(amount); // Convert to float
  
    if (isNaN(amountFloat) || amountFloat <= 0) {
      Alert.alert('Error', 'Invalid amount entered');
      return;
    }
  
    const month = currentDate.getMonth() + 1; // Get month (1-12)
    const year = currentDate.getFullYear(); // Get the year
  
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      // Fetch the bank balance from the backend
      const bankBalanceResponse = await fetch('http://192.168.0.115:3000/banks/balances', { // Replace with your IP
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!bankBalanceResponse.ok) {
        Alert.alert('Error', 'Failed to fetch bank balance');
        return;
      }
  
      const bankBalanceData = await bankBalanceResponse.json();
      const bankBalance = bankBalanceData.totalBalance; // Assume bankBalance contains the available balance
  
      if (amountFloat > bankBalance) {
        Alert.alert('Error', 'The budget exceeds the available bank balance');
        return;
      }
  
      // Save the budget to the backend
      const response = await fetch('http://192.168.0.115:3000/budget', { // Replace with your IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: categoryName,
          amount: amountFloat,
          month,
          year,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setBudgets((prevBudgets) => ({
          ...prevBudgets,
          [categoryName]: { limit: data.amount, spent: 0 },
        }));
        setModalVisible(false); // Close the modal on success
        Alert.alert('Success', 'Budget saved successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to save the budget');
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      Alert.alert('Error', 'An error occurred while saving the budget');
    }
  };
  
  
  
  
  const fetchBudgets = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch(
        `http://192.168.0.115:3000/budget/monthly?month=${month + 1}&year=${year}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        const budgets = data.reduce((acc, curr) => {
          acc[curr.category] = { limit: curr.amount, spent: curr.spent || 0 };
          return acc;
        }, {});
        setBudgets(budgets);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to fetch budgets.');
      }
    } catch (error) {
      console.error('Error fetching budgets:', error);
      Alert.alert('Error', 'An error occurred while fetching budgets.');
    }
  };

  const deleteBudget = async (categoryName) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch(
        `http://192.168.0.115:3000/budget?category=${categoryName}&month=${month + 1}&year=${year}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.ok) {
        // Remove the budget from the local state
        setBudgets((prevBudgets) => {
          const updatedBudgets = { ...prevBudgets };
          delete updatedBudgets[categoryName];
          return updatedBudgets;
        });
        Alert.alert('Success', 'Budget deleted successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to delete the budget.');
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      Alert.alert('Error', 'An error occurred while deleting the budget.');
    }
  };
  
  

  useFocusEffect(
    useCallback(() => {
      fetchBankBalance(); // Fetch the bank balance when the screen is focused
    }, [])
  );
  
  useFocusEffect(
    useCallback(() => {
      fetchBudgets(); // Fetch the budgets when the month or year changes and screen is focused
    }, [month, year])
  );
  
  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
      fetchIncomes(); // Fetch expenses and incomes when the month or year changes and screen is focused
    }, [month, year])
  );
  
  const deleteIncome = async (incomeId) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
    
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
      console.log('Deleting income with ID:', incomeId); // Corrected to incomeId

      const response = await fetch(
        `http://192.168.0.115:3000/income/${incomeId}`, // Using _id as the identifier
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    
      if (response.ok) {
        // Remove the income from the local state
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income._id !== incomeId));
        Alert.alert('Success', 'Income deleted successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to delete the income.');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      Alert.alert('Error', 'An error occurred while deleting the income.');
    }
};

  const deleteExpense = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch(
        `http://192.168.0.115:3000/expense/${id}`,  // Using ID in the URL
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const responseData = await response.json();
  
      if (response.ok) {
        // Remove the expense from the local state or trigger a re-fetch of the expenses list
        Alert.alert('Success', responseData.message);
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
      } else {
        Alert.alert('Error', responseData.error || 'An error occurred while deleting the expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      Alert.alert('Error', 'An error occurred while deleting the expense');
    }
  };
  const dynamicStyles = {
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? '#1A1A19' : '#F6FCDF',
    },
    text: {
      color: isDarkMode ? '#FFF' : '#000',
    },
    card: {
      backgroundColor: isDarkMode ? '#2A2A2A' : '#FFF',
      borderRadius: 8,
      padding: 10,
      marginVertical: 8,
    },
    button: {
      backgroundColor: isDarkMode ? '#31511E' : '#859F3D',
      borderRadius: 5,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#4CAF50',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  
  
  
  const calculateRemaining = (limit, spent) => Math.max(limit - spent, 0);

  const renderBudgetContent = () => {
    // Calculate spent dynamically based on expenses
    const updatedBudgets = Object.entries(budgets).reduce((acc, [category, details]) => {
      const categoryExpenses = expenses.filter((expense) => expense.category === category);
      const totalSpent = categoryExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
  
      acc[category] = { ...details, spent: totalSpent }; // Update spent property
      return acc;
    }, {});
  
    return (
      <View style={{ flex: 1 }}>
        {/* Summary Section */}
<View style={[BudgetStyles.summary, {}]}>
  <View style={BudgetStyles.amountContainer}>
    <Text style={BudgetStyles.summaryAmount}>
      ₱{Object.values(updatedBudgets).reduce((sum, b) => sum + (b.limit || 0), 0).toFixed(2)}
    </Text>
    <Text style={BudgetStyles.summaryText}>TOTAL BUDGET</Text>
  </View>

  <View style={BudgetStyles.separator} />

  <View style={BudgetStyles.amountContainer}>
    <Text style={BudgetStyles.summaryAmountSpent}>
      ₱{Object.values(updatedBudgets).reduce((sum, b) => sum + (b.spent || 0), 0).toFixed(2)}
    </Text>
    <Text style={BudgetStyles.summaryText}>TOTAL SPENT</Text>
  </View>
</View>


  
        {/* Budgeted Categories */}
        <Text style={[BudgetStyles.sectionHeader, {color : theme === 'dark' ? '#fff' : '#000'}]}>
          Budgeted categories: {getMonthName(month)}, {year}
        </Text>
        {Object.keys(updatedBudgets).length > 0 ? (
          <FlatList
            data={Object.entries(updatedBudgets).map(([name, details]) => ({
              name,
              ...details,
            }))}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={[BudgetStyles.budgetCard, {backgroundColor: theme === 'dark' ? '#2A2A2A' : '#fff' }]}>
                <Text style={[BudgetStyles.budgetCardHeader,{ color: theme === 'dark' ? '#fff' : '#000' }]}>{item.name}</Text>
                <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Limit: ₱{item.limit.toFixed(2)}</Text>
                <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Spent: ₱{item.spent.toFixed(2)}</Text>
                <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                  Remaining: ₱{calculateRemaining(item.limit, item.spent).toFixed(2)}
                </Text>
                <View style={BudgetStyles.progressBar}>
                  <View
                    style={{
                      ...BudgetStyles.progress,
                      width: `${Math.min((item.spent / item.limit) * 100, 100)}%`,
                      backgroundColor: item.spent > item.limit ? "red" : "#4caf50",
                    }}
                  />
                </View>
                {item.spent > item.limit && <Text style={BudgetStyles.limitExceeded}>*Limit exceeded</Text>}
                <TouchableOpacity
                  style={BudgetStyles.deleteButton}
                  onPress={() => deleteBudget(item.name)}
                >
                  <Text style={BudgetStyles.deleteButtonText}>DELETE</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={BudgetStyles.noBudgetText}>
            No budgets set for this month. Start by setting your budgets below.
          </Text>
        )}
  
  <TouchableOpacity
          style={BudgetStyles.floatingButton} // Reuse floatingButton style, adjust position
          onPress={() => setModalVisible(true)} // Open the modal
        >
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  
  

  const renderIncomeExpenseContent = () => {
    // Helper function to limit the items to 5
    const getLimitedItems = (items) => {
      return items.slice(-5); // Slice the last 5 items
    };
  
    return (
      <View style={BudgetStyles.incomeExpenseContainer}>
        <Text style={[BudgetStyles.sectionHeader,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Income & Expense:</Text>
  
        {/* Income Section */}
        <Text style={[BudgetStyles.sectionHeader,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Income</Text>
        {incomes.length > 0 ? (
          <FlatList
            data={getLimitedItems(incomes)}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              const amount = parseFloat(item.amount);
              return (
                <View style={[BudgetStyles.cardContainer, {backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF'}]}>
                  <View style={[BudgetStyles.expenseCard, {backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F6FCDF'}]}>
                    <Text style={[BudgetStyles.budgetCardHeader, { color: theme === 'dark' ? '#fff' : '#000' }]}>{item.name}</Text>
                    <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>

                       ₱+{!isNaN(amount) ? amount.toFixed(2) : 'Invalid amount'}
                    </Text>
                    <View style={BudgetStyles.incomeDetailsContainer}>
                    <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Category: {item.category}</Text>
                      <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </Text>
                      <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Bank: {item.bank || 'N/A'}</Text>
                    </View>
                    <TouchableOpacity
                      style={BudgetStyles.deleteButton}
                      onPress={() => deleteIncome(item._id)} // Delete income
                    >
                      <Text style={BudgetStyles.deleteButtonText}>DELETE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={BudgetStyles.noDataText}>No income for this month.</Text>
        )}
  
        {/* Expense Section */}
        <Text style={[BudgetStyles.sectionHeader,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Expenses</Text>
        {expenses.length > 0 ? (
          <FlatList
            data={getLimitedItems(expenses)}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              const amount = parseFloat(item.amount);
              return (
                <View style={[BudgetStyles.cardContainer, {backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF'}]}>
                  <View style={[BudgetStyles.expenseCard, {backgroundColor: theme === 'dark' ? '#2a2a2a' : '#F6FCDF'}]}>
                    <Text style={[BudgetStyles.budgetCardHeader, { color: theme === 'dark' ? '#fff' : '#000' }]}>{item.name}</Text>
                    <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                      ₱-{!isNaN(amount) ? amount.toFixed(2) : 'Invalid amount'}
                    </Text>
                    <View style={BudgetStyles.expenseDetailsContainer}>
                      <Text style={[BudgetStyles.budgetDetails,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Category: {item.category}</Text>
                      <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>
                        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </Text>
                      <Text style={[BudgetStyles.budgetDetails, { color: theme === 'dark' ? '#fff' : '#000' }]}>Bank: {item.bank || 'N/A'}</Text>
                    </View>
                    <TouchableOpacity
                      style={BudgetStyles.deleteButton}
                      onPress={() => deleteExpense(item._id)} // Delete expense
                    >
                      <Text style={BudgetStyles.deleteButtonText}>DELETE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={BudgetStyles.noDataText}>No expenses for this month.</Text>
        )}
  
        {/* Floating Plus Button */}
        <TouchableOpacity
          style={BudgetStyles.floatingButton}
          onPress={() => navigation.navigate('ExpenseInputScreen')}
        >
          <MaterialIcons name="add" size={30} color="white" />
        </TouchableOpacity>


      </View>
    );
  };
  
  
  return (
    <View style={[BudgetStyles.container, {backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF'}]}>
      <View style={BudgetStyles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={[BudgetStyles.arrow,{color: theme === 'dark' ? '#fff' : '#000'}]}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={[BudgetStyles.monthText, {color: theme === 'dark' ? '#fff' : '#000'}]}>{getMonthName(month)}, {year}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={[BudgetStyles.arrow, {color: theme === 'dark' ? '#fff' : '#000'}]}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={BudgetStyles.navBar}>
      <TouchableOpacity
  style={[
    BudgetStyles.navButton,
    {
      backgroundColor: activeScreen === "Budget" 
        ? (theme === 'dark' ? "#2A2A2A" : "#FFFFFF") // Dark background for active button in dark mode, white in light mode
        : "#D3D3D3", // Gray for inactive button
    },
    activeScreen === "Budget" && BudgetStyles.activeButton, // Additional active button styling if needed
  ]}
  onPress={() => setActiveScreen("Budget")}
>
  <Text
    style={[
      BudgetStyles.navButtonText,
      {
        color: activeScreen === "Budget"
          ? (theme === 'dark' ? "#FFFFFF" : "#fff") // White text in dark mode, black text in light mode for active state
          : "#000000", // Default text color for inactive button
      }
    ]}
  >
    Budget
  </Text>
</TouchableOpacity>



<TouchableOpacity
  style={[
    BudgetStyles.navButton,
    {
      backgroundColor: activeScreen === "IncomeExpence" 
        ? (theme === 'dark' ? "#2A2A2A" : "#FFFFFF") // Dark background for active button in dark mode, white in light mode
        : "#D3D3D3", // Gray for inactive button
    },
    activeScreen === "IncomeExpense" && BudgetStyles.activeButton, // Additional active button styling if needed
  ]}
  onPress={() => setActiveScreen("IncomeExpense")}
>
  <Text
    style={{
      color: activeScreen === "IncomeExpense" 
        ? (theme === 'dark' ? "#FFFFFF" : "#fff") // White text for dark mode, black for light mode
        : "#000000", // Default color for inactive state
    }}
  >
    Income & Expense
  </Text>
</TouchableOpacity>

      </View>

      {/* Display the bank balance */}
      <View style={[BudgetStyles.outerContainer, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}>
        <Text style={BudgetStyles.bankBalanceText}>Bank Balance</Text>
      <View style={BudgetStyles.innerContainer}>
        
        <View style={BudgetStyles.amountContainer}>
          <Text style={BudgetStyles.summaryAmount}>
            {isVisible ? `₱${bankBalance.toFixed(2)}` : '*****'} {/* Toggle based on state */}
            <TouchableOpacity onPress={toggleVisibility}>
            <Icon 
              name={isVisible ? "eye" : "eye-off"} 
              size={24} 
              color="#000" 
              
              
              style={BudgetStyles.eyeIcon}
            />
          </TouchableOpacity>
          </Text>

        </View>
      </View>
    </View>



      {activeScreen === "Budget" ? renderBudgetContent() : renderIncomeExpenseContent()}

      <BudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        budgetItem={selectedCategory}
        onSaveBudget={handleSaveBudget}
      />
    </View>
  );
};

export default BudgetScreen;