import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';
import ReusableModal from './AlertModal';
import AddUpdateBank from './AddUpdateBank';

const BankListScreen = () => {
  const { theme } = useUser();
  const [banks, setBanks] = useState([]);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBankModalVisible, setBankModalVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);

  // Fetch banks data
  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:3000/banks', {
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

      await axios.delete(`http://localhost:3000/banks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanks((prevBanks) => prevBanks.filter((bank) => bank._id !== id));
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting bank:', error);
      Alert.alert('Error', 'Failed to delete bank. Please try again later.');
    }
  };

  // Handle save in the AddUpdateBankModal
  const handleSave = async (bankDetails) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      if (selectedBank) {
        // Update bank
        await axios.put(`http://localhost:3000/banks/${selectedBank._id}`, bankDetails, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBanks((prevBanks) =>
          prevBanks.map((bank) => (bank._id === selectedBank._id ? { ...bank, ...bankDetails } : bank))
        );
      } else {
        // Add new bank
        const response = await axios.post('http://localhost:3000/banks', bankDetails, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBanks((prevBanks) => [...prevBanks, response.data]);
      }

      setBankModalVisible(false);
    } catch (error) {
      console.error('Error saving bank:', error);
      Alert.alert('Error', 'Failed to save bank. Please try again later.');
    }
  };

  // Handle update button click
  const handleUpdate = (bank) => {
    setSelectedBank(bank);
    setBankModalVisible(true);
  };

  // Handle add new bank button click
  const handleAddNew = () => {
    setSelectedBank(null);
    setBankModalVisible(true);
  };

  // Set up navigation options to add the "+" button in the header
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 15 }}
          onPress={handleAddNew}
        >
          <MaterialIcons name="add" size={30} color="black" />
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
              <View
                style={{
                  marginVertical: 10,
                  padding: 15,
                  borderRadius: 8,
                  backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
                }}
              >
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Name: {item.name}</Text>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Type: {item.type}</Text>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Balance: {item.balance}</Text>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Interest Rate: {item.interestRate}</Text>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Rewards: {item.rewards}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D',
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 40,
                      elevation: 2,
                      flex: 1,
                      marginRight: 10,
                    }}
                    onPress={() => handleUpdate(item)}
                  >
                    <Icon name="edit" size={20} color="#fff" />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      padding: 10,
                      backgroundColor: 'red',
                      borderRadius: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 40,
                      elevation: 2,
                      flex: 1,
                      color: 'red'
                    }}
                    onPress={() => setModalVisible(true)}
                  >
                    <Icon name="delete" size={20} color="#fff" />
                    <Text style={{ color: 'white', marginLeft: 5 }}>Delete</Text>
                  </TouchableOpacity>

                  <ReusableModal
                    visible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    title="Confirm Delete"
                    message="Are you sure you want to delete this item? This action cannot be undone."
                    onConfirm={() => handleDelete(item._id)}
                    confirmText="Delete"
                    cancelText="Cancel"
                  />
                </View>
              </View>
            )}
          />
        )}
      </View>

      {/* AddUpdateBankModal */}
      <AddUpdateBank
        visible={isBankModalVisible}
        onClose={() => setBankModalVisible(false)}
        onSave={handleSave}
        bank={selectedBank}
      />
    </View>
  );
};

export default BankListScreen;
