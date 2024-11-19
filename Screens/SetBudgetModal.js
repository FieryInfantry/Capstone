import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from "react-native";
import SetBudgetModalStyle from "../Styles/SetBudgetModalStyle";

const BudgetModal = ({ visible, onClose, budgetItem, onSaveBudget }) => {
  const [budget, setBudget] = useState("");

  const handleSave = () => {
    const currentDate = new Date(); // Capture the current date
    // Call the onSaveBudget function with the item name, budget, and date
    onSaveBudget(budgetItem, budget, currentDate);
    setBudget(""); // Reset budget input
    onClose(); // Close modal after saving
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={SetBudgetModalStyle.modalBackground}>
        <View style={SetBudgetModalStyle.modalContainer}>
          <Text style={SetBudgetModalStyle.modalTitle}>Set Budget for {budgetItem}</Text>
          <TextInput
            style={SetBudgetModalStyle.input}
            placeholder="Enter your budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
          <View style={SetBudgetModalStyle.buttonContainer}>
            <TouchableOpacity
              style={[SetBudgetModalStyle.button, SetBudgetModalStyle.saveButton]}
              onPress={handleSave}
            >
              <Text style={SetBudgetModalStyle.buttonText}>Save Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[SetBudgetModalStyle.button, SetBudgetModalStyle.cancelButton]}
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
