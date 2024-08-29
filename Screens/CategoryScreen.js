import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryStyle from "../Styles/CategoryStyle";


const CategoryScreen = () => {
  return (
    <View style={CategoryStyle.container}>
      <Text style={CategoryStyle.text}>Welcome to the Category Screen!</Text>
    </View>
  );
};


export default CategoryScreen;
