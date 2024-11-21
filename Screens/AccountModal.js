import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AccountModalStyle from '../Styles/AccountModalStyle'
import { useUser } from '../Context/UserContext'; // Import the UserContext


const AccountModal = ({ closeModal }) => {
  const { userData, theme } = useUser();
  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  };
  return (
    <View style={modalContainerStyle}>
    <View style={modalBackground}>
      <Text style={AccountModalStyle.modalTitle}>Select an account</Text>
      {/* List of accounts */}
      <TouchableOpacity style={[AccountModalStyle.accountButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', alignItems: 'center' }]}>
        <Text style={AccountModalStyle.accountButtonText}>Cash - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AccountModalStyle.accountButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}>
        <Text style={AccountModalStyle.accountButtonText}>GM Bank - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AccountModalStyle.accountButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}>
        <Text style={AccountModalStyle.accountButtonText}>Fico Bank - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[AccountModalStyle.accountButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}>
        <Text style={AccountModalStyle.accountButtonText}>BDO - ₱0.00</Text>
      </TouchableOpacity>
      {/* Close button */}
      <TouchableOpacity onPress={closeModal} style={AccountModalStyle.closeButton}>
        <Text style={AccountModalStyle.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
};



export default AccountModal;