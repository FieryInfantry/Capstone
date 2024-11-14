import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';  // Import axios
import { useUser } from '../Context/UserContext'; // Import useUser context
import styles from '../Styles/styles';

const RegistrationScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { theme } = useUser(); // Access theme from context

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/register', {
        fullName,
        email,
        password,
      });

      console.log('Registration successful', response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Registration error', error);
      alert('Registration failed');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>Create a New Account</Text>

      <TextInput
        style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Enter your Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Create a password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={[styles.input, { backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Confirm password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} 
        onPress={handleRegistration}
      >
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.footerText, { color: theme === 'dark' ? '#fff' : '#000' }]}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>

      <Text style={[styles.terms, { color: theme === 'dark' ? '#fff' : '#000' }]}>
        Terms and Conditions | Privacy Policy
      </Text>
    </View>
  );
};

export default RegistrationScreen;
