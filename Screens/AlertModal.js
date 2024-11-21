import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { useUser } from '../Context/UserContext'; // Import the UserContext
import AlertModal from '../Styles/AlertModal';

const ReusableModal = ({ visible, onClose, title, message, onConfirm, confirmText, cancelText }) => {
  const {theme } = useUser();
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
  const textColor = theme === 'dark' ? '#FFF' : '#000';

  if (!visible) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Handle back button press
    >
      <View style={modalContainerStyle}>
        <View style={modalBackground}>
          {title && <Text style={[AlertModal.title, {color: theme === 'dark' ? '#fff' : '#000'}]}>{title}</Text>}
          {message && <Text style={[AlertModal.message, {color: theme === 'dark' ? '#fff' : '#000'}]}>{message}</Text>}
          <View style={AlertModal.buttonContainer}>
            <Button title={cancelText || 'No'} onPress={onClose} style={AlertModal.cancelButton}/>
            <Button title={confirmText || 'Yes'} onPress={onConfirm} style={AlertModal.deleteButton}/>
          </View>
        </View>
      </View>
    </Modal>
  );
};



export default ReusableModal;
