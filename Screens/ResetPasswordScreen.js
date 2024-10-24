import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import styles from '../Styles/styles';


const ResetPasswordScreen = () => {
  const [email, setEmail] = useState(''); // New email state
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    // Validate input fields
    if (!email || !verificationCode || !newPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      // Make a request to the backend to reset the password
      const response = await axios.post('http://localhost:3000/reset-password', {
        email,                // Send the email
        resetToken: verificationCode, // Renamed to match backend
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been reset successfully!');
        navigation.navigate('Login');
        // Redirect to login after password reset
      }
    } catch (error) {
      // Handle reset password errors
      if (error.response) {
        Alert.alert('Error', error.response.data.error || 'Invalid code or something went wrong');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
