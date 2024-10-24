import React from 'react';
import { Alert,View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import styles from '../Styles/styles'; // Update to your merged styles file

const SettingsScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  const handleChangePassword = () => {
    // Placeholder for password change functionality
    Alert.alert('Change Password pressed');
  };

  const handleLogout = () => {
    // Placeholder for logout functionality
    Alert.alert('Logout pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Theme Selection Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Theme</Text>
        <View style={styles.themeOptions}>
          <TouchableOpacity style={styles.optionButton}>
            <Text>Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text>Light</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Language Selection Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Language</Text>
        {/* Add language options here if needed */}
      </View>

      {/* Action Buttons */}
      <TouchableOpacity 
        style={[styles.actionButton, styles.updateButton]} 
        onPress={() => navigation.navigate('UpdateInfoScreen')} // Navigate to UpdateInfoScreen
      >
        <Text style={styles.buttonText}>Update Personal Info</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, styles.changePasswordButton]} 
        onPress={() => navigation.navigate('ChangepasswordScreen')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, styles.logoutButton]} 
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Logout</Text>
        
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
