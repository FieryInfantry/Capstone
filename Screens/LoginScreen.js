import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useUser } from '../Context/UserContext';
import styles from '../Styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ErrorMessage from './ErrorMessage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isTermsVisible, setTermsVisible] = useState(false);
  const { setUserData, setToken } = useUser();
  const navigation = useNavigation();
  const [isAccepted, setIsAccepted] = useState(false);
  const openConfirmationModal = () => setConfirmationVisible(true);
  const closeConfirmationModal = () => setConfirmationVisible(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const [isLocked, setIsLocked] = useState(false); // Track if the login is locked
  const [timer, setTimer] = useState(30); // 30 second timer
  const [timerInterval, setTimerInterval] = useState(null); // Store the timer interval
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleConfirmClose = () => {
    setTermsVisible(false); // Close the terms modal
    setConfirmationVisible(false); // Close the confirmation modal
    // Add any other logic to prevent login here if needed
  };
  const handleCloseErrorModal = () => {
    setIsErrorModalVisible(false);
  }

  const handleCancelClose = () => setConfirmationVisible(false);

  // Ref to track modal state
  const termsModalRef = useRef(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setErrorMessage('');
  };

  useEffect(() => {
    if (!isAccepted) {
      console.log("Opening Terms Modal on page load");
      setTermsVisible(true); // Open modal when the page loads
    }
  }, []); // Empty dependency array makes this run only once when the component mounts

  useEffect(() => {
    // Timer countdown when login is locked
    if (isLocked && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsLocked(false); // Unlock login after 30 seconds
            setTimer(30); // Reset timer
          }
          return prevTimer - 1;
        });
      }, 1000); // Decrement every second
      setTimerInterval(interval);
    } else if (timer === 0) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval); // Clean up the interval on component unmount
  }, [isLocked, timer]);

  const handleAcceptTerms = () => {
    console.log("Terms Accepted");
    setIsAccepted(true);
    setTermsVisible(false);
  };

  const openTermsModal = () => {
    setTermsVisible(true);
    termsModalRef.current = false;
  };

  const navigateToRegistration = () => {
    navigation.navigate('Registration');
    setErrorMessage('');
  };

  const navigateToResetPassword = () => {
    navigation.navigate('ResetPassword');
    setErrorMessage('');
  };

  const handleLogin = async () => {
    if (isLocked) {
      setErrorMessage(`Too many failed attempts. Please wait ${timer} seconds.`);
      setIsErrorModalVisible(true);  // Show the error modal
      return;
    }
  
    if (!email || !password) {
      setErrorMessage('Please fill in both email and password.');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.86.51:3000/login', { email, password });
  
      if (response.status === 200) {
        console.log('Login successful', response.data);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setFailedAttempts(0); // Reset failed attempts on successful login
  
        setUserData(response.data.user);
        const token = response.data.token;
        await AsyncStorage.setItem('authToken', token);
        setToken(token);
  
        navigation.navigate('Dashboard');
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error || 'Invalid email or password');
      } else {
        setErrorMessage(error.response.data.error || 'Invalid email or password');
      }
  
      // Track failed login attempts
      setFailedAttempts((prev) => {
        const attempts = prev + 1;
        if (attempts >= 3) {
          setIsLocked(true); // Lock login after 3 failed attempts
          setTimer(30); // Set timer to 30 seconds
          setIsErrorModalVisible(true); // Show the error modal
        }
        return attempts;
      });
    }
  };
  

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      setErrorMessage(error.response.data.error || 'Please enter your email address.');
      return;
    }

    try {
      const response = await axios.post('http://192.168.86.51:3000/forgot-password', { email: forgotPasswordEmail });
      Alert.alert('Success', response.data.message);
      toggleModal();
      setForgotPasswordEmail('');
      navigateToResetPassword();
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
      <Text>Email</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter your Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
      autoCapitalize="none"
      editable={!isLocked} // Disable input when locked
    />

    <Text>Password</Text>
    <TextInput
      style={styles.input}
      placeholder="Password"
      secureTextEntry
      value={password}
      onChangeText={setPassword}
      editable={!isLocked} // Disable input when locked
    />

    <TouchableOpacity onPress={toggleModal}>
      <Text style={styles.forgotPassword}>Forgot your password?</Text>
    </TouchableOpacity>

    {!isModalVisible && <ErrorMessage message={errorMessage} />}
    {isLocked && (
      <Text style={{ color: 'red', marginTop: 10 }}>
        Too many failed attempts. Please wait {timer} seconds before trying to login again.
      </Text>
    )}
    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLocked}>
      <Text style={styles.buttonText}>Login</Text>
    </TouchableOpacity>

    <Text style={styles.footerText}>Don't have an account? 
      <TouchableOpacity onPress={navigateToRegistration}>
        <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Sign up now!</Text>
      </TouchableOpacity>
    </Text>



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

      <Text style={styles.terms}><TouchableOpacity onPress={openTermsModal}><Text>Terms and Conditions</Text></TouchableOpacity> | Privacy Policy</Text>
   
  <Modal
  transparent={true}
  animationType="slide"
  visible={isTermsVisible}
  onRequestClose={openTermsModal}
