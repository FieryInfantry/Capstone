import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';

const AddUpdateBank = ({ route, navigation }) => {
  const { bank, updateBank, addBank } = route.params || {};
  const [bankName, setBankName] = useState(bank ? bank.name : '');
  const [accountNumber, setAccountNumber] = useState(bank ? bank.accountNumber : '');
  const [accountType, setAccountType] = useState(bank ? bank.type : '');
  const [interestRate, setInterestRate] = useState(bank ? bank.interestRate : '');
  const [rewards, setRewards] = useState(bank ? bank.rewards : '');

  // State for the password modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    navigation.setOptions({ title: bank ? 'Update Bank' : 'Add Bank' });
  }, [bank]);

  const handleSave = () => {
    setIsModalVisible(true);
  };

  const handlePasswordConfirm = () => {
    if (password) {
      const bankDetails = {
        id: bank ? bank.id : Math.random().toString(), // Use a random ID for new banks
        name: bankName,
        accountNumber,
        type: accountType,
        interestRate,
        rewards,
      };

      if (bank) {
        updateBank(bankDetails); // Update existing bank
      } else {
        addBank(bankDetails); // Add new bank
      }

      setIsModalVisible(false); // Close the modal
      setPassword(''); // Reset password
      navigation.goBack(); // Navigate back after saving
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter bank name"
        value={bankName}
        onChangeText={setBankName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter account number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Account Type"
        value={accountType}
        onChangeText={setAccountType}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter interest rate"
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter rewards details (optional)"
        value={rewards}
        onChangeText={setRewards}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />

      {/* Password confirmation modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Enter Password to Save</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
            />
            <Button title="Submit" onPress={handlePasswordConfirm} />
            <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
});

export default AddUpdateBank;
