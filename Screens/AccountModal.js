import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AccountModalStyle from '../Styles/AccountModalStyle'

const AccountModal = ({ closeModal }) => {
  return (
    <View style={AccountModalStyle.modalContainer}>
      <Text style={AccountModalStyle.title}>Select an account</Text>
      {/* List of accounts */}
      <TouchableOpacity style={AccountModalStyle.accountButton}>
        <Text>Cash - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AccountModalStyle.accountButton}>
        <Text>GM Bank - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AccountModalStyle.accountButton}>
        <Text>Fico Bank - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AccountModalStyle.accountButton}>
        <Text>BDO - ₱0.00</Text>
      </TouchableOpacity>
      {/* Close button */}
      <TouchableOpacity onPress={closeModal} style={AccountModalStyle.closeButton}>
        <Text style={AccountModalStyle}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};



export default AccountModal;