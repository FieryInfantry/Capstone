import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BudgetStyle from "../Styles/BudgetStyle";

const BudgetScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={BudgetStyle.container}>
      <Text style={BudgetStyle.text}>Welcome to the Budget Screen!</Text>
      <TouchableOpacity 
        style={BudgetStyle.floatingButton} 
        onPress={() => navigation.navigate('ExpenseInput')}
      >
        <Text style={BudgetStyle.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BudgetScreen;
