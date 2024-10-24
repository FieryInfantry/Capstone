import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const AddUpdateBank = ({ route, navigation }) => {
  const { bank } = route.params || {};
  const [bankName, setBankName] = useState(bank ? bank.name : '');
  const [accountNumber, setAccountNumber] = useState(bank ? bank.accountNumber : '');
  const [accountType, setAccountType] = useState(bank ? bank.type : '');
  const [interestRate, setInterestRate] = useState(bank ? bank.interestRate : '');
  const [rewards, setRewards] = useState(bank ? bank.rewards : '');

  useEffect(() => {
    navigation.setOptions({ title: bank ? 'Update Bank' : 'Add Bank' });
  }, [bank]);

  const handleSave = async () => {
  const bankDetails = {
    id: bank ? bank._id : null,
    name: bankName,
    accountNumber,
    type: accountType,
    interestRate,
    rewards,
  };

  try {
    if (bank) {
      // Update existing bank via API
      await axios.put(`http://localhost:3000/banks/${bank._id}`, bankDetails);
    } else {
      // Add new bank via API
      await axios.post('http://localhost:3000/banks', bankDetails);
    }
    navigation.goBack(); // Go back to the bank list after saving
  } catch (error) {
    console.error('Error saving bank:', error);
    alert(`Error saving bank: ${error.response?.data?.error || error.message}`);
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Bank Name"
        value={bankName}
        onChangeText={setBankName}
        style={styles.input}
      />
      <TextInput
        placeholder="Account Number"
        value={accountNumber}
        onChangeText={setAccountNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="Account Type"
        value={accountType}
        onChangeText={setAccountType}
        style={styles.input}
      />
      <TextInput
        placeholder="Interest Rate"
        value={interestRate}
        onChangeText={setInterestRate}
        style={styles.input}
      />
      <TextInput
        placeholder="Rewards"
        value={rewards}
        onChangeText={setRewards}
        style={styles.input}
      />
      <Button title="Save" onPress={handleSave} />
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
});

export default AddUpdateBank;
