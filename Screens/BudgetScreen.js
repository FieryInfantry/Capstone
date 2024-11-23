import React, { useLayoutEffect, useState,useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import BudgetModal from "./SetBudgetModal"; // Ensure this component exists and is properly implemented
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import styles from "../Styles/BudgetStyles";
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
  const fetchBankBalance = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch('http://192.168.1.100:3000/banks/balances', {
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
        `http://192.168.1.100:3000/expenses/monthly?month=${month + 1}&year=${year}`,
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
        `http://192.168.1.100:3000/incomes/monthly?month=${month + 1}&year=${year}`,
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

  const handleOpenModal = (categoryName) => {
    setSelectedCategory(categoryName);
    setModalVisible(true);
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
      
      // Fetch the total bank balance from the backend
      const bankBalanceResponse = await fetch('http://192.168.1.100:3000/banks/balances', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!bankBalanceResponse.ok) {
        Alert.alert('Error', 'Failed to fetch bank balance');
        return;
      }
  
      const bankBalanceData = await bankBalanceResponse.json();
      const bankBalance = bankBalanceData.totalBalance;
  
      // Calculate the total amount of all budgets
      const totalBudgetResponse = await fetch('http://192.168.1.100:3000/budget/total', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!totalBudgetResponse.ok) {
        Alert.alert('Error', 'Failed to fetch total budget');
        return;
      }
  
      const totalBudgetData = await totalBudgetResponse.json();
      const totalBudget = totalBudgetData.total;
  
      // Check if the new budget exceeds the bank balance or the total budget
      if (amountFloat + totalBudget > bankBalance) {
        Alert.alert('Error', 'The total budget exceeds the bank balance');
        return;
      }
  
      // Check if the individual budget exceeds the bank balance
      if (amountFloat > bankBalance) {
        Alert.alert('Error', 'The individual budget exceeds the bank balance');
        return;
      }
  
      // If all checks pass, save the budget
      const response = await fetch('http://192.168.1.100:3000/budget', {
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
        `http://192.168.1.100:3000/budget/monthly?month=${month + 1}&year=${year}`,
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
        `http://192.168.1.100:3000/budget?category=${categoryName}&month=${month + 1}&year=${year}`,
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
  
  

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 15 }} // Add padding to the right
          onPress={() => navigation.navigate('ExpenseInputScreen')}
        >
          <MaterialIcons 
            name="add" 
            size={30} 
            color="black" 
          />
        </TouchableOpacity>
      ),
    });
  
    fetchBankBalance(); // Fetch the bank balance when the component is mounted
  }, [navigation]);
  
  useLayoutEffect(() => {
    fetchBudgets(); // Fetch the budgets when the month or year changes
  }, [month, year]);
  
  useEffect(() => {
    fetchExpenses();
    fetchIncomes();
  }, [month, year]);
  

  const calculateRemaining = (limit, spent) => Math.max(limit - spent, 0);

  const renderBudgetContent = () => (
    <View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>TOTAL BUDGET</Text>
        <Text style={styles.summaryAmount}>
          ₱{Object.values(budgets).reduce((sum, b) => sum + (b.limit || 0), 0).toFixed(2)}
        </Text>
        <Text style={styles.summaryText}>TOTAL SPENT</Text>
        <Text style={styles.summaryAmountSpent}>
          ₱{Object.values(budgets).reduce((sum, b) => sum + (b.spent || 0), 0).toFixed(2)}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Budgeted categories: {getMonthName(month)}, {year}</Text>
      {Object.keys(budgets).length > 0 ? (
        <FlatList
          data={Object.entries(budgets).map(([name, details]) => ({
            name,
            ...details,
          }))}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.budgetCard}>
              <Text style={styles.budgetCardHeader}>{item.name}</Text>
              <Text style={styles.budgetDetails}>Limit: ₱{item.limit.toFixed(2)}</Text>
              <Text style={styles.budgetDetails}>Spent: ₱{item.spent.toFixed(2)}</Text>
              <Text style={styles.budgetDetails}>
                Remaining: ₱{calculateRemaining(item.limit, item.spent).toFixed(2)}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={{
                    ...styles.progress,
                    width: `${Math.min((item.spent / item.limit) * 100, 100)}%`,
                    backgroundColor: item.spent > item.limit ? 'red' : '#4caf50',
                  }}
                />
              </View>
              {item.spent > item.limit && <Text style={styles.limitExceeded}>*Limit exceeded</Text>}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteBudget(item.name)}
              >
                <Text style={styles.deleteButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBudgetText}>
          No budgets set for this month. Start by setting your budgets below.
        </Text>
      )}

      <Text style={styles.sectionHeader}>Not budgeted this month</Text>
      <FlatList
        data={categories.filter((category) => !budgets[category.name])}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryRow}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.setBudgetButton}
              onPress={() => handleOpenModal(item.name)}
            >
              <Text style={styles.setBudgetButtonText}>SET</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  const renderIncomeExpenseContent = () => {
    // Helper function to limit the items to 5
    const getLimitedItems = (items) => {
      return items.slice(-5); // Slice the last 5 items
    };
  
    return (
      <View style={styles.incomeExpenseContainer}>
        <Text style={styles.incomeExpenseText}>Income & Expense:</Text>
  
        {/* Income Section */}
        <Text style={styles.sectionHeader}>Income</Text>
        {incomes.length > 0 ? (
          <FlatList
            data={getLimitedItems(incomes)} // Limit the number of income items to 5
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              console.log('Income item:', item); // Debug log
              const amount = parseFloat(item.amount); // Ensure amount is a number
  
              return (
                <View style={styles.cardContainer}>
                  <View style={styles.incomeCard}>
                    <Text style={styles.incomeName}>{item.name}</Text>
                    <Text style={styles.incomeAmount}>
                      ₱+{!isNaN(amount) ? amount.toFixed(2) : 'Invalid amount'}
                    </Text>
                    <View style={styles.incomeDetailsContainer}>
                      <Text style={styles.incomeCategory}>Category: {item.category}</Text>
                      <Text style={styles.incomeDate}>
                        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </Text>
                      <Text style={styles.incomeBank}>Bank: {item.bank || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No income for this month.</Text>
        )}
  
        {/* Expense Section */}
        <Text style={styles.sectionHeader}>Expenses</Text>
        {expenses.length > 0 ? (
          <FlatList
            data={getLimitedItems(expenses)} // Limit the number of expense items to 5
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => {
              console.log('Expense item:', item); // Debug log
              const amount = parseFloat(item.amount); // Ensure amount is a number
  
              return (
                <View style={styles.cardContainer}>
                  <View style={styles.expenseCard}>
                    <Text style={styles.expenseName}>{item.name}</Text>
                    <Text style={styles.expenseAmount}>
                      ₱-{!isNaN(amount) ? amount.toFixed(2) : 'Invalid amount'}
                    </Text>
                    <View style={styles.expenseDetailsContainer}>
                      <Text style={styles.expenseCategory}>Category: {item.category}</Text>
                      <Text style={styles.expenseDate}>
                        Date: {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}
                      </Text>
                      <Text style={styles.expenseBank}>Bank: {item.bank || 'N/A'}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ) : (
          <Text style={styles.noDataText}>No expenses for this month.</Text>
        )}
      </View>
    );
  };
  
  
  
  
  
  return (
    <View style={styles.container}>
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{getMonthName(month)}, {year}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
      <TouchableOpacity
  style={[
    styles.navButton,
    { backgroundColor: activeScreen === "Budget" ? "#FFFFFF" : "#D3D3D3" }, // White for active, gray for inactive
    activeScreen === "Budget" && styles.activeButton,
  ]}
  onPress={() => setActiveScreen("Budget")}
>
  <Text style={styles.navButtonText}>Budget</Text>
</TouchableOpacity>
<TouchableOpacity
  style={[
    styles.navButton,
    { backgroundColor: activeScreen === "IncomeExpense" ? "#FFFFFF" : "#D3D3D3" }, // White for active, gray for inactive
    activeScreen === "IncomeExpense" && styles.activeButton,
  ]}
  onPress={() => setActiveScreen("IncomeExpense")}
>
  <Text style={styles.navButtonText}>Income & Expense</Text>
</TouchableOpacity>

      </View>

      {/* Display the bank balance */}
      <View style={styles.bankBalance}>
  <Text style={styles.bankBalanceText}>Bank Balance</Text>
  <Text style={styles.summaryAmount}>
    {bankBalance === 0 ? 'Loading...' : `₱${bankBalance.toFixed(2)}`}
  </Text>
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

