import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import styles from '../Styles/styles'; // Adjust the import according to your file structure
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Make sure this is installed

const InsuranceScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false); // New state for Add modal

  // State for modal inputs
  const [companyName, setCompanyName] = useState('company1');
  const [policyName, setPolicyName] = useState('');
  const [coverageType, setCoverageType] = useState('life insurance');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [potentialBenefits, setPotentialBenefits] = useState('');

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleUpdate = () => {
    setModalVisible(true);
  };

  const handleDelete = () => {
    Alert.alert('Delete', 'You clicked Delete');
    // Implement delete functionality here
  };

  const handleSave = () => {
    // Save the data and close modal
    Alert.alert('Update', 'Insurance policy updated successfully');
    setModalVisible(false);
    // Implement the save functionality here
  };

  const handleAddSave = () => {
    Alert.alert('Add', 'Insurance policy added successfully');
    setAddModalVisible(false);
    // Implement add functionality here
  };

  const handleCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false); // Close add modal
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Insurance Policy</Text>
          <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
            <MaterialIcons name="more-vert" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {menuVisible && (
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem} onPress={handleUpdate}>
              <Text>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleDelete}>
              <Text>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>Policy Number:</Text>
        <Text style={styles.value}>123456789</Text>
        <Text style={styles.label}>Coverage Details:</Text>
        <Text style={styles.value}>Comprehensive Coverage</Text>
        <Text style={styles.label}>Premium Payment:</Text>
        <Text style={styles.value}>10000 annually</Text>
        <Text style={styles.label}>Schedule:</Text>
        <Text style={styles.value}>Monthly</Text>
        <Text style={styles.label}>Interest Rate/ Dividend Rate:</Text>
        <Text style={styles.value}>3%</Text>
        <Text style={styles.label}>History:</Text>
        <Text style={styles.value}>No claims history</Text>
        <Text style={styles.label}>Potential Benefits Details:</Text>
        <Text style={styles.value}>Life coverage, accident coverage</Text>
      </View>

      {/* Modal for updating insurance details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Update Insurance Details</Text>

            {/* Insurance Company Picker */}
            <Text style={styles.label}>Insurance Company:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Policy Name"
              value={policyName}
              onChangeText={setPolicyName}
            />

            <Text style={styles.label}>Coverage Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Life Insurance" value="life insurance" />
                <Picker.Item label="Health Insurance" value="health insurance" />
                <Picker.Item label="Car Insurance" value="car insurance" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Interest Rate"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Potential Benefits"
              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Button to open Add modal */}
      <TouchableOpacity style={styles.addButton} onPress={() => setAddModalVisible(true)}>
        <MaterialIcons name="add" size={70} color="Black" />
      </TouchableOpacity>

      {/* Modal for adding new insurance details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Insurance Details</Text>

            {/* Insurance Company Picker */}
            <Text style={styles.label}>Insurance Company:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Policy Name"
              value={policyName}
              onChangeText={setPolicyName}
            />

            <Text style={styles.label}>Coverage Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Life Insurance" value="life insurance" />
                <Picker.Item label="Health Insurance" value="health insurance" />
                <Picker.Item label="Car Insurance" value="car insurance" />
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Interest Rate"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Potential Benefits"
              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleAddSave}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InsuranceScreen;
