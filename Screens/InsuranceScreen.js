import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Ensure this is installed
import axios from 'axios'; // Ensure axios is installed
import AsyncStorage from '@react-native-async-storage/async-storage';

const InsuranceScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  // State for modal inputs
  const [companyName, setCompanyName] = useState('company1');
  const [policyName, setpolicyName] = useState('');
  const [coverageType, setCoverageType] = useState('life insurance');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [potentialBenefits, setPotentialBenefits] = useState('');
  const [insuranceList, setInsuranceList] = useState([]); // To store the list of insurance policies
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null); // To store selected insurance ID for update

  useEffect(() => {
    fetchInsurances(); // Fetch insurance data when the component mounts
  }, []);

  const fetchInsurances = async () => {
    try {
      // Get the user's token from AsyncStorage for authentication
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      // Fetch the list of insurances from the API with the user's token for authentication
      const response = await axios.get('http://localhost:3000/insurances', {
        headers: { Authorization: `Bearer ${token}` } // Include token in the header
      });
  
      setInsuranceList(response.data);
    } catch (error) {
      console.error('Error fetching insurances:', error);
      Alert.alert('Error', 'Failed to fetch insurance data. Please try again later.');
    }
  };

  const handleUpdate = (insurance) => {
    setSelectedInsuranceId(insurance._id);
    setCompanyName(insurance.provider);
    setpolicyName(insurance.policyName);
    setCoverageType(insurance.coverageType);
    setPremiumAmount(insurance.premium);
    setInterestRate(insurance.interestRate);
    setPotentialBenefits(insurance.potentialBenefits);
    setModalVisible(true);
  };

  const handleSave = async () => {
    const updatedInsurance = {
      policyName,
      provider: companyName,
      coverageType,
      premium: premiumAmount,
      interestRate,
      potentialBenefits,
    };
  
    try {
      // Get the user's token from AsyncStorage for authentication
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the token in the header
        },
      };
  
      // Send the PUT request to update the insurance
      await axios.put(`http://localhost:3000/insurances/${selectedInsuranceId}`, updatedInsurance, config);
      Alert.alert('Update', 'Insurance policy updated successfully');
      setModalVisible(false);
      fetchInsurances(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating insurance:', error);
      Alert.alert('Error', 'Failed to update insurance policy');
    }
  };
  
  const handleDelete = async (insuranceId) => {
    try {
      // Get the user's token from AsyncStorage for authentication
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the token in the header
        },
      };
  
      // Send the DELETE request to delete the insurance
      await axios.delete(`http://localhost:3000/insurances/${insuranceId}`, config);
      Alert.alert('Success', 'Insurance policy deleted successfully');
      fetchInsurances(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting insurance:', error);
      Alert.alert('Error', 'Failed to delete insurance policy');
    }
  };
  
  const handleAddSave = async () => {
    const newInsurance = {
      policyName, // Ensure the field name matches the schema
      provider: companyName,
      coverageType,
      premium: parseFloat(premiumAmount), // Parse as a number
      interestRate: parseFloat(interestRate) || undefined, // Handle optional values
      potentialBenefits,
    };
  
    try {
      // Get the user's token from AsyncStorage for authentication
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`, // Include the token in the header
        },
      };
  
      // Send the POST request to add the insurance
      await axios.post('http://localhost:3000/insurances', newInsurance, config);
      Alert.alert('Add', 'Insurance policy added successfully');
      setAddModalVisible(false);
      fetchInsurances(); // Refresh list after adding
    } catch (error) {
      console.error('Error adding insurance:', error);
      Alert.alert('Error', 'Failed to add insurance policy');
    }
  };
  

  const handleCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    // Reset input states
    setCompanyName('company1');
    setpolicyName('');
    setCoverageType('life insurance');
    setPremiumAmount('');
    setInterestRate('');
    setPotentialBenefits('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Insurance Policies</Text>

        {insuranceList.map((insurance) => (
          <View key={insurance._id} style={styles.card}>
            <Text style={styles.label}>Provider: {insurance.provider}</Text>
            <Text style={styles.label}>Policy Name: {insurance.policyName}</Text>
            <Text style={styles.label}>Coverage Details: {insurance.coverageType}</Text>
            <Text style={styles.label}>Premium Payment: {insurance.premium} annually</Text>
            <Text style={styles.label}>Interest Rate: {insurance.interestRate}</Text>
            <Text style={styles.label}>Potential Benefits: {insurance.potentialBenefits}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => handleUpdate(insurance)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => handleDelete(insurance._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
              onChangeText={setpolicyName}
            />

            <Text style={styles.label}>Coverage Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Life Insurance" value="Life Insurance" />
                <Picker.Item label="Health Insurance" value="Health Insurance" />
                <Picker.Item label="Car Insurance" value="Car Insurance" />
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
              onChangeText={setpolicyName}
            />

            <Text style={styles.label}>Coverage Type:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Life Insurance" value="Life Insurance" />
                <Picker.Item label="Health Insurance" value="Health Insurance" />
                <Picker.Item label="Car Insurance" value="Car Insurance" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  pickerContainer: {
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
export default InsuranceScreen;
