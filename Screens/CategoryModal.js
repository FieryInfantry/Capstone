import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryModal = ({ closeModal }) => {
  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Select a category</Text>
      {/* List of categories */}
      <TouchableOpacity style={styles.categoryButton}>
        <Text>Baby</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.categoryButton}>
        <Text>Beauty</Text>
      </TouchableOpacity>
      {/* Add more categories as needed */}
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
  categoryButton: {
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

export default CategoryModal;
