import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import styles from '../Styles/styles';

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // For login
  const [password, setPassword] = useState(''); // For login
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // For forgot password
  const [isModalVisible, setModalVisible] = useState(false);
  
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
  };

  const navigateToResetPassword = () => {
    navigation.navigate('ResetPassword'); // Navigate to Reset Password Screen
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
  
    try {
      // Make a request to the backend for login
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
  
      // If login is successful, navigate to Dashboard
      if (response.status === 200) {
        console.log('Login successful', response.data);
        navigation.navigate('Dashboard'); // Redirect to DashboardScreen
      }
    } catch (error) {
      // Handle login errors
      if (error.response) {
        console.error('Login error', error.response.data);
        Alert.alert('Login Failed', error.response.data.error || 'Invalid email or password');
      } else {
        console.error('Login error', error);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email: forgotPasswordEmail });
      Alert.alert('Success', response.data.message);
      toggleModal(); // Close the modal after successful submission
      setForgotPasswordEmail(''); // Clear the email input for forgot password
      navigateToResetPassword(); // Navigate to reset password screen
    } catch (error) {
      if (error.response) {
        Alert.alert('Error', error.response.data.error || 'Something went wrong');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LOGO</Text>
      <Text style={styles.subtitle}>Welcome to</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={toggleModal}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegistration}>
        <Text style={styles.footerText}>Don't have an account? Sign up now!</Text>
      </TouchableOpacity>

      {/* Forgot Password Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Reset Your Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email address"
                  value={forgotPasswordEmail}
                  onChangeText={setForgotPasswordEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={styles.modalButton} onPress={handleForgotPassword}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={styles.terms}>Terms and Conditions | Privacy Policy</Text>
    </View>
  );
};

export default LoginScreen;
