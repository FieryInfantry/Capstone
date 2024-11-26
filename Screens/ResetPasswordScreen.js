import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import styles from '../Styles/styles';
import ErrorMessage from './ErrorMessage';



const ResetPasswordScreen = () => {
  const [email, setEmail] = useState(''); // New email state
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    // Validate input fields
    if (!email || !verificationCode || !newPassword) {
      setErrorMessage('All fields are required. Please provide the following.');
      return;
    }

    try {
      // Make a request to the backend to reset the password
      const response = await axios.post('http://192.168.0.115:3000/reset-password', {
        email,                // Send the email
        resetToken: verificationCode, // Renamed to match backend
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Your password has been reset successfully!');
        navigation.navigate('Login');
        setErrorMessage('');
        // Redirect to login after password reset
      }
    } catch (error) {
      // Handle reset password errors
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage(error.response.data.error);
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
<ErrorMessage message={errorMessage} /> 
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPasswordScreen;
