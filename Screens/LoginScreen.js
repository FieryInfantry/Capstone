import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import axios for API requests
import { useUser } from '../Context/UserContext'; // Import context to set user data and token
import styles from '../Styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For token storage
import { Image } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon for theme toggle

const LoginScreen = () => {
  const [email, setEmail] = useState(''); // For login
  const [password, setPassword] = useState(''); // For login
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(''); // For forgot password
  const [isModalVisible, setModalVisible] = useState(false);

  const { setUserData, setToken, theme, toggleTheme } = useUser(); // Access setUserData and setToken from context to save user data and token
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
    if (!email && !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }
    
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
  
    if (!password) {
      Alert.alert('Error', 'Please enter your password.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.1.102:3000/login', { email, password });
  
      if (response.status === 200) {
        console.log('Login successful', response.data);
        setEmail('');  // Clear email and password fields
        setPassword(''); // Clear password field
  
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
      const response = await axios.post('http://192.168.22.220:3000/forgot-password', { email: forgotPasswordEmail });
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
      <Text style={styles.title}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      </Text>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginBottom: 5 }}>Email</Text>
<TextInput
  style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
  placeholder="Email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
  autoCapitalize="none"
/>

<Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginBottom: 5 }}>Password</Text>
<TextInput
  style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
  placeholder="Password"
  secureTextEntry
  value={password}
  onChangeText={setPassword}
/>


      <TouchableOpacity onPress={toggleModal}>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', textAlign: 'center' }}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} onPress={handleLogin}>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegistration}>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', textAlign: 'center' }}>Don't have an account? Sign up now!</Text>
      </TouchableOpacity>

      {/* Dark Mode Toggle Button */}
      <TouchableOpacity onPress={toggleTheme} style={{ position: 'absolute', top: 40, right: 20 }}>
        <Icon name={theme === 'dark' ? 'moon' : 'sunny'} size={30} color={theme === 'dark' ? '#fff' : '#000'} />
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
              <View style={[styles.modalView, { backgroundColor: theme === 'dark' ? '#333' : '#fff' }]}>
                <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Reset Your Password</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
                  placeholder="Enter your email address"
                  value={forgotPasswordEmail}
                  onChangeText={setForgotPasswordEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} onPress={handleForgotPassword}>
                  <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Submit</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', textAlign: 'center', marginTop: 20 }}>Terms and Conditions | Privacy Policy</Text>
    </View>
  );
};

export default LoginScreen;
