import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import styles from '../Styles/styles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const navigation = useNavigation(); // Initialize navigation

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration'); // Navigate to RegistrationScreen
  };

  const handleLogin = () => {
    // Add your authentication logic here
    // For now, we will just navigate to the DashboardScreen
    navigation.navigate('Dashboard');
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
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Reset Your Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.terms}>Terms and Conditions | Privacy Policy</Text>
    </View>
  );
};

export default LoginScreen;
