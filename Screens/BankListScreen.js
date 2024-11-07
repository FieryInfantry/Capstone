import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import axios from 'axios';
import styles from '../Styles/styles'; // Ensure this path is correct
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For accessing user token

const BankList = ({ navigation }) => {
  const [banks, setBanks] = useState([]);

  // Fetch banks when component mounts or screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchBanks();
    }, [])
  );

  const fetchBanks = async () => {
    try {
      // Get the user's token from AsyncStorage for authentication
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      // Fetch the list of banks from the API with the user's token for authentication
      const response = await axios.get('http://localhost:3000/banks', {
        headers: { Authorization: `Bearer ${token}` } // Include token in the header
      });
      
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
      Alert.alert('Error', 'Failed to fetch banks. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Get the user's token for authentication
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      console.log('Attempting to delete bank with ID:', id);
      await axios.delete(`http://localhost:3000/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // Include token in the header
      });

      // Optimistically remove the bank from the state
      setBanks(prevBanks => prevBanks.filter(bank => bank._id !== id));
    } catch (error) {
      console.error('Error deleting bank:', error);
      Alert.alert('Error', 'Failed to delete bank. Please try again later.');
    }
  };

  const handleUpdate = (bank) => {
    // Navigate to the AddUpdateBank screen with the selected bank details
    navigation.navigate('AddUpdateBank', { bank });
  };

  return (
    <View style={styles.container}>
      {banks.length === 0 ? (
        <Text>No banks available. Please add a bank.</Text>
      ) : (
        <FlatList
          data={banks}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.bankItem}>
              <Text>Name: {item.name}</Text>
              <Text>Type: {item.type}</Text>
              <Text>Balance: {item.balance}</Text>
              <Text>Interest Rate: {item.interestRate}</Text>
              <Text>Rewards: {item.rewards}</Text>
              <Button title="Update" onPress={() => handleUpdate(item)} />
              <Button title="Delete" onPress={() => handleDelete(item._id)} />
            </View>
          )}
        />
      )}
      <Button title="Add Bank" onPress={() => navigation.navigate('AddUpdateBank')} />
    </View>
  );
};

export default BankList;
