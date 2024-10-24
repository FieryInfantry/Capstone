import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import axios from 'axios';
import styles from '../Styles/styles'; // Ensure this path is correct

const BankList = ({ navigation, user }) => {
  const [banks, setBanks] = useState([]);

  // Fetch banks when component mounts
  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/banks');
      setBanks(response.data);
    } catch (error) {
      console.error('Error fetching banks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      console.log('Attempting to delete bank with ID:', id);
      await axios.delete(`http://localhost:3000/banks/${id}`);
      fetchBanks(); // Refresh banks after deletion
    } catch (error) {
      console.error('Error deleting bank:', error);
    }
  };

  const handleUpdate = (bank) => {
    navigation.navigate('AddUpdateBank', { bank });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.bankItem}>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text>{item.balance}</Text>
            <Text>{item.interestRate}</Text>
            <Text>{item.rewards}</Text>
            <Button title="Update" onPress={() => handleUpdate(item)} />
            <Button title="Delete" onPress={() => handleDelete(item._id)} />
          </View>
        )}
      />
      <Button title="Add Bank" onPress={() => navigation.navigate('AddUpdateBank')} />
    </View>
  );
};

export default BankList;
