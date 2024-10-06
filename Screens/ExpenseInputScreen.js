import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import ExpenseStyle from '../Styles/ExpenseInput'; // Adjust the path as needed
import AccountModal from './AccountModal'; // Adjust the path as needed
import CategoryModal from './CategoryModal'; // Adjust the path as needed

const ExpenseInputScreen = ({ navigation }) => {
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(''); 

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
          onPress={() => navigation.navigate('IncomeInput')}
        >
          <Text style={ExpenseStyle.buttonText}>Income</Text>
        </TouchableOpacity> | 
        <TouchableOpacity
          style={ExpenseStyle.button}
          onPress={() => navigation.navigate('ExpenseInput')}
        >
          <Text style={ExpenseStyle.buttonText}>Expense</Text>
        </TouchableOpacity>| 
        <TouchableOpacity
          style={ExpenseStyle.button}
          onPress={() => navigation.navigate('TransferInput')}
        >
          <Text style={ExpenseStyle.buttonText}>Transfer</Text>
        </TouchableOpacity></Text>

        <TouchableOpacity
          style={ExpenseStyle.button}
          onPress={() => setAccountModalVisible(true)}
        >
          <Text style={ExpenseStyle.buttonText}>Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ExpenseStyle.button}
          onPress={() => setCategoryModalVisible(true)}
        >
          <Text style={ExpenseStyle.buttonText}>Category</Text>
        </TouchableOpacity>

        <View style={ExpenseStyle.calculatorContainer}>
          <View style={ExpenseStyle.displayContainer}>
            <Text style={ExpenseStyle.display}>{inputValue}</Text>
            <TouchableOpacity onPress={handleDeletePress} style={ExpenseStyle.deleteButton}>
              <Text style={ExpenseStyle.deleteButtonText}>x</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleNumberPress('7')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('8')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('9')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>9</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleNumberPress('4')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('5')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('6')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>6</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleNumberPress('1')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('2')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleNumberPress('3')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>3</Text>
            </TouchableOpacity>
          </View>

          <View style={[ExpenseStyle.row, ExpenseStyle.rowLast]}>
            <TouchableOpacity onPress={() => handleNumberPress('0')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOperatorPress('.')} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleEqualsPress} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>=</Text>
            </TouchableOpacity>
          </View>

          <View style={ExpenseStyle.row}>
            <TouchableOpacity onPress={() => handleOperatorPress('+')} style={[ExpenseStyle.button, ExpenseStyle.operatorButton]}>
              <Text style={[ExpenseStyle.buttonText, ExpenseStyle.operatorButtonText]}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOperatorPress('-')} style={[ExpenseStyle.button, ExpenseStyle.operatorButton]}>
              <Text style={[ExpenseStyle.buttonText, ExpenseStyle.operatorButtonText]}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOperatorPress('*')} style={[ExpenseStyle.button, ExpenseStyle.operatorButton]}>
              <Text style={[ExpenseStyle.buttonText, ExpenseStyle.operatorButtonText]}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleOperatorPress('/')} style={[ExpenseStyle.button, ExpenseStyle.operatorButton]}>
              <Text style={[ExpenseStyle.buttonText, ExpenseStyle.operatorButtonText]}>÷</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearPress} style={ExpenseStyle.button}>
              <Text style={ExpenseStyle.buttonText}>C</Text>
            </TouchableOpacity>
          </View>
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
