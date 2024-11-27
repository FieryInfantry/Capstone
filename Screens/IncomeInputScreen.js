import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseStyle from '../Styles/ExpenseInput';
import AccountModal from './AccountModal';
import CategoryModal from './CategoryModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../Context/UserContext'; // Use UserContext for theme

const IncomeInputScreen = ({ navigation }) => {
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

  const handleSubmitIncome = async () => {
    if (!selectedAccount || !selectedCategory) {
      Alert.alert('Error', 'Please select an account and category.');
      return;
    }
    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Please enter a valid numeric amount.');
      return;
    }
  
    // Log the payload to debug
    console.log("Submitting Income with Payload:", {
      category: selectedCategory.name,
      amount: parseFloat(amount),
      account: selectedAccount.name,
      date: new Date().toISOString(),
    });
  
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }
  
      const payload = {
        category: selectedCategory.name,  // Send the category name as a string
        amount: parseFloat(amount),
        account: selectedAccount.name,  // Send the selected account name
        date: new Date().toISOString(),
      };
  
      const response = await axios.post('http://192.168.100.220:3000/income', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        Alert.alert('Success', 'Income added successfully');
        // Reset form state after successful submission
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
        <TouchableOpacity
  style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]}
  onPress={() => setAccountModalVisible(true)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>
      <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#fff'} />{' '}
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

        <View style={ExpenseStyle.modalButtonsContainer}>
        <TouchableOpacity onPress={handleSubmitIncome} style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]}>
        <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Submit Income</Text>
          </TouchableOpacity>
        </View>

        <View style={[ExpenseStyle.calculatorContainer, { backgroundColor: isDarkMode ? '#444' : '#FFF' }]}>
  {/* Input Field */}
  <TextInput
    style={[
      ExpenseStyle.inputField,
      { backgroundColor: isDarkMode ? '#333' : '#FFF', borderColor: '#859F3D', borderWidth: 2 },
    ]}
    onChangeText={(value) => setAmount(value)} // Directly set the value as `amount`
    value={amount} // Bind the value of the TextInput to the amount state
    keyboardType="numeric" // Numeric input only
    placeholder="Enter a number"
    placeholderTextColor={isDarkMode ? '#BBB' : '#777'}
  />
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
        onSelectAccount={(account) => setSelectedAccount(account)} // Set selected account
        modalType="income"
      />
      </Modal>

      {/* Category Modal */}
      <Modal transparent={true} visible={isCategoryModalVisible} animationType="slide">
        <CategoryModal
          closeModal={() => setCategoryModalVisible(false)}
          onCategorySelect={(category) => setSelectedCategory(category)}
          modalType="income"
        />
      </Modal>
    </View>
  );
};

export default IncomeInputScreen;
