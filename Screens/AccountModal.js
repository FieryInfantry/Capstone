import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AccountModalStyle from '../Styles/AccountModalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For fetching the token

const AccountModal = ({ closeModal, onSelectAccount }) => {
  const [accounts, setAccounts] = useState([]); // State to store accounts data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const getBanks = async () => {
      const token = await AsyncStorage.getItem('authToken'); // Use AsyncStorage to get the token
      
      try {
        const response = await fetch('http://localhost:3000/banks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch banks');
        }
  
        const banks = await response.json();
        setAccounts(banks);  // Set accounts data
        setLoading(false);  // Update loading state
      } catch (error) {
        console.error(error);
        setLoading(false);  // Update loading state in case of error
      }
    };
  
    getBanks(); // Fetch accounts on component mount
  }, []);

  if (loading) {
    return (
      <View style={AccountModalStyle.modalContainer}>
        <Text style={AccountModalStyle.title}>Loading accounts...</Text>
      </View>
    );
  }

  return (
    <View style={AccountModalStyle.modalContainer}>
      <Text style={AccountModalStyle.title}>Select an Account</Text>

      {/* Dynamically display accounts */}
      {accounts.length === 0 ? (
        <Text>No accounts available</Text>
      ) : (
        accounts.map((account) => (
          <TouchableOpacity
            key={account.id || `${account.name}-${account.balance}`} // Ensure each account has a unique key
            style={AccountModalStyle.accountButton}
            onPress={() => {
              onSelectAccount(account); // Pass the selected account to the parent
              closeModal(); // Close the modal after selection
            }}
          >
            <Text>{account.name} - ₱{account.balance.toFixed(2)}</Text>
          </TouchableOpacity>
        ))
      )}

      {/* Close button */}
      <TouchableOpacity onPress={closeModal} style={AccountModalStyle.closeButton}>
        <Text style={AccountModalStyle.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountModal;
