
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { useUser } from '../Context/UserContext'; // Import context to set user data and token
import styles from '../Styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage
import ErrorMessage from './ErrorMessage';


const LoginScreen = () => {
  const [email, setEmail] = useState(''); // For login
  const [password, setPassword] = useState(''); // For login
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // For forgot password
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { setUserData, setToken } = useUser(); // Access setUserData and setToken from context to save user data and token
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setErrorMessage('');
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
    setErrorMessage('');
  };

  const navigateToResetPassword = () => {
    navigation.navigate('ResetPassword'); // Navigate to Reset Password Screen
    setErrorMessage('');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.220:3000/login', { email, password });

      if (response.status === 200) {
        console.log('Login successful', response.data);
        setEmail('');  // Clear email and password fields
        setPassword('');
        setErrorMessage('');

        // Store user data and token using the useUser context
        setUserData(response.data.user); // Set the user data in the context
        const token = response.data.token; // Extract the token from the response

        // Store the token in AsyncStorage for persistence
        await AsyncStorage.setItem('authToken', token);

        // Store token in context
        setToken(token);

        // Navigate to the Dashboard after successful login
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Invalid email or password');
      } else {
        setErrorMessage(error.response.data.error || 'Invalid email or password');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setErrorMessage(error.response.data.error || 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.100.220:3000/forgot-password', { email: forgotPasswordEmail });
      Alert.alert('Success', response.data.message);
      toggleModal(); // Close the modal after successful submission
      setForgotPasswordEmail(''); // Clear the email input for forgot password
      navigateToResetPassword(); // Navigate to reset password screen
      setErrorMessage('');
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Something went wrong. Please try again later.');
      } else {
        setErrorMessage(error.response.data.error || 'Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      
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
      {!isModalVisible && <ErrorMessage message={errorMessage} />}

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
                 <ErrorMessage message={errorMessage} /> 
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