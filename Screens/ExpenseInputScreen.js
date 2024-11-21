import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
import ExpenseStyle from '../Styles/ExpenseInput'; // Adjust the path as needed
import AccountModal from './AccountModal'; // Adjust the path as needed
import CategoryModal from './CategoryModal'; // Adjust the path as needed
import axios from 'axios'; // To send HTTP requests
import { useUser } from '../Context/UserContext'; // Use UserContext for theme

const ExpenseInputScreen = ({ navigation }) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [category, setCategory] = useState(''); // Category to be selected
  const [amount, setAmount] = useState(''); // Amount input
  const [selectedAccount, setSelectedAccount] = useState(null); // Selected account
  const { theme } = useUser(); // Retrieve theme from context
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const date = now.toLocaleDateString();
      const time = now.toLocaleTimeString();
      setCurrentDate(`${date} | ${time}`);
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  const handleNumberPress = (number) => {
    setInputValue(inputValue + number);
  };

  const handleClearPress = () => {
    setInputValue('');
  };

  const handleDeletePress = () => {
    setInputValue(inputValue.slice(0, -1)); // Remove last character
  };

  const handleOperatorPress = (operator) => {
    setInputValue(inputValue + operator);
  };

  const handleEqualsPress = () => {
    try {
      const result = eval(inputValue);
      setInputValue(result.toString());
      setAmount(result.toString()); // Set the result as amount
    } catch (error) {
      setInputValue('Error');
    }
  };

  const handleSubmitExpense = async () => {
    if (!category || !amount || !selectedAccount) {
      Alert.alert('Error', 'Category, amount, and account are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/expense', {
        category,
        amount: parseFloat(amount),
        accountId: selectedAccount.id, // Include the selected account
        date: new Date().toISOString(), // Send current date
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Expense added successfully');
        setAmount('');
        setCategory('');
        setSelectedAccount(null);
        setInputValue('');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while saving the expense.');
    }
  };

  return (
    <View style={[
      ExpenseStyle.container,
      { backgroundColor: isDarkMode ? '#1A1A1A' : '#F6FCDF' },
    ]}>
      <View style={ExpenseStyle.inputContainer}>
        <Text style={ExpenseStyle.label}>
          <TouchableOpacity
            style={[ExpenseStyle.button, { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }]}
            onPress={() => navigation.navigate('IncomeInputScreen')}
          >
            <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Income</Text>
          </TouchableOpacity>{' '}
          |
          <TouchableOpacity
            style={[ExpenseStyle.button, { backgroundColor: isDarkMode ? '#31511E' : '#859F3D' }]}
            onPress={() => navigation.navigate('ExpenseInputScreen')}
          >
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
    <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#fff'} /> {selectedAccount ? selectedAccount.name : 'Account'}
    </Text>
  </View>
</TouchableOpacity>

<TouchableOpacity
  style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]}
  onPress={() => setCategoryModalVisible(true)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>
    <Icon name="user" size={20} color={isDarkMode ? '#FFF' : '#fff'} /> {category || 'Category'}
    </Text>
  </View>
</TouchableOpacity>

        </View>

        <View>
          <TouchableOpacity onPress={handleSubmitExpense} style={[ExpenseStyle.button, {backgroundColor: isDarkMode ? '#31511E' : '#859F3D'}]}>
          <Text style={[ExpenseStyle.buttonText, { color: isDarkMode ? '#FFF' : '#fff' }]}>Submit Expense</Text>
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
  onCategorySelect={(selectedCategory) => {
    setCategory(selectedCategory.name); // Save the selected category name
    console.log('Category Selected:', selectedCategory); // Debugging
  }}
/>
      </Modal>
    </View>
  );
};

export default ExpenseInputScreen;