>
  <View style={styles.termsModalContainer}>
    <View style={styles.termsModalCard}>
      <ScrollView>
        <Text style={styles.termsModalTitle}>Terms and Conditions</Text>
        <Text style={styles.termsModalParagraph}>
          Welcome to FinSync! FinSync is a mobile application designed to help you manage your budget and financial planning by synchronizing your financial resources from various sectors. By accessing or using the FinSync application, you agree to be bound by these Terms and Conditions.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Acceptance of Terms</Text>
        <Text style={styles.termsModalParagraph}>
          By downloading, installing, and using FinSync, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these Terms, you must not use the application.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Eligibility</Text>
        <Text style={styles.termsModalParagraph}>
          - To use FinSync, you must be at least 18 years old and have the legal capacity to enter into binding contracts. By using the application, you represent and warrant that you meet these requirements.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Account Registration</Text>
        <Text style={styles.termsModalParagraph}>
          - To access certain features of FinSync, you need to create an account.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Privacy Policy</Text>
        <Text style={styles.termsModalParagraph}>
          - Your privacy is important to us. Please refer to our [Privacy Policy] for information on how we collect, use, and disclose your personal information.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - By using FinSync, you consent to our collection and use of your personal information as described in the Privacy Policy.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Use of the Application</Text>
        <Text style={styles.termsModalParagraph}>
          - You agree to use FinSync in compliance with all applicable laws and regulations.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - You must not use FinSync for any unlawful or fraudulent purposes, or in any way that might harm FinSync, its users, or third parties.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Intellectual Property</Text>
        <Text style={styles.termsModalParagraph}>
          - FinSync and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by FinSync or its licensors and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - You may use FinSync only for your personal, non-commercial use.
        </Text>
        <Text style={styles.termsModalSectionTitle}>User Content</Text>
        <Text style={styles.termsModalParagraph}>
          - By posting content on or through FinSync, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, distribute, modify, run, copy, publicly perform or display, translate, and create derivative works of your content.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - You are responsible for the content you post and ensure that it does not infringe on the rights of any third party.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Modifications to the Application</Text>
        <Text style={styles.termsModalParagraph}>
          - FinSync reserves the right to modify, suspend, or discontinue, temporarily or permanently, the application or any service to which it connects, with or without notice and without liability to you.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Termination</Text>
        <Text style={styles.termsModalParagraph}>
          - We may terminate or suspend your account and bar access to FinSync immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - If you wish to terminate your account, you may simply discontinue using the application.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Disclaimers</Text>
        <Text style={styles.termsModalParagraph}>
          - FinSync is provided on an "AS IS" and "AS AVAILABLE" basis. Use of the application is at your own risk.
        </Text>
        <Text style={styles.termsModalParagraph}>
          - FinSync makes no warranty that the application will meet your requirements or be available on an uninterrupted, secure, or error-free basis.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Limitation of Liability</Text>
        <Text style={styles.termsModalParagraph}>
          - To the fullest extent permitted by applicable law, in no event shall FinSync be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your use or inability to use the application; (ii) any unauthorized access to or use of our servers and/or any personal information stored therein.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Governing Law</Text>
        <Text style={styles.termsModalParagraph}>
          - These Terms shall be governed and construed in accordance with the laws of Philippines, without regard to its conflict of law provisions.
        </Text>
        <Text style={styles.termsModalSectionTitle}>Changes to Terms</Text>
        <Text style={styles.termsModalParagraph}>
          - FinSync reserves the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </Text>
        <Text style={styles.termsModalParagraph}>
          If you have any questions about these Terms, please contact us at angelchristj@gmail.com.
        </Text>
      </ScrollView>
      <TouchableOpacity
              style={styles.termsModalCloseButton}
              onPress={handleAcceptTerms}
            >
              <Text style={styles.termsModalCloseButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.termsModalCloseButton}
              onPress={openConfirmationModal}
            >
              <Text style={styles.termsModalCloseButtonText}>Close</Text>
            </TouchableOpacity>
    </View>
  </View>
</Modal>
<Modal
        transparent={true}
        animationType="fade"
        visible={isConfirmationVisible}
        onRequestClose={closeConfirmationModal}
      >
        <View style={styles.confirmationModalContainer}>
          <View style={styles.confirmationModalCard}>
            <Text style={styles.confirmationModalText}>
              Are you sure you want to close? You won't be able to login if you do.
            </Text>
            <View style={styles.confirmationButtonsContainer}>
              <TouchableOpacity
                style={styles.confirmationButton}
                onPress={handleConfirmClose}
              >
                <Text style={styles.confirmationButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmationButton}
                onPress={handleCancelClose}
              >
                <Text style={styles.confirmationButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    

    </View>
    
  );
};

export default LoginScreen;