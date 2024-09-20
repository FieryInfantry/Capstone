import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const AccountScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [newAccount, setNewAccount] = useState({
    amount: '',
    name: '',
    icon: ''
  });
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [accounts, setAccounts] = useState([
    { name: "Card", balance: 0, icon: 'card-outline' },
    { name: "Cash", balance: 0, icon: 'cash-outline' },
    { name: "Savings", balance: 0, icon: 'piggy-bank-outline' },
    { name: "Untitled", balance: 111, icon: 'piggy-bank-outline' }
  ]);

  const handleSaveAccount = () => {
    if (newAccount.name && newAccount.amount && selectedIcon) {
      setAccounts([...accounts, { name: newAccount.name, balance: parseFloat(newAccount.amount), icon: selectedIcon }]);
      setShowModal(false);
      setNewAccount({ amount: '', name: '', icon: '' });
      setSelectedIcon(null);
    }
  };

  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>EXPENSE SO FAR</Text>
        <Text style={styles.expense}>₱0.00</Text>
        <Text style={styles.summaryText}>INCOME SO FAR</Text>
        <Text style={styles.income}>₱0.00</Text>
      </View>

      <View style={styles.accountsContainer}>
        {accounts.map((account, index) => (
          <View key={index} style={styles.accountItem}>
            <Icon name={account.icon} size={24} color="white" style={styles.accountIcon} />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountBalance}>₱{account.balance.toFixed(2)}</Text>
            </View>
            <Icon name="ellipsis-horizontal" size={24} color="white" style={styles.moreIcon} />
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={() => setShowModal(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ ADD NEW ACCOUNT</Text>
      </TouchableOpacity>

      {/* Modal for Adding New Account */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Add new account</Text>

            <TextInput
              placeholder="Initial amount"
              value={newAccount.amount}
              onChangeText={(text) => setNewAccount({ ...newAccount, amount: text })}
              keyboardType="numeric"
              style={styles.input}
            />
            <Text style={styles.note}>*Initial amount will not be reflected in analysis</Text>

            <TextInput
              placeholder="Name"
              value={newAccount.name}
              onChangeText={(text) => setNewAccount({ ...newAccount, name: text })}
              style={styles.input}
            />

            <Text style={styles.iconLabel}>Icon</Text>
            <View style={styles.iconList}>
              {['cash-outline', 'card-outline', 'piggy-bank-outline', 'wallet-outline', 'logo-usd'].map((icon, index) => (
                <TouchableOpacity key={index} onPress={() => handleIconSelect(icon)}>
                  <Icon
                    name={icon}
                    size={30}
                    color={selectedIcon === icon ? 'gold' : 'white'}
                    style={styles.iconItem}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.cancelButton}>
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveAccount} style={styles.saveButton}>
                <Text style={styles.buttonText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    color: '#000',
  },
  expense: {
    color: 'red',
    fontWeight: 'bold',
  },
  income: {
    color: 'green',
    fontWeight: 'bold',
  },
  accountsContainer: {
    marginBottom: 20,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  accountIcon: {
    marginRight: 10,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: 'white',
    fontSize: 16,
  },
  accountBalance: {
    color: 'white',
  },
  moreIcon: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  note: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 10,
  },
  iconLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  iconList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iconItem: {
    marginHorizontal: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AccountScreen;
