import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../Context/UserContext';
import axios from 'axios';
import styles from '../Styles/styles';

const ChangePasswordScreen = () => {
  const { theme, token } = useUser(); // Access theme and token from context

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/change-password',
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Success', response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Password change failed');
    }
  };

  const handleCancel = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    Alert.alert('Changes Canceled');
  };

  // Conditional button styles for dark and light mode
  const buttonBackgroundColor = theme === 'dark' ? '#31511E' : '#859F3D'; // Dark green for dark mode, blue for light mode

  const containerStyle = {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF',
    padding: 20,
  };

  return (
    <View style={containerStyle}>
      <Text style={[styles.title, { color: theme === 'dark' ? '#FFF' : '#000' }]}>Change Password</Text>
      
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        placeholder="Current Password"
      />
      
      <TextInput
        style={styles.input}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholder="New Password"
      />
      
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholder="Confirm Password"
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]} // Apply dynamic background color based on theme
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]} // Apply dynamic background color based on theme
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
