import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useUser } from '../Context/UserContext'; // Assuming you're using this context
import styles from '../Styles/styles'; // Ensure this path is correct
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BankList = ({ navigation }) => {
  const { theme } = useUser();  // Access theme from context
  const [banks, setBanks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchBanks();
    }, [])
  );

  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:3000/banks', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
      Alert.alert('Error', 'Failed to fetch banks. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      await axios.delete(`http://localhost:3000/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBanks(prevBanks => prevBanks.filter(bank => bank._id !== id));
    } catch (error) {
      console.error('Error deleting bank:', error);
      Alert.alert('Error', 'Failed to delete bank. Please try again later.');
    }
  };

  const handleUpdate = (bank) => {
    navigation.navigate('AddUpdateBank', { bank });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
        {banks.length === 0 ? (
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>No banks available. Please add a bank.</Text>
        ) : (
          <FlatList
            data={banks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={styles.detailsContainer}>
                <Text style={[styles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Name: {item.name}</Text>
                <Text style={[styles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Type: {item.type}</Text>
                <Text style={[styles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Balance: {item.balance}</Text>
                <Text style={[styles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Interest Rate: {item.interestRate}</Text>
                <Text style={[styles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Rewards: {item.rewards}</Text>

                {/* Update Button */}
                <TouchableOpacity
                  style={[styles.button, styles.updateButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
                  onPress={() => handleUpdate(item)}
                >
                  <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Update</Text>
                </TouchableOpacity>

                {/* Delete Button */}
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton, { backgroundColor: theme === 'dark' ? '#B93A3A' : '#FF8C8C' }]}
                  onPress={() => handleDelete(item._id)}
                >
                  <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        {/* Add Bank Button */}
        <TouchableOpacity
          style={[styles.button, styles.addButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
          onPress={() => navigation.navigate('AddUpdateBank')}
        >
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Add Bank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BankList;
