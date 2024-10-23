import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Modal, TextInput } from 'react-native';

const BankList = ({ navigation }) => {
  const [banks, setBanks] = useState([
    {
      id: '1',
      name: 'Bank A',
      type: 'Savings',
      balance: '$5000',
      interestRate: '1.5%',
      rewards: 'Cashback',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentBank, setCurrentBank] = useState(null);

  const handleDelete = (id) => {
    setCurrentBank({ id, action: 'delete' });
    setIsModalVisible(true);
  };

  const handleUpdate = (bank) => {
    navigation.navigate('AddUpdateBank', { bank, updateBank: updateBank });
  };

  const updateBank = (updatedBank) => {
    setBanks((prevBanks) =>
      prevBanks.map((bank) => (bank.id === updatedBank.id ? updatedBank : bank))
    );
  };

  const addBank = (newBank) => {
    setBanks((prevBanks) => [...prevBanks, newBank]);
  };

  const confirmDelete = () => {
    if (currentBank) {
      setBanks((prevBanks) => prevBanks.filter((bank) => bank.id !== currentBank.id));
      setCurrentBank(null);
    }
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={banks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bankItem}>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text>{item.balance}</Text>
            <Text>{item.interestRate}</Text>
            <Text>{item.rewards}</Text>
            <Button title="Update" onPress={() => handleUpdate(item)} />
            <Button title="Delete" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
      <Button title="Add Bank" onPress={() => navigation.navigate('AddUpdateBank', { addBank })} />
      
      {/* Modal for password confirmation for deletion */}
      {isModalVisible && (
        <Modal transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Enter Password to Confirm Deletion</Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
              />
              <Button title="Confirm" onPress={confirmDelete} />
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  bankItem: {
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
});

export default BankList;
