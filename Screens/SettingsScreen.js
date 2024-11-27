// SettingsScreen.js
import React, { useEffect } from 'react';
import { Alert, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Icon from react-native-vector-icons
import { useUser } from '../Context/UserContext'; // Import the UserContext hook
import styles from '../Styles/styles'; // Import your merged styles
import { Switch } from 'react-native'; // Import Switch component
const SettingsScreen = () => {
  const { theme, toggleTheme } = useUser(); // Access theme and toggle function from UserContext
  const navigation = useNavigation();

  // Fetch the saved theme preference when the component mounts
  useEffect(() => {
    // AsyncStorage logic is now handled by context, no need to manage state manually here
  }, []);

  const handleChangePassword = () => {
    Alert.alert('Change Password pressed');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
      <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#000' }]}>Settings</Text>

      {/* Theme Selection Section */}
      <Text style={[styles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Theme</Text>

{/* Dark Mode Toggle Switch */}
<View style={styles.toggleContainer}>
  <Text style={{ color: theme === 'dark' ? '#fff' : '#000', marginRight: 10 }}>
    {theme === 'dark' ? 'Dark' : 'Light'}
  </Text>
  
  {/* Switch Icon */}
  <Switch
    value={theme === 'dark'}
    onValueChange={toggleTheme} // Toggle the theme on switch change
    thumbColor={theme === 'dark' ? '#fff' : '#000'}
    trackColor={{ false: '#767577', true: '#81b0ff' }}
  />
  
  {/* Icon Button (Optional, if you still want the moon/sun icon) */}
  <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
    <Icon
      name={theme === 'dark' ? 'moon' : 'sunny'} // Toggle between moon and sun icons
      size={30}
      color={theme === 'dark' ? '#fff' : '#000'}
    />
  </TouchableOpacity>
</View>



      {/* Action Buttons */}
      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={() => navigation.navigate('UpdateInfoScreen')}
      >
        <Text style={styles.buttonText}>Update Personal Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={() => navigation.navigate('ChangepasswordScreen')}
      >
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>


    </View>
  );
};

export default SettingsScreen;
