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

        <TouchableOpacity
  onPress={handleSubmitExpense}
  style={[
    ExpenseStyle.submitButton,
    { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }, // Change background color based on dark mode
  ]}
>
  <Text
    style={[
      ExpenseStyle.buttonText,
      { color: isDarkMode ? '#FFF' : '#000' }, // Text color based on dark mode
    ]}
  >
    Submit Expense
  </Text>
</TouchableOpacity>


        <View
  style={[
    ExpenseStyle.calculatorContainer,
    {
      backgroundColor: isDarkMode ? '#333' : '#FFF', // Background color for the container
    },
  ]}
>
  <View style={ExpenseStyle.displayContainer}>
    <Text
      style={[
        ExpenseStyle.display,
        { color: isDarkMode ? '#FFF' : '#000' }, // Text color for input value
      ]}
    >
      {inputValue}
    </Text>
    <TouchableOpacity
      onPress={handleDeletePress}
      style={[
        ExpenseStyle.deleteButton,
        { backgroundColor: isDarkMode ? '#444' : '#F4F4F4' }, // Button color change
      ]}
    >
      <Text style={[ExpenseStyle.deleteButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>x</Text>
    </TouchableOpacity>
  </View>

  {/* Calculator Layout */}
  <View style={[ExpenseStyle.row, { backgroundColor: isDarkMode ? '#444' : '#EEE' }]}>
    <TouchableOpacity
      onPress={() => handleOperatorPress('+')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>+</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('7')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>7</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('8')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>8</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('9')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>9</Text>
    </TouchableOpacity>
  </View>

  <View style={[ExpenseStyle.row, { backgroundColor: isDarkMode ? '#444' : '#EEE' }]}>
    <TouchableOpacity
      onPress={() => handleOperatorPress('-')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>-</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('4')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>4</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('5')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>5</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('6')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>6</Text>
    </TouchableOpacity>
  </View>

  <View style={[ExpenseStyle.row, { backgroundColor: isDarkMode ? '#444' : '#EEE' }]}>
    <TouchableOpacity
      onPress={() => handleOperatorPress('*')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>x</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('1')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>1</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('2')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>2</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('3')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>3</Text>
    </TouchableOpacity>
  </View>

  <View style={[ExpenseStyle.row, ExpenseStyle.rowLast, { backgroundColor: isDarkMode ? '#444' : '#EEE' }]}>
    <TouchableOpacity
      onPress={() => handleOperatorPress('/')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>÷</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleNumberPress('0')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>0</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => handleOperatorPress('.')}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>.</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={handleEqualsPress}
      style={[
        ExpenseStyle.operatorButton,
        { backgroundColor: isDarkMode ? '#555' : '#D9D9D9' },
      ]}
    >
      <Text style={[ExpenseStyle.operatorButtonText, { color: isDarkMode ? '#FFF' : '#000' }]}>
        =
      </Text>
    </TouchableOpacity>
  </View>
</View>

        </View>

        <View style={ExpenseStyle.dateContainer}>
          <Text style={ExpenseStyle.dateText}>{currentDate}</Text>
        {/* Current Date */}
        <View style={[ExpenseStyle.dateContainer, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F6FCDF' }]}>
          <Text style={[ExpenseStyle.dateText, { color: isDarkMode ? '#FFF' : '#000' }]}>
            {currentDate}
          </Text>
        </View>
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
