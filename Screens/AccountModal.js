import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AccountModalStyle from '../Styles/AccountModalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For fetching the token
import { useUser } from '../Context/UserContext'; // Import the UserContext

const AccountModal = ({ closeModal, onSelectAccount, modalType }) => {
  const [accounts, setAccounts] = useState([]); // State to store accounts data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { theme } = useUser(); // Always call useContext here (top-level)

  useEffect(() => {
    const getBanks = async () => {
      const token = await AsyncStorage.getItem('authToken'); // Use AsyncStorage to get the token

      // Predefined list of all possible banks (including ones without balances)
      const predefinedBanks = [
        { name: 'GM Bank', id: 1, balance: 0 },
        { name: 'FICO Bank', id: 2, balance: 0 },
        { name: 'BDO', id: 3, balance: 0 },
        // Add any other predefined banks you want
      ];

      try {
        const response = await fetch('http://192.168.1.100:3000/banks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch banks');
        }

        const fetchedBanks = await response.json();

        // Merge the predefined banks with the fetched banks
        const fetchedBanksMap = new Map(fetchedBanks.map(bank => [bank.name, bank]));

        // Merge predefined banks with fetched data (if fetched bank exists, use it, otherwise fallback to predefined)
        const allBanks = predefinedBanks.map((predefinedBank) => {
          const fetchedBank = fetchedBanksMap.get(predefinedBank.name);
          return fetchedBank ? fetchedBank : predefinedBank; // Use fetched bank or fallback to predefined
        });

        // Filter the accounts based on modalType
        if (modalType === 'expense') {
          // Only show banks that have a positive balance
          setAccounts(allBanks.filter(account => account.balance > 0));
        } else if (modalType === 'income') {
          // Show all banks (including those with zero balance)
          setAccounts(allBanks);
        }

        setLoading(false);  // Update loading state
      } catch (error) {
        console.error(error);
        setLoading(false);  // Update loading state in case of error
      }
    };

    getBanks(); // Fetch accounts on component mount
  }, [modalType]); // Re-run when modalType changes

  if (loading) {
    return (
      <View style={AccountModalStyle.modalContainer}>
        <Text style={AccountModalStyle.title}>Loading accounts...</Text>
      </View>
    );
  }

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

  const textColor = theme === 'dark' ? '#FFF' : '#000';

  return (
    <View style={modalContainerStyle}>
      <View style={modalBackground}>
        {/* Conditionally render content based on modalType */}
        <Text style={[AccountModalStyle.title, { color: textColor }]}>
          {modalType === 'expense' ? 'Select Expense Account' : 'Select Income Account'}
        </Text>

        {/* Dynamically display accounts based on modalType */}
        {accounts.length === 0 ? (
          <Text>No accounts available</Text>
        ) : (
          accounts.map((account) => (
            <TouchableOpacity
              key={account.id || `${account.name}-${account.balance}`}
              style={[AccountModalStyle.accountButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', alignItems: 'center' }]}
              onPress={() => {
                onSelectAccount(account); // Pass the selected account to the parent
                closeModal(); // Close the modal after selection
              }}
            >
              <Text style={AccountModalStyle.text1}>
                {account.name} - ₱{account.balance !== undefined ? account.balance.toFixed(2) : '0.00'}
              </Text>
            </TouchableOpacity>
          ))
        )}

        {/* Close button */}
        <TouchableOpacity onPress={closeModal} style={AccountModalStyle.closeButton}>
          <Text style={AccountModalStyle.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountModal;
