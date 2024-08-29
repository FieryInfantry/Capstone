import React from "react";
import { View, Text, TouchableOpacity, Image, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AnalysisStyle from "../Styles/AnalysisStyle";


const AnalysisScreen = () => {
  return (
    <View style={AnalysisStyle.container}>
      <Text style={AnalysisStyle.text}>Welcome to the Analysis Sreen!</Text>
    </View>
  );
};



export default AnalysisScreen;
