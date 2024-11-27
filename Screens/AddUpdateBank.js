import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../Context/UserContext';


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

const AddUpdateBank = ({ visible, onClose, onSave, bank }) => {
  const bankId = bank ? bank._id : null;
  const [selectedBank, setSelectedBank] = useState(bank ? bank.name : 'GM Bank');
  const [accountNumber, setAccountNumber] = useState(bank ? bank.accountNumber : '');
  const [accountType, setAccountType] = useState(bank ? bank.type : 'Easy Savings Account');
  const [interestRate, setInterestRate] = useState(bank ? bank.interestRate : '0.20%');
  const [accountBalance, setAccountBalance] = useState(bank ? bank.balance : '');
  const [reward, setReward] = useState(bank ? bank.rewards : '');

  const { token, theme } = useUser();

  useEffect(() => {
    if (bank) {
      const selectedAccount = banksData[selectedBank].find(account => account.label === bank.type);
      setInterestRate(selectedAccount ? selectedAccount.rate : '');
    }
  }, [bank, selectedBank]);

  const handleBankChange = (bankName) => {
    setSelectedBank(bankName);
    const firstAccount = banksData[bankName]?.[0];
    if (firstAccount) {
      setAccountType(firstAccount.label);
      setInterestRate(firstAccount.rate);
    }

    if (!bank) {
      setAccountNumber('');
      setAccountBalance('');
      setReward('');
    }
  };

  const handleAccountTypeChange = (itemValue) => {
    setAccountType(itemValue);
    const selectedAccount = banksData[selectedBank].find(account => account.label === itemValue);
    setInterestRate(selectedAccount ? selectedAccount.rate : '');
  };

  const handleSave = () => {
    const bankDetails = {
      name: selectedBank,
      accountNumber,
      type: accountType,
      interestRate,
      balance: accountBalance,
      rewards: reward,
    };
    onSave(bankDetails);
  };
  const containerStyle = { 
    flex: 1, 
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' 
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#FFF',
    borderRadius: 10,
    width: '75%',
    padding: 20
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)', // Adjusted opacity for modal background
    
  };
  const inputBackground = theme === 'dark' ? '#333' : '#FFF';
  const border = theme === 'dark' ? "1a1a19" : "#859F3D";

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={modalContainerStyle}>
      <View style={modalBackground}>
        <Text style={[styles.title, {color : textColor}]}>{bankId ? 'Update Bank Details' : 'Add Bank Account'}</Text>
          <Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Select Bank</Text>
          <View style={styles.pickerContainer}>
  <Picker
    selectedValue={selectedBank}
    onValueChange={handleBankChange}
    style={[styles.picker, {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
      color: theme === 'dark' ? '#fff' : '#000' 
    }]}
  >
    {Object.keys(banksData).map((bank) => (
      <Picker.Item key={bank} label={bank} value={bank} />
    ))}
  </Picker>
</View>

<Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Account Number</Text>

          <TextInput
            value={accountNumber}
            onChangeText={setAccountNumber}
            style={{
              backgroundColor: inputBackground,
              color: textColor,
              borderRadius: 5, // Or set it to your desired value
              padding: 10,
              marginBottom: 20,
              borderColor: '#859F3D',
              borderWidth: 1,
            }}             
        />

          <Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Account Type</Text>
          <View style={styles.pickerContainer}>
          <Picker
            selectedValue={accountType}
            onValueChange={handleAccountTypeChange}
            style={[styles.picker, {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
              color: theme === 'dark' ? '#fff' : '#000' 
            }]}
          >
            {banksData[selectedBank].map((account) => (
              <Picker.Item key={account.label} label={account.label} value={account.label} />
            ))}
          </Picker>
          </View>
          <Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Interest Rate</Text>

          <TextInput
            value={interestRate}
            editable={false}
            style={{
              backgroundColor: inputBackground,
              color: textColor,
              borderRadius: 5, // Or set it to your desired value
              padding: 10,
              marginBottom: 20,
              borderColor: '#859F3D',
              borderWidth: 1,
            }}             
        />
               <Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Account Balance</Text>
     
          <TextInput
            value={accountBalance}
            onChangeText={setAccountBalance}
            keyboardType="numeric"
            style={{
              backgroundColor: inputBackground,
              color: textColor,
              borderRadius: 5, // Or set it to your desired value
              padding: 10,
              marginBottom: 20,
              borderColor: '#859F3D',
              borderWidth: 1,
            }}             
        />
       
       <Text style={[styles.label,{ color: theme === 'dark' ? '#fff' : '#000' }]}>Reward</Text>

          <TextInput
            value={reward}
            onChangeText={setReward}
            style={{
              backgroundColor: inputBackground,
              color: textColor,
              borderRadius: 5, // Or set it to your desired value
              padding: 10,
              marginBottom: 20,
              borderColor: '#859F3D',
              borderWidth: 1,
            }}             
        />

          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>{bankId ? 'Update' : 'Add'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: '#F6FCDF', // Matching background color
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderColor: '#ccc',
  },
  pickerContainer: {
    height: 60,
    marginBottom: 16,
    borderColor: '#859F3D', // Matching border color
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center', // Center aligns the Picker within the container
  },
  picker: {
    flex: 1, // Ensures the picker expands to fill the container
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    backgroundColor: '#859F3D',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonCancel: {
    backgroundColor :"red",
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  title:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4CAF50',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default AddUpdateBank;
