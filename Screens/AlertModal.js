import { Modal, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useUser } from '../Context/UserContext'; // Import the UserContext
import AlertModal from '../Styles/AlertModalStyle';

const ReusableModal = ({
  visible,
  onClose,
  title,
  message,
  onConfirm,
  confirmText,
  cancelText,
}) => {
  const { theme } = useUser();

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:
      theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
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
      onRequestClose={onClose}
    >
      <View style={modalContainerStyle}>
        <View style={modalBackground}>
          {title && (
            <Text
              style={[
                AlertModal.title,
                { color: theme === 'dark' ? '#fff' : '#000' },
              ]}
            >
              {title}
            </Text>
          )}
          {message && (
            <Text
              style={[
                AlertModal.message,
                { color: theme === 'dark' ? '#fff' : '#000' },
              ]}
            >
              {message}
            </Text>
          )}
          <View style={AlertModal.buttonContainer}>
            <TouchableOpacity
              style={[AlertModal.cancelButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}
              onPress={onClose}
            >
              <Text style={{ color: '#FFF', textAlign: 'center' }}>
                {cancelText || 'No'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AlertModal.deleteButton}
              onPress={onConfirm}
            >
              <Text style={{ color: '#FFF', textAlign: 'center' }}>
                {confirmText || 'Yes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReusableModal;
