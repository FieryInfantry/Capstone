import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AccountModal = ({ closeModal }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Select an account</Text>
      {/* List of accounts */}
      <TouchableOpacity style={styles.accountButton}>
        <Text>Card - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountButton}>
        <Text>Cash - ₱0.00</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.accountButton}>
        <Text>Savings - ₱0.00</Text>
      </TouchableOpacity>
      {/* Close button */}
      <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  accountButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  closeButton: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
});

export default AccountModal;
