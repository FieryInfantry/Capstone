import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import styles from '../Styles/styles'; // Adjust the import according to your file structure

const UpdateInfoScreen = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('example@email.com');
  const [phone, setPhone] = useState('09**********');

  const handleSave = () => {
    Alert.alert('Personal Info Saved', `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`);
  };

  const handleCancel = () => {
    Alert.alert('Changes Canceled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      <Text style={styles.label}>Enter your name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Enter your email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Enter your phone number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateInfoScreen;
