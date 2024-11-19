import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../Context/UserContext'; // Import UserContext to access the theme
import styles from '../Styles/styles'; // Adjust the import according to your file structure

const UpdateInfoScreen = () => {
  const { theme } = useUser(); // Get theme from context
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('example@email.com');
  const [phone, setPhone] = useState('09**********');

  const handleSave = () => {
    Alert.alert('Personal Info Saved', `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`);
  };

  const handleCancel = () => {
    Alert.alert('Changes Canceled');
  };

  // Define dynamic styles based on the theme
  const containerStyle = {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF',
    padding: 20,
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';
  const inputBackground = theme === 'dark' ? '#333' : '#FFF';
  const buttonBackground = theme === 'dark' ? '#31511E' : '#859F3D';
  const buttonTextColor = theme === 'dark' ? '#FFF' : '#FFF';
  const cancelButtonBackground = theme === 'dark' ? '#31511E' : '#859F3D';

  return (
    <View style={containerStyle}>

<Text style={{ color: textColor, marginBottom: 5 }}>Full Name</Text>
<TextInput
  style={{
    backgroundColor: inputBackground,
    color: textColor,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }}
  placeholder="Name"
  placeholderTextColor="#aaa"
  value={name}
  onChangeText={setName}
/>

<Text style={{ color: textColor, marginBottom: 5 }}>Email</Text>
<TextInput
  style={{
    backgroundColor: inputBackground,
    color: textColor,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }}
  placeholder="Email"
  placeholderTextColor="#aaa"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>

<Text style={{ color: textColor, marginBottom: 5 }}>Phone Number</Text>
<TextInput
  style={{
    backgroundColor: inputBackground,
    color: textColor,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  }}
  placeholder="Number"
  placeholderTextColor="#aaa"
  value={phone}
  onChangeText={setPhone}
  keyboardType="phone-pad"
/>

<TouchableOpacity
  style={{
    backgroundColor: buttonBackground,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  }}
  onPress={handleSave}
>
  <Text style={{ color: buttonTextColor, fontSize: 16 }}>Save</Text>
</TouchableOpacity>

    </View>
  );
};

export default UpdateInfoScreen;
