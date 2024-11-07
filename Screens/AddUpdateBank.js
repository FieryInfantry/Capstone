import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage
import { useUser } from '../Context/UserContext'; // Import the UserContext

const banksData = {
  "GM Bank": [
    { label: 'Easy Savings Account', rate: '0.20%' },
    { label: 'Regular Savings Account', rate: '0.20%' },
    { label: 'Silver Savings Account', rate: 'Subject to evaluation' },
    { label: 'Microfinance Savings Account', rate: '0.20%' },
    { label: 'Regular Checking Account', rate: 'Not applicable' },
    { label: 'Combo Checking Account', rate: '0.20%' },
    { label: 'Gold Checking Account', rate: 'Subject to evaluation' },
    { label: 'Time Deposit Account', rate: 'Subject to evaluation' },
  ],
  "FICO Bank": [
    { label: 'Ordinary Savings Account', rate: '1% to 4% per annum' },
    { label: 'Smart Savings Account', rate: '2% to 5% per annum' },
    { label: 'Bigtime Savings Account', rate: '4% to 7% per annum' },
    { label: 'Pangarap Savings Account', rate: '4% to 7% per annum' },
    { label: 'Checking Account', rate: 'Typically no interest earned' },
    { label: 'Time Deposit - 30 days', rate: '0.375% per annum' },
    { label: 'Time Deposit - 60 days', rate: '0.5% per annum' },
    { label: 'Time Deposit - 90 days', rate: '0.625% per annum' },
    { label: 'Time Deposit - 180 days', rate: '0.75% per annum' },
    { label: 'Time Deposit - 360 days', rate: '1.25% per annum' },
    { label: 'Joint Account', rate: 'Generally the same as individual accounts' },
    { label: 'Dollar Savings Account', rate: '0.25% per annum' },
    { label: 'Other Specialized Accounts (Kiddie Savers)', rate: '0.25% per annum' },
    { label: 'Senior Citizens Account', rate: '0.25% per annum' },
  ],
  "BDO": [
    { label: 'Savings Account', rate: '0.25% per annum for balances above ₱50,000; 0.125% for balances below ₱50,000' },
    { label: 'Checking Account', rate: 'Typically no interest earned' },
    { label: 'Time Deposit - 30 days', rate: '0.375% per annum' },
    { label: 'Time Deposit - 60 days', rate: '0.5% per annum' },
    { label: 'Time Deposit - 90 days', rate: '0.625% per annum' },
    { label: 'Time Deposit - 180 days', rate: '0.75% per annum' },
    { label: 'Time Deposit - 360 days', rate: '1.25% per annum' },
    { label: 'Joint Account', rate: 'Same as individual savings/checking accounts' },
    { label: 'Dollar Savings Account', rate: '0.25% per annum' },
    { label: 'Other Specialized Accounts', rate: '0.25% per annum (Kiddie Savers, Senior Citizens Account)' },
  ],
};

const AddUpdateBank = ({ route, navigation }) => {
  const { bank } = route.params || {}; // Expecting the full bank object if updating
  const bankId = bank ? bank._id : null; // Getting bank ID if it's an update
  const [selectedBank, setSelectedBank] = useState(bank ? bank.name : 'GM Bank');
  const [accountNumber, setAccountNumber] = useState(bank ? bank.accountNumber : '');
  const [accountType, setAccountType] = useState(bank ? bank.type : '');
  const [interestRate, setInterestRate] = useState(bank ? bank.interestRate : '');
  const [accountBalance, setAccountBalance] = useState(bank ? bank.balance : '');
  const [reward, setReward] = useState(bank ? bank.rewards : '');

  const { token } = useUser();

  const handleBankChange = (bankName) => {
    setSelectedBank(bankName);
    setAccountType('');
    setInterestRate('');
    generateAccountNumber(bankName);
  };

  const handleAccountTypeChange = (itemValue) => {
    setAccountType(itemValue);
    const selectedAccount = banksData[selectedBank].find(account => account.label === itemValue);
    setInterestRate(selectedAccount ? selectedAccount.rate : '');
    generateAccountNumber(selectedBank);
  };

  const generateAccountNumber = () => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    setAccountNumber(randomDigits.toString());
  };

  
  const handleSave = async () => {
    const bankDetails = {
      name: selectedBank,
      accountNumber,
      type: accountType,
      interestRate,
      balance: accountBalance,
      rewards: reward,
    };

    // If the token is not available in context, try fetching it from AsyncStorage
    let userToken = token || await AsyncStorage.getItem('authToken');
    if (!userToken) {
      Alert.alert('Error', 'User is not authenticated.');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the token in the header
        },
      };

      if (bankId) {
        // For existing bank, use PUT method
        await axios.put(`http://localhost:3000/banks/${bankId}`, bankDetails, config);
      } else {
        // For new bank, use POST method
        await axios.post('http://localhost:3000/banks', bankDetails, config);
      }

      navigation.goBack();
    } catch (error) {
      console.error('Error saving bank:', error);
      Alert.alert('Error saving bank', error.response?.data?.error || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Select Bank</Text>
      <Picker
        selectedValue={selectedBank}
        onValueChange={handleBankChange}
        style={styles.picker}
      >
        {Object.keys(banksData).map((bank) => (
          <Picker.Item key={bank} label={bank} value={bank} />
        ))}
      </Picker>

      <TextInput
        placeholder="Account Number"
        value={accountNumber}
        editable={false}
        style={styles.input}
      />

      <Text>Account Type</Text>
      <Picker
        selectedValue={accountType}
        onValueChange={handleAccountTypeChange}
        style={styles.picker}
      >
        {banksData[selectedBank].map((account) => (
          <Picker.Item key={account.label} label={account.label} value={account.label} />
        ))}
      </Picker>

      <TextInput
        placeholder="Interest Rate"
        value={interestRate}
        editable={false}
        style={styles.input}
      />

      <TextInput
        placeholder="Account Balance"
        value={accountBalance}
        onChangeText={setAccountBalance}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Reward"
        value={reward}
        onChangeText={setReward}
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
  picker: {
    height: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default AddUpdateBank;
