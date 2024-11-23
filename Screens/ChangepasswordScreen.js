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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false); // Show password state for current password
  const [showNewPassword, setShowNewPassword] = useState(false); // Show password state for new password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Show password state for confirm password

  const handleSave = async () => {
    // First, check if the current password is correct
    try {
      const response = await axios.post(
        'http://localhost:3000/verify-password',
        { currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.valid) {
        // If the current password is correct, check if new password and confirm password match
        if (newPassword !== confirmPassword) {
          Alert.alert('Error', 'New password and confirm password do not match.');
          return;
        }

        // Proceed with changing the password
        const changePasswordResponse = await axios.post(
          'http://localhost:3000/change-password',
          { currentPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        Alert.alert('Success', changePasswordResponse.data.message);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert('Error', 'Current password is incorrect.');
      }
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
  const textColor = theme === 'dark' ? '#FFF' : '#000';
  const inputBackground = theme === 'dark' ? '#333' : '#FFF';


  return (
    <View style={containerStyle}>
      {/* Current Password */}
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginBottom: 5 }}>Current Password</Text>
      <TextInput
        style={{
          backgroundColor: inputBackground,
          color: textColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry={!showCurrentPassword}
        placeholder="Current Password"
      />
      
      {/* New Password */}
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginBottom: 5 }}>New Password</Text>
      <TextInput
        style={{
          backgroundColor: inputBackground,
          color: textColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}        
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!showNewPassword}
        placeholder="New Password"
      />
      
      {/* Confirm Password */}
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginBottom: 5 }}>Confirm Password</Text>
      <TextInput
        style={{
          backgroundColor: inputBackground,
          color: textColor,
          borderRadius: 5,
          padding: 10,
          marginBottom: 20,
        }}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        placeholder="Confirm Password"
      />

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBackgroundColor }]} // Apply dynamic background color based on theme
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
