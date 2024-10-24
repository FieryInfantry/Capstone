import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../Styles/styles'; // Adjust the import according to your file structure
import { Picker } from '@react-native-picker/picker'; // Make sure to install this package

const UpdateInsuranceScreen = () => {
  const [insuranceCompany, setInsuranceCompany] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [coverageType, setCoverageType] = useState('');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [potentialBenefits, setPotentialBenefits] = useState('');

  const handleUpdate = () => {
    Alert.alert('Update', 'Insurance details updated successfully');
    // Implement the update functionality here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Insurance Information</Text>

      <Text style={styles.label}>Enter Insurance Company Name:</Text>
      <Picker
        selectedValue={insuranceCompany}
        style={styles.input}
        onValueChange={(itemValue) => setInsuranceCompany(itemValue)}
      >
        <Picker.Item label="Select a company" value="" />
        <Picker.Item label="Company 1" value="company1" />
        <Picker.Item label="Company 2" value="company2" />
        <Picker.Item label="Company 3" value="company3" />
      </Picker>

      <Text style={styles.label}>Enter Policy Name:</Text>
      <TextInput
        style={styles.input}
        value={policyName}
        onChangeText={setPolicyName}
        placeholder="Enter policy name"
      />

      <Text style={styles.label}>Coverage Type:</Text>
      <Picker
        selectedValue={coverageType}
        style={styles.input}
        onValueChange={(itemValue) => setCoverageType(itemValue)}
      >
        <Picker.Item label="Select coverage type" value="" />
        <Picker.Item label="Life Insurance" value="life" />
        <Picker.Item label="Car Insurance" value="car" />
        <Picker.Item label="Hospital Insurance" value="hospital" />
      </Picker>

      <Text style={styles.label}>Enter Premium Amount:</Text>
      <TextInput
        style={styles.input}
        value={premiumAmount}
        onChangeText={setPremiumAmount}
        placeholder="Enter premium amount"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Enter Interest/Dividend Rate:</Text>
      <TextInput
        style={styles.input}
        value={interestRate}
        onChangeText={setInterestRate}
        placeholder="Enter interest/dividend rate"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Enter Potential Benefits:</Text>
      <TextInput
        style={styles.input}
        value={potentialBenefits}
        onChangeText={setPotentialBenefits}
        placeholder="Enter potential benefits"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => {/* Navigate back or cancel action */}}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateInsuranceScreen;
