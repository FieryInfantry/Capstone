import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  // Import axios
import ErrorMessage from './ErrorMessage';
import styles from '../Styles/styles';

const RegistrationScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');


  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (!fullName || !email || !password || !confirmPassword){
      setErrorMessage('All fields are required. Please provide the following.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.0.115:3000/register', {
        fullName,
        email,
        password,
      });
      

      console.log('Registration successful', response.data);
      navigation.navigate('Login');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Registration error');
      alert('Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
<ErrorMessage message={errorMessage} /> 
      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>


        <Text style={styles.footerText}>Already have an account?<TouchableOpacity onPress={() => navigation.navigate('Login')}>
  <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Login</Text>
</TouchableOpacity></Text>


      <Text style={styles.terms}>Terms and Conditions | Privacy Policy</Text>
    </View>
  );
};

export default RegistrationScreen;