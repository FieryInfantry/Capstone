import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpenseStyle from '../Styles/ExpenseInput';
import AccountModal from './AccountModal';
import CategoryModal from './CategoryModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseInputScreen = ({ navigation }) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState(null);

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
    <View style={ExpenseStyle.container}>
      <View style={ExpenseStyle.inputContainer}>
        <Text style={ExpenseStyle.label}>
          <TouchableOpacity style={ExpenseStyle.button} onPress={() => navigation.navigate('IncomeInputScreen')}>
            <Text style={ExpenseStyle.buttonText}>Income</Text>
          </TouchableOpacity>
          {' | '}
          <TouchableOpacity style={ExpenseStyle.button} onPress={() => navigation.navigate('ExpenseInputScreen')}>
            <Text style={ExpenseStyle.buttonText}>Expense</Text>
          </TouchableOpacity>
        </Text>

        <View style={ExpenseStyle.modalButtonsContainer}>
          <TouchableOpacity style={ExpenseStyle.button} onPress={() => setAccountModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={ExpenseStyle.buttonText}>
                <Icon name="user" size={20} color="#333" />{' '}
                {selectedAccount ? selectedAccount.name : 'Select Account'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={ExpenseStyle.button} onPress={() => setCategoryModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={ExpenseStyle.buttonText}>
                <Icon name="tags" size={20} color="#333" />{' '}
                {selectedCategory ? selectedCategory.name : 'Select Category'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSubmitExpense} style={ExpenseStyle.submitButton}>
          <Text style={ExpenseStyle.buttonText}>Submit Expense</Text>
        </TouchableOpacity>

        <View style={ExpenseStyle.calculatorContainer}>
          <View style={ExpenseStyle.displayContainer}>
            <Text style={ExpenseStyle.display}>{inputValue}</Text>
            <TouchableOpacity onPress={handleDeletePress} style={ExpenseStyle.deleteButton}>
              <Text style={ExpenseStyle.deleteButtonText}>x</Text>
            </TouchableOpacity>
          </View>
 {/* Calculator Layout */}
 <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleOperatorPress('+')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('7')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('8')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('9')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleOperatorPress('-')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('4')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('5')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('6')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleOperatorPress('*')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('1')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('2')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('3')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={[ExpenseStyle.row, ExpenseStyle.rowLast]}>
            <TouchableOpacity onPress={() => handleOperatorPress('/')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>÷</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('0')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOperatorPress('.')} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEqualsPress} style={ExpenseStyle.operatorButton}>
              <Text style={ExpenseStyle.operatorButtonText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={ExpenseStyle.dateContainer}>
          <Text style={ExpenseStyle.dateText}>{currentDate}</Text>
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
