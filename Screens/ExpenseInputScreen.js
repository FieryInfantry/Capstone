import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseStyle from '../Styles/ExpenseInput';
import AccountModal from './AccountModal';
import CategoryModal from './CategoryModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../Context/UserContext'; // Use UserContext for theme

const ExpenseInputScreen = ({ navigation }) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { theme } = useUser(); // Retrieve theme from context
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDate(`${date} | ${time}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleNumberPress = (number) => {
    setInputValue((prev) => prev + number);
    setAmount((prev) => prev + number);
  };

  const handleClearPress = () => {
    setInputValue('');
    setAmount('');
  };

  const handleDeletePress = () => {
    setInputValue((prev) => prev.slice(0, -1));
    setAmount((prev) => prev.slice(0, -1));
  };

  const handleOperatorPress = (operator) => {
    setInputValue((prev) => prev + operator);
  };

  const handleEqualsPress = () => {
    try {
      const result = eval(inputValue);
      setInputValue(result.toString());
      setAmount(result.toString());
    } catch (error) {
      setInputValue('Error');
      setAmount('');
    }
  };

  const handleSubmitExpense = async () => {
    if (!selectedAccount || !selectedCategory) {
      Alert.alert('Error', 'Please select an account and category.');
      return;
    }
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid numeric amount.');
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }
  
      // Constructing the payload with category as a simple string
      const payload = {
        category: selectedCategory.name, // Send the category name as a string
        amount: parseFloat(amount),
        accountId: selectedAccount.id,
        date: new Date().toISOString(),
      };
  
      const response = await axios.post('http://192.168.1.100:3000/expense', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Expense added successfully');
        setInputValue('');
        setAmount('');
        setSelectedCategory(null);
        setSelectedAccount(null);
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.error || 'Server Error');
    }
  };
  
  return (
    <View style={[ExpenseStyle.container, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F6FCDF' }]}>
      <View style={ExpenseStyle.inputContainer}>
      <Text style={[ExpenseStyle.label, { color: isDarkMode ? '#FFF' : '#000' }]}>
          <TouchableOpacity style={[ExpenseStyle.button, { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }]} onPress={() => navigation.navigate('IncomeInputScreen')}>
            <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Income</Text>
          </TouchableOpacity>
          {' | '}
          <TouchableOpacity style={[ExpenseStyle.button, { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }]} onPress={() => navigation.navigate('ExpenseInputScreen')}>
            <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Expense</Text>
          </TouchableOpacity>
        </Text>

        <View style={ExpenseStyle.modalButtonsContainer}>
        <TouchableOpacity style={[ExpenseStyle.button, { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }]} onPress={() => setAccountModalVisible(true)}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#000' }]}>
      <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#333'} />{' '}
      {selectedAccount ? selectedAccount.name : 'Select Account'}
    </Text>
  </View>
</TouchableOpacity>


          <TouchableOpacity style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]} onPress={() => setCategoryModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>
              <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#fff'} />{' '}
                {selectedCategory ? selectedCategory.name : 'Select Category'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]}>
        <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Submit Income</Text>
          </TouchableOpacity>
        </View>


        <View style={[ExpenseStyle.calculatorContainer, {backgroundColor: isDarkMode ? '#444' : '#FFF'}]}>
          <View
            style={[
              ExpenseStyle.displayContainer,
              {
                backgroundColor: isDarkMode ? '#333' : '#EEE', borderColor: "#fff", borderWidth:2
              },
            ]}
          >
            <Text style={[ExpenseStyle.display, { color: isDarkMode ? '#FFF' : '#000' }]}>
              {inputValue}
            </Text>
            <TouchableOpacity onPress={handleDeletePress} style={ExpenseStyle.deleteButton}>
              <Text style={{ color: isDarkMode ? '#FFF' : '#000' }}>x</Text>
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          {[
            ['+', '7', '8', '9'],
            ['-', '4', '5', '6'],
            ['*', '1', '2', '3'],
            ['/', '0', '.', '='],
          ].map((row, index) => (
            <View key={index} style={ExpenseStyle.row}>
              {row.map((button) => (
                <TouchableOpacity
                  key={button}
                  style={[
                    ExpenseStyle.operatorButton,
                    { backgroundColor: isDarkMode ? '#333' : '#F6FCDF',
                      borderColor: isDarkMode ? '#fff': '#859F3D', // Add the borderColor
                      borderWidth: 2, },
                  ]}
                  onPress={
                    button === '='
                      ? handleEqualsPress
                      : button === 'C'
                      ? handleClearPress
                      : () => handleNumberPress(button)
                  }
                >
                  <Text
                    style={[
                      ExpenseStyle.operatorButtonText,
                      { color: isDarkMode ? '#FFF' : '#000' },
                    ]}
                  >
                    {button}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
  </View>

        </View>

       
          
        {/* Current Date */}
        <View style={[ExpenseStyle.dateContainer, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F6FCDF' }]}>
          <Text style={[ExpenseStyle.dateText, { color: isDarkMode ? '#FFF' : '#000' }]}>
            {currentDate}
          </Text>
        </View>
      

      {/* Account Modal */}
      <Modal transparent={true} visible={isAccountModalVisible} animationType="slide">
        <AccountModal
          closeModal={() => setAccountModalVisible(false)}
          onSelectAccount={(account) => setSelectedAccount(account)}
        />
      </Modal>

      {/* Category Modal */}
      <Modal transparent={true} visible={isCategoryModalVisible} animationType="slide">
        <CategoryModal
          closeModal={() => setCategoryModalVisible(false)}
          onCategorySelect={(category) => setSelectedCategory(category)}
        />
      </Modal>
    </View>
  );
};

export default ExpenseInputScreen;
