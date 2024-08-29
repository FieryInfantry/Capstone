import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BudgetStyle from "../Styles/BudgetStyle";


const BudgetScreen = () => {
  return (
    <View style={BudgetStyle.container}>
      <Text style={BudgetStyle.text}>Welcome to the Budget Screen!</Text>
    </View>
  );
};

export default BudgetScreen;
