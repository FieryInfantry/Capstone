import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from "react-native";
import SetBudgetModalStyle from "../Styles/SetBudgetModalStyle";
import { useUser } from '../Context/UserContext'; // Use UserContext for theme


const BudgetModal = ({ visible, onClose, budgetItem, onSaveBudget }) => {
  const [budget, setBudget] = useState("");
  


  const handleSave = () => {
    const currentDate = new Date(); // Capture the current date
    // Call the onSaveBudget function with the item name, budget, and date
    onSaveBudget(budgetItem, budget, currentDate);
    setBudget(""); // Reset budget input
    onClose(); // Close modal after saving
  };
  const {theme } = useUser();
  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  };
  const inputBackground = theme === 'dark' ? '#333' : '#FFF';

  const textColor = theme === 'dark' ? '#FFF' : '#000';


  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalContainerStyle}>
        <View style={modalBackground}>
          <Text style={SetBudgetModalStyle.modalTitle}>Set Budget for {budgetItem}</Text>
          <TextInput
            style={[SetBudgetModalStyle.input,
              {color: textColor, backgroundColor: inputBackground}
            ]}
            placeholder="Enter your budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
          <View style={SetBudgetModalStyle.buttonContainer}>
            <TouchableOpacity
            style={[SetBudgetModalStyle.button, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', alignItems: 'center' }]}
            onPress={handleSave}
            >
              <Text style={SetBudgetModalStyle.buttonText}>Save Budget</Text>
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