import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import BudgetStyle from "../Styles/BudgetStyle";
import BudgetModal from "./SetBudgetModal"; // Import the modal component
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Baby', icon: '🍼' },
  { id: '2', name: 'Beauty', icon: '💄' },
  { id: '3', name: 'Bills', icon: '🧾' },
  { id: '4', name: 'Car', icon: '🚗' },
  { id: '5', name: 'Clothing', icon: '👗' },
  { id: '6', name: 'Education', icon: '🎓' },
  // Add more categories as needed
];

const BudgetScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBudgetItem, setSelectedBudgetItem] = useState("");
  const [budgets, setBudgets] = useState({}); // State to store budgets

  // New state variables for month and year
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  // Function to handle previous month
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Function to handle next month
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Get month name from month index
  const getMonthName = (monthIndex) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[monthIndex];
  };

  // Function to open the modal with the selected item
  const openModal = (item) => {
    setSelectedBudgetItem(item);
    setModalVisible(true);
  };

  // Function to update the budget and bind it to the current date
  const handleSaveBudget = (itemName, budget) => {
    const budgetAmount = parseFloat(budget); // Convert input to a number
    if (!isNaN(budgetAmount)) {
      const currentDate = new Date(); // Get the current date
      setBudgets((prevBudgets) => ({
        ...prevBudgets,
        [itemName]: { amount: (prevBudgets[itemName]?.amount || 0) + budgetAmount, date: currentDate }, // Add budget with the date
      }));
    }
    setModalVisible(false); // Close modal after saving
  };

  return (
    <View style={BudgetStyle.container}>
      {/* Month Navigation */}
      <View style={BudgetStyle.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={BudgetStyle.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={BudgetStyle.monthText}>{getMonthName(month)}, {year}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={BudgetStyle.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <Text style={BudgetStyle.header}>Budget Categories: {getMonthName(month)} {year}</Text>

      {/* Display total budget above the set budget functions */}
      {Object.keys(budgets).length > 0 ? (
        <FlatList
          data={Object.entries(budgets).map(([key, value]) => ({ name: key, amount: value.amount, date: value.date }))}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Text style={BudgetStyle.budgetDisplayText}>
              {item.name}: ₱{item.amount.toFixed(2)} (Set on: {new Date(item.date).toLocaleDateString()})
            </Text>
          )}
        />
      ) : (
        <Text style={BudgetStyle.subHeader}>
          Currently, no budget is applied for this month. Set budget limits for this month or copy budget limits from past months.
        </Text>
      )}

      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={BudgetStyle.categoryRow}>
            <Text style={BudgetStyle.categoryIcon}>{item.icon}</Text>
            <Text style={BudgetStyle.categoryText}>{item.name}</Text>
            <Text style={BudgetStyle.budgetText}>
              {budgets[item.name] ? `₱${budgets[item.name].amount.toFixed(2)}` : 'No budget set'}
            </Text>
            <TouchableOpacity 
              style={BudgetStyle.setBudgetButton} 
              onPress={() => openModal(item.name)} // Open modal with the category name
            >
              <Text style={BudgetStyle.setBudgetButtonText}>SET BUDGET</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Budget Modal */}
      <BudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        budgetItem={selectedBudgetItem} // Pass the selected item name to the modal
        onSaveBudget={handleSaveBudget} // Pass the save function to the modal
      />

      {/* Floating Button */}
      <TouchableOpacity 
        style={BudgetStyle.floatingButton} 
        onPress={() => navigation.navigate('ExpenseInput')}
      >
        <Text style={BudgetStyle.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BudgetScreen;
