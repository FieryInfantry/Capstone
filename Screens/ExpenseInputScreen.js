import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the Icon component
import ExpenseStyle from '../Styles/ExpenseInput'; // Adjust the path as needed
import AccountModal from './AccountModal'; // Adjust the path as needed
import CategoryModal from './CategoryModal'; // Adjust the path as needed

const ExpenseInputScreen = ({ navigation }) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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
    } catch (error) {
      setInputValue('Error');
    }
  };

  return (
    <View style={ExpenseStyle.container}>
      {/* Main Expense Input Screen */}
      <View style={ExpenseStyle.inputContainer}>
        <Text style={ExpenseStyle.label}>
          <TouchableOpacity
            style={ExpenseStyle.button}
            onPress={() => navigation.navigate('IncomeInputScreen')}
          >
            <Text style={ExpenseStyle.buttonText}>Income</Text>
          </TouchableOpacity> | 
          <TouchableOpacity
            style={ExpenseStyle.button}
            onPress={() => navigation.navigate('ExpenseInputScreen')}
          >
            <Text style={ExpenseStyle.buttonText}>Expense</Text>
          </TouchableOpacity>
        </Text>

        <View style={ExpenseStyle.modalButtonsContainer}>
          <TouchableOpacity
            style={ExpenseStyle.button}
            onPress={() => setAccountModalVisible(true)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="user" size={20} color="#333" /> {/* Icon for Account */}
              <Text style={ExpenseStyle.buttonText}>Account</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={ExpenseStyle.button}
            onPress={() => setCategoryModalVisible(true)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="tags" size={20} color="#333" /> {/* Icon for Category */}
              <Text style={ExpenseStyle.buttonText}>Category</Text>
            </View>
          </TouchableOpacity>
        </View>

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
        
        {/* Display current date and time */}
        <View style={ExpenseStyle.dateContainer}>
          <Text style={ExpenseStyle.dateText}>{currentDate}</Text>
        </View>
      </View>

      {/* Account Modal */}
      <Modal
        transparent={true}
        visible={isAccountModalVisible}
        animationType="slide"
      >
        <AccountModal 
          closeModal={() => setAccountModalVisible(false)} 
        />
      </Modal>

      {/* Category Modal */}
      <Modal
        transparent={true}
        visible={isCategoryModalVisible}
        animationType="slide"
      >
        <CategoryModal 
          closeModal={() => setCategoryModalVisible(false)} 
        />
      </Modal>
    </View>
  );
};

export default ExpenseInputScreen;
