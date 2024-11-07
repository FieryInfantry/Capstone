import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useUser } from '../Context/UserContext'; // Import UserContext
import InsuranceStyle from '../Styles/InsuranceStyle'; // Import the styles

const InsuranceScreen = () => {
  const { theme } = useUser(); // Access theme from context

  const [modalVisible, setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('company1');
  const [policyName, setpolicyName] = useState('');
  const [coverageType, setCoverageType] = useState('life insurance');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [potentialBenefits, setPotentialBenefits] = useState('');
  const [insuranceList, setInsuranceList] = useState([]);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);

  useEffect(() => {
    fetchInsurances(); // Fetch insurance data when the component mounts
  }, []);

  const fetchInsurances = async () => {
    try {
      const response = await axios.get('http://localhost:3000/insurances');
      setInsuranceList(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch insurance data');
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

  const handleDelete = async (insuranceId) => {
    try {
      await axios.delete(`http://localhost:3000/insurances/${insuranceId}`);
      Alert.alert('Success', 'Insurance policy deleted successfully');
      fetchInsurances(); // Refresh the list after deletion
    } catch (error) {
      Alert.alert('Error', 'Failed to delete insurance policy');
    }
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
      await axios.put(`http://localhost:3000/insurances/${selectedInsuranceId}`, updatedInsurance);
      Alert.alert('Update', 'Insurance policy updated successfully');
      setModalVisible(false);
      fetchInsurances(); // Refresh the list after updating
    } catch (error) {
      Alert.alert('Error', 'Failed to update insurance policy');
    }
  };

  const handleAddSave = async () => {
    const newInsurance = {
      policyName,
      provider: companyName,
      coverageType,
      premium: parseFloat(premiumAmount),
      interestRate: parseFloat(interestRate) || undefined,
      potentialBenefits,
    };

    try {
      await axios.post('http://localhost:3000/insurances', newInsurance);
      Alert.alert('Add', 'Insurance policy added successfully');
      setAddModalVisible(false);
      fetchInsurances(); // Refresh list after adding
    } catch (error) {
      Alert.alert('Error', 'Failed to add insurance policy');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setCompanyName('company1');
    setpolicyName('');
    setCoverageType('life insurance');
    setPremiumAmount('');
    setInterestRate('');
    setPotentialBenefits('');
  };

  const containerStyle = { 
    flex: 1, 
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' 
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF'
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';

  return (
    <View style={containerStyle}>
      <View style={InsuranceStyle.detailsContainer}>
        <Text style={[InsuranceStyle.title, { color: textColor }]}>Insurance Policies</Text>

        {insuranceList.map((insurance) => (
          <View key={insurance._id} style={[InsuranceStyle.card, { backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF' }]}>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Provider: {insurance.provider}</Text>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Policy Name: {insurance.policyName}</Text>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Coverage Details: {insurance.coverageType}</Text>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Premium Payment: {insurance.premium} annually</Text>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Interest Rate: {insurance.interestRate}</Text>
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Potential Benefits: {insurance.potentialBenefits}</Text>
            <View style={InsuranceStyle.buttonContainer}>
              <TouchableOpacity style={InsuranceStyle.button} onPress={() => handleUpdate(insurance)}>
                <Text style={InsuranceStyle.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={InsuranceStyle.button} onPress={() => handleDelete(insurance._id)}>
                <Text style={InsuranceStyle.buttonText}>Delete</Text>
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
        <View style={[InsuranceStyle.modalContainer, modalBackground]}>
          <View style={InsuranceStyle.modalView}>
            <Text style={[InsuranceStyle.modalTitle, { color: textColor }]}>Update Insurance Details</Text>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Insurance Company:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={InsuranceStyle.picker}
              >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Policy Name"
              value={policyName}
              onChangeText={setpolicyName}
            />

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Coverage Type:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={InsuranceStyle.picker}
              >
                <Picker.Item label="Life Insurance" value="Life Insurance" />
                <Picker.Item label="Health Insurance" value="Health Insurance" />
                <Picker.Item label="Car Insurance" value="Car Insurance" />
              </Picker>
            </View>

            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Interest Rate"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
            />
            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Potential Benefits"
              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <TouchableOpacity style={InsuranceStyle.modalButton} onPress={handleSave}>
              <Text style={InsuranceStyle.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InsuranceStyle.modalButton} onPress={handleCancel}>
              <Text style={InsuranceStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Button to open Add modal */}
      <TouchableOpacity style={InsuranceStyle.addButton} onPress={() => setAddModalVisible(true)}>
        <MaterialIcons name="add" size={70} color="Black" />
      </TouchableOpacity>

      {/* Modal for adding new insurance details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={handleCancel}
      >
        <View style={[InsuranceStyle.modalContainer, modalBackground]}>
          <View style={InsuranceStyle.modalView}>
            <Text style={[InsuranceStyle.modalTitle, { color: textColor }]}>Add Insurance Details</Text>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Insurance Company:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={InsuranceStyle.picker}
              >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Policy Name"
              value={policyName}
              onChangeText={setpolicyName}
            />

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Coverage Type:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={coverageType}
                onValueChange={(itemValue) => setCoverageType(itemValue)}
                style={InsuranceStyle.picker}
              >
                <Picker.Item label="Life Insurance" value="Life Insurance" />
                <Picker.Item label="Health Insurance" value="Health Insurance" />
                <Picker.Item label="Car Insurance" value="Car Insurance" />
              </Picker>
            </View>

            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Premium Amount"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
              keyboardType="numeric"
            />
            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Interest Rate"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
            />
            <TextInput
              style={[InsuranceStyle.input, { color: textColor }]}
              placeholder="Enter Potential Benefits"
              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <TouchableOpacity style={InsuranceStyle.modalButton} onPress={handleAddSave}>
              <Text style={InsuranceStyle.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={InsuranceStyle.modalButton} onPress={handleCancel}>
              <Text style={InsuranceStyle.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InsuranceScreen;
