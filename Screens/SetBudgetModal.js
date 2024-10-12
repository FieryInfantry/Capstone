import React, { useState } from "react";
import { View, Text, TextInput, Button, Modal, StyleSheet } from "react-native";

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
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Set Budget for {budgetItem}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />
          <Button title="Save Budget" onPress={handleSave} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  input: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default BudgetModal;
