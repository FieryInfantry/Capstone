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


  // Function to open the modal with the selected item
  const openModal = (item) => {
    setSelectedBudgetItem(item);
    setModalVisible(true);
  };

  // Function to update the budget
  const handleSaveBudget = (itemName, budget) => {
    const budgetAmount = parseFloat(budget); // Convert input to a number
    if (!isNaN(budgetAmount)) {
      setBudgets((prevBudgets) => ({
        ...prevBudgets,
        [itemName]: (prevBudgets[itemName] || 0) + budgetAmount, // Add to existing budget
      }));
    }
    setModalVisible(false); // Close modal after saving
  };

  return (
    <View style={BudgetStyle.container}>
      <Text style={BudgetStyle.header}>Budget Categories: August 2024</Text>
      
      {/* Display total budget above the set budget functions */}
      {Object.keys(budgets).length > 0 ? (
        <FlatList
          data={Object.entries(budgets).map(([key, value]) => ({ name: key, amount: value }))}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Text style={BudgetStyle.budgetDisplayText}>
              {item.name}: ₱{item.amount.toFixed(2)}
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
              {budgets[item.name] ? `₱${budgets[item.name].toFixed(2)}` : 'No budget set'}
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
