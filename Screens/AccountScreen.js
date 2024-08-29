import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AccountStyle from "../Styles/AccountStyle";


const AccountScreen = () => {
  return (
    <View style={AccountStyle.container}>
      <Text style={AccountStyle.text}>Welcome to the Account Screen!</Text>
    </View>
  );
};


export default AccountScreen;
