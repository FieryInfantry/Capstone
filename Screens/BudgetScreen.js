import React, { useLayoutEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import BudgetModal from "./SetBudgetModal"; // Ensure this component exists and is properly implemented
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

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
  
  // Fetch bank balance (simulated function)
  const fetchBankBalance = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
  
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await fetch('http://192.168.1.101:3000/banks/balances', {
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
      const response = await fetch('http://192.168.1.101:3000/budget', {
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
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.error || 'Failed to save the budget');
      }
    } catch (error) {
      console.error("Error saving budget:", error);
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
        `http://192.168.1.101:3000/budget?month=${month + 1}&year=${year}`,
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
        `http://192.168.1.101:3000/budget?category=${categoryName}&month=${month + 1}&year=${year}`,
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
          onPress={() => navigation.navigate('AddUpdateBank')}
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

  const renderIncomeExpenseContent = () => (
    <View style={styles.incomeExpenseContainer}>
      <Text style={styles.incomeExpenseText}>Income & Expense content will go here!</Text>
    </View>
  );

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
          style={[styles.navButton, activeScreen === "Budget" && styles.activeButton]}
          onPress={() => setActiveScreen("Budget")}
        >
          <Text style={styles.navButtonText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeScreen === "IncomeExpense" && styles.activeButton]}
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8fce6" 
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: "#45a049",
  },
  navButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  monthSelector: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  arrow: { fontSize: 24 },
  monthText: { fontSize: 20, fontWeight: "bold" },
summary: {
  backgroundColor: "#d0f0c0", 
  padding: 15, 
  borderRadius: 5, 
  marginBottom: 20,
  flexDirection: "row", // Align horizontally
  justifyContent: "flex-start", // Align to the start
  alignItems: "center", // Align items vertically centered
},
summaryText: { 
  fontSize: 16, 
  marginRight: 8, // Space between text and number
},
summaryAmount: { 
  fontSize: 20, 
  fontWeight: "bold", 
  color: "#388e3c",
  paddingLeft: 5, // Adds space between the text and the number
  marginRight: 40
},
summaryAmountSpent: { 
  fontSize: 20, 
  fontWeight: "bold", 
  color: "red", 
  marginRight: 8, // Space between the text and the amount
},

  sectionHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  budgetCard: { backgroundColor: "#fff", padding: 15, borderRadius: 5, marginBottom: 10 },
  budgetCardHeader: { fontSize: 18, fontWeight: "bold" },
  budgetDetails: { fontSize: 16 },
  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },
  progress: {
    height: "100%",
    borderRadius: 5,
  },
  limitExceeded: { color: "red", fontSize: 14, marginTop: 5 },
  noBudgetText: { fontSize: 16, color: "gray" },
  categoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  categoryIcon: { fontSize: 24, marginRight: 10 },
  categoryName: { fontSize: 16, flex: 1 },
  setBudgetButton: { 
    backgroundColor: "#388e3c", 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 5 
  },
  setBudgetButtonText: { color: "#fff", fontSize: 16 },
  bankBalance: { 
    backgroundColor: "#e1f5fe", 
    padding: 15, 
    borderRadius: 5, 
    marginBottom: 20 
  },
  bankBalanceText: { fontSize: 16 },
  incomeExpenseContainer: { padding: 20, backgroundColor: "#f1f8e9", borderRadius: 5 },
  incomeExpenseText: { fontSize: 16 },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 20, // Adjust the horizontal padding for a wider button
    borderRadius: 5,
    marginTop: 10,
    width: 'auto', // Allow the button to expand based on content
    alignSelf: 'center', // Center the button horizontally
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  }
  
});
