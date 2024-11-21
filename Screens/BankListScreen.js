import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { useUser } from '../Context/UserContext'; 
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import InsuranceStyle from '../Styles/InsuranceStyle';
import Icon from 'react-native-vector-icons/AntDesign';


const BankListScreen = () => {
  const { theme } = useUser();
  const [banks, setBanks] = useState([]);
  const navigation = useNavigation();

  // Fetch banks data
  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://192.168.1.104:3000/banks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanks(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching banks:', error);
      Alert.alert('Error', 'Failed to fetch banks. Please try again later.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBanks(); // Refresh bank list when screen gains focus
    }, [])
  );

  // Handle bank deletion
  const handleDelete = async (id) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      await axios.delete(`http://192.168.1.104:3000/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanks((prevBanks) => prevBanks.filter((bank) => bank._id !== id));
    } catch (error) {
      console.error('Error deleting bank:', error);
      Alert.alert('Error', 'Failed to delete bank. Please try again later.');
    }
  };

  // Handle update navigation
  const handleUpdate = (bank) => {
    navigation.navigate('AddUpdateBank', { bank });
  };

  // Set up navigation options to add the "+" button in the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 15 }} // Add padding to the right
          onPress={() => navigation.navigate('AddUpdateBank')}
        >
          <MaterialIcons 
            name="add" 
            size={30} 
            color="black" // Change the icon color to white
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, theme]);
  

  return (
    <View style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }}>
      <View style={{ padding: 20 }}>
        {banks.length === 0 ? (
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 16 }}>
            No banks available. Please add a bank.
          </Text>
        ) : (
          <FlatList
            data={banks}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginVertical: 10, padding: 15, borderRadius: 8, backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF' }}>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Name: {item.name}</Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Type: {item.type}</Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Balance: {item.balance}</Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Interest Rate: {item.interestRate}</Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Rewards: {item.rewards}</Text>
            
              {/* Container for buttons */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D',
                    borderRadius: 5,
                    flexDirection: 'row', // Align text and icon horizontally
                    alignItems: 'center', // Align the items vertically
                    justifyContent: 'center',
                    height: 40, // Reduced height for a more compact button
                    elevation: 2, // Added elevation for consistency
                    flex: 1, // Makes buttons take equal space
                    marginRight: 10, // Space between buttons
                  }}
                  onPress={() => handleUpdate(item)}
                >
                  <Icon name="edit" size={20} color="#333" /> {/* Icon for Edit */}
                  <Text style={{ color: 'white', marginLeft: 5 }}>Edit</Text>
                </TouchableOpacity>
            
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: 'red',
                    borderRadius: 5,
                    flexDirection: 'row', // Align text and icon horizontally
                    alignItems: 'center', // Align the items vertically
                    justifyContent: 'center',
                    height: 40, // Reduced height for a more compact button
                    elevation: 2,
                    flex: 1, // Makes buttons take equal space
                  }}
                  onPress={() => handleDelete(item._id)}
                >
                  <Icon name="delete" size={20} color="#333" /> {/* Icon for Delete */}
                  <Text style={{ color: 'white', marginLeft: 5 }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            )}
          />
        )}
      </View>
    </View>
  );
};

export default BankListScreen;
