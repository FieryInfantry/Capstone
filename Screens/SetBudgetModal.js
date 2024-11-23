import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Modal, TouchableOpacity, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';  // Import Picker
import SetBudgetModalStyle from "../Styles/SetBudgetModalStyle";
import { useUser } from "../Context/UserContext";

const BudgetModal = ({ visible, onClose, budgetItem, onSaveBudget, onEditBudget }) => {
  const [budget, setBudget] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Baby"); // Default to 'Baby'
  const { theme } = useUser();

  useEffect(() => {
    // Pre-fill the fields when editing an existing budget
    if (budgetItem) {
      setBudget(budgetItem.budget); // Assuming 'budget' is the property name in budgetItem
      setSelectedCategory(budgetItem.category); // Assuming 'category' is the property name in budgetItem
    }
  }, [budgetItem]);

  const handleSave = () => {
    const currentDate = new Date(); // Capture the current date
    if (!budget || isNaN(parseFloat(budget))) {
      Alert.alert("Error", "Please enter a valid budget amount");
      return;
    }

    // If editing an existing budget, call the onEditBudget function
    if (budgetItem) {
      onEditBudget(budgetItem.id, selectedCategory, budget, currentDate); // Pass the id for editing
    } else {
      // If adding a new budget, call the onSaveBudget function
      onSaveBudget(selectedCategory, budget, currentDate);
    }

    setBudget(""); // Reset budget input
    setSelectedCategory("Baby"); // Reset category
    onClose(); // Close modal after saving
  };

  const modalContainerStyle = {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:
      theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)",
  };

  const modalBackground = {
    backgroundColor: theme === "dark" ? "#1A1A19" : "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  };

  const inputBackground = theme === "dark" ? "#333" : "#FFF";
  const textColor = theme === "dark" ? "#FFF" : "#000";

  const categories = [
    { id: "1", name: "Baby", icon: "🍼" },
    { id: "2", name: "Beauty", icon: "💄" },
    { id: "3", name: "Bills", icon: "🧾" },
    { id: "4", name: "Car", icon: "🚗" },
    { id: "5", name: "Clothing", icon: "👗" },
    { id: "6", name: "Education", icon: "🎓" },
  ];

  return (
    <Modal transparent={true} animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={modalContainerStyle}>
        <View style={modalBackground}>
          <Text style={[SetBudgetModalStyle.modalTitle, { color: textColor }]}>
            {budgetItem ? `Edit Budget for ${budgetItem.name}` : `Set Budget for ${budgetItem?.name || "New Item"}`}
          </Text>

          {/* Budget Category Picker */}
          <Text style={[SetBudgetModalStyle.label, { color: textColor }]}>
            Select Category:
          </Text>
          <Picker
            selectedValue={selectedCategory}
            style={{
              backgroundColor: inputBackground,
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: theme === "dark" ? "#444" : "#CCC",
              marginBottom: 20,
            }}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            {categories.map((category) => (
              <Picker.Item
                key={category.id}
                label={`${category.icon} ${category.name}`}
                value={category.name}
              />
            ))}
          </Picker>

          {/* Budget Input */}
          <Text style={[SetBudgetModalStyle.label, { color: textColor }]}>
            Enter Budget:
          </Text>
          <TextInput
            style={[SetBudgetModalStyle.input, { color: textColor, backgroundColor: inputBackground }]}
            placeholder="Enter your budget"
            placeholderTextColor={theme === "dark" ? "#AAA" : "#888"}
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />

          <View style={SetBudgetModalStyle.buttonContainer}>
            <TouchableOpacity
              style={[
                SetBudgetModalStyle.button,
                {
                  backgroundColor: theme === "dark" ? "#31511E" : "#859F3D",
                  alignItems: "center",
                },
              ]}
              onPress={handleSave}
            >
              <Text style={SetBudgetModalStyle.buttonText}>{budgetItem ? "Save Changes" : "Save Budget"}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={SetBudgetModalStyle.buttonclose}
              onPress={onClose}
            >
              <Text style={SetBudgetModalStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BudgetModal;
