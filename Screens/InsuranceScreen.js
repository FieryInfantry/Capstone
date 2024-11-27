import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useUser } from '../Context/UserContext'; // Import UserContext
import InsuranceStyle from '../Styles/InsuranceStyle'; // Import the styles
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native';
import ReusableModal from './AlertModal';
import styles from '../Styles/styles';

const InsuranceScreen = () => {
  const { theme } = useUser(); // Access theme from context


  const [isModalVisible, setDeleteModalVisible] = useState(false);

  const [modalVisible,  setModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [companyName, setCompanyName] = useState('company1');
  const [policyName, setPolicyName] = useState('');
  const [coverageType, setCoverageType] = useState('life insurance');
  const [premiumAmount, setPremiumAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [potentialBenefits, setPotentialBenefits] = useState('');
  const [insuranceList, setInsuranceList] = useState([]);
  const [selectedInsuranceId, setSelectedInsuranceId] = useState(null);
  const [investmentList, setInvestmentList] = useState([]);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [duration, setDuration] = useState('1'); // Default duration as string
  const [predictedValues, setPredictedValues] = useState([]);
  const [selectedInvestment, setSelectedInvestment] = useState(null);


  const navigation = useNavigation(); // For navigation control

  const handleUpdateInvestment = (item) => {
    setSelectedInvestment(item);  // Set the investment to be updated
    console.log('Selected Investment:', item); // Debugging: log the selected item
    setIsUpdateModalVisible(true); // Open the update modal
  };
  
  


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ paddingRight: 15 }} // Add padding to the right
          onPress={() => setAddModalVisible(true)} // Show modal when clicked
        >
          <MaterialIcons 
            name="add" 
            size={30} 
            color="black" // Icon color
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    fetchInsurances();
    fetchInvestments(); // Fetch insurance data when the component mounts
  }, []);

  const fetchInsurances = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://192.168.0.115:3000/insurances', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInsuranceList(response.data);
    } catch (error) {
      console.error('Error fetching insurances:', error);
      Alert.alert('Error', 'Failed to fetch insurance data. Please try again later.');
    }
  };

  const fetchInvestments = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }
  
      const response = await axios.get('http://192.168.0.115:3000/investments', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setInvestmentList(response.data); // Assuming you have a state for storing investments
    } catch (error) {
      console.error('Error fetching investments:', error);
      Alert.alert('Error', 'Failed to fetch investment data. Please try again later.');
    }
  };
  

  const handleUpdate = (insurance) => {
    setSelectedInsuranceId(insurance._id);
    setCompanyName(insurance.provider);
    setPolicyName(insurance.policyName);
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
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.put(`http://192.168.0.115:3000/insurances/${selectedInsuranceId}`, updatedInsurance, config);
      Alert.alert('Update', 'Insurance policy updated successfully');
      setModalVisible(false);
      fetchInsurances();
    } catch (error) {
      console.error('Error updating insurance:', error);
      Alert.alert('Error', 'Failed to update insurance policy');
    }
  };

  
  const handleDelete = async (insuranceId) => {
    try {
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.delete(`http://192.168.0.115:3000/insurances/${insuranceId}`, config);
      Alert.alert('Success', 'Insurance policy deleted successfully');
      fetchInsurances();
    } catch (error) {
      console.error('Error deleting insurance:', error);
      Alert.alert('Error', 'Failed to delete insurance policy');
    }
  };

  const handleDeleteInvestment = async (investmentId) => {
    try {
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
  
      await axios.delete(`http://192.168.0.115:3000/investments/${investmentId}`, config);
      Alert.alert('Success', 'Investment deleted successfully');
      fetchInvestments(); // Call the fetch function to refresh the investment list
    } catch (error) {
      console.error('Error deleting investment:', error);
      Alert.alert('Error', 'Failed to delete investment');
    }
  };

  const handleSaveInvestment = async () => {
    try {
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
  
      // Ensure the selectedInvestment is properly populated before sending to backend
      const investmentData = {
        investmentAmount: selectedInvestment?.investmentAmount,  // Use selectedInvestment directly
        interestRate: selectedInvestment?.interestRate,
        duration: selectedInvestment?.duration,
        predictedValues: selectedInvestment?.predictedValues,  // If applicable, ensure it's defined
      };
  
      console.log('Investment Data:', investmentData); // Debugging to verify the data
  
      // Update the investment
      await axios.put(`http://192.168.0.115:3000/investments/${selectedInvestment._id}`, investmentData, config);
  
      Alert.alert('Success', 'Investment updated successfully');
      fetchInvestments(); // Refresh the investment list
      setIsUpdateModalVisible(false); // Close the modal
    } catch (error) {
      console.error('Error updating investment:', error);
      Alert.alert('Error', 'Failed to update investment');
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
      const userToken = await AsyncStorage.getItem('authToken');
      if (!userToken) {
        Alert.alert('Error', 'User is not authenticated. Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      await axios.post('http://192.168.0.115:3000/insurances', newInsurance, config);
      Alert.alert('Add', 'Insurance policy added successfully');
      setAddModalVisible(false);
      fetchInsurances();
    } catch (error) {
      console.error('Error adding insurance:', error);
      Alert.alert('Error', 'Failed to add insurance policy');
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setAddModalVisible(false);
    setCompanyName('company1');
    setPolicyName('');
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
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#FFF'
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)', // Adjusted opacity for modal background
  };
  const inputBackground = theme === 'dark' ? '#333' : '#FFF';
  const border = theme === 'dark' ? "1a1a19" : "#859F3D";
  
return (
  <View style={containerStyle}>
    <View style={{ padding: 20 }}>
      {/* Insurance Section */}
      {insuranceList.length === 0 ? (
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 16 }}>
          No insurance policies available. Please add an insurance policy.
        </Text>
      ) : (
        <FlatList
          data={insuranceList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                padding: 15,
                borderRadius: 8,
                backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
                borderColor: "#859F3D",
                borderWidth: 1,
              }}
            >
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Provider: {item.provider}
              </Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Policy Name: {item.policyName}
              </Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Coverage Type: {item.coverageType}
              </Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Premium: {item.premium} annually
              </Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Interest Rate: {item.interestRate}
              </Text>
              <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
                Potential Benefits: {item.potentialBenefits}
              </Text>

              {/* Buttons for insurance */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    elevation: 2,
                    flex: 1,
                    marginRight: 10,
                  }}
                  onPress={() => handleUpdate(item)}
                >
                  <Icon name="edit" size={20} color="#333" />
                  <Text style={{ color: 'white', marginLeft: 5 }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'red',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
                elevation: 2,
                flex: 1,
                color: 'red'
              }}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Icon name="delete" size={20} color="#333" />
              <Text style={{ color: 'white', marginLeft: 5 }}>Delete</Text>
            </TouchableOpacity>
            <ReusableModal
        visible={isModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        title="Confirm Delete"
        message="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={async () => {
          await handleDelete(item._id);  // Handle the deletion
          setDeleteModalVisible(false);  // Close the modal after successful deletion
        }}
        confirmText="Delete"
        cancelText="Cancel"
        
      />
              </View>
            </View>
          )}
        />
      )}

{/* Investment Section */}
{investmentList.length === 0 ? (
  <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 16, marginTop: 20 }}>
    No investments available. Please add an investment.
  </Text>
) : (
  <FlatList
    data={investmentList}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View
        style={{
          marginVertical: 10,
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
          borderColor: "#859F3D",
          borderWidth: 1,
        }}
      >
        {/* Investment Amount */}
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Investment Amount: {item.investmentAmount}
        </Text>

        {/* Interest Rate */}
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Interest Rate: {item.interestRate}%
        </Text>

        {/* Duration (Years) */}
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          Duration: {item.duration} Years
        </Text>

        {/* Buttons for investment */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              elevation: 2,
              flex: 1,
              marginRight: 10,
            }}
            onPress={() => handleUpdateInvestment(item)} // Call the update function for investment
          >
            <Icon name="edit" size={20} color="#333" />
            <Text style={{ color: 'white', marginLeft: 5 }}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: 'red',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 40,
              elevation: 2,
              flex: 1,
            }}
            onPress={() => setDeleteModalVisible(true)}
          >
            <Icon name="delete" size={20} color="#333" />
            <Text style={{ color: 'white', marginLeft: 5 }}>Delete</Text>
          </TouchableOpacity>
        </View>

        <ReusableModal
          visible={isModalVisible}
          onClose={() => setDeleteModalVisible(false)}
          title="Confirm Delete"
          message="Are you sure you want to delete this item? This action cannot be undone."
          onConfirm={async () => {
            await handleDeleteInvestment(item._id); // Handle the deletion
            setDeleteModalVisible(false); // Close the modal after successful deletion
          }}
          confirmText="Delete"
          cancelText="Cancel"
        />
      </View>
    )}
  />
)}

    </View>



      {/* Modal for updating insurance details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={modalContainerStyle}>
          <View style={[InsuranceStyle.modalView, modalBackground]}>
            <Text style={[InsuranceStyle.modalTitle, { color: textColor }]}>Update Insurance Details</Text>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Insurance Company:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={[InsuranceStyle.picker, 
                  {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
                  color: theme === 'dark' ? '#fff' : '#000' 
                }]}
              >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Policy Name:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5, // Or set it to your desired value
                padding: 10,
                marginBottom: 20,
                borderColor: '#000',
              }}             
               value={policyName}
              onChangeText={setPolicyName}
            />
<Text style={[InsuranceStyle.label, { color: textColor }]}>Coverage Type:</Text>
<View style={InsuranceStyle.pickerContainer}>
  <Picker
    selectedValue={coverageType}  // Check if this is bound to state correctly
    onValueChange={setCoverageType} // Directly set the state
    style={[InsuranceStyle.picker, 
      {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
      color: theme === 'dark' ? '#fff' : '#000' 
      }]} 
      >
    <Picker.Item label="Life Insurance" value="Life Insurance" />
    <Picker.Item label="Health Insurance" value="Health Insurance" />
    <Picker.Item label="Car Insurance" value="Car Insurance" />
  </Picker>
</View>


            <Text style={[InsuranceStyle.label, { color: textColor }]}>Premium Amount:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor : border,
                borderRadius: 2

              }}              keyboardType="numeric"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
            />
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Interest Rate:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor : border,
                borderRadius: 2

              }}              keyboardType="numeric"
              value={interestRate}
              onChangeText={setInterestRate}
            />
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Potential Benefits:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor : border,
                borderRadius: 2

              }}              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <View style={InsuranceStyle.buttonContainer}>
              <TouchableOpacity style={[InsuranceStyle.button, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]} onPress={handleSave}>
                <Text style={InsuranceStyle.buttonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[InsuranceStyle.button, {backgroundColor: theme === 'dark' ? 'red' : 'red'}]} onPress={handleCancel}>
                <Text style={InsuranceStyle.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for adding new insurance */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={handleCancel}
      >
        <View style={modalContainerStyle}>
          <View style={[InsuranceStyle.modalView, modalBackground]}>
            <Text style={[InsuranceStyle.modalTitle, { color: textColor }]}>Add Insurance Policy</Text>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Insurance Company:</Text>
            <View style={InsuranceStyle.pickerContainer}>
              <Picker
                selectedValue={companyName}
                onValueChange={(itemValue) => setCompanyName(itemValue)}
                style={[InsuranceStyle.picker, 
                  {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
                  color: theme === 'dark' ? '#fff' : '#000' 
                  }]}               >
                <Picker.Item label="Company 1" value="company1" />
                <Picker.Item label="Company 2" value="company2" />
                <Picker.Item label="Company 3" value="company3" />
              </Picker>
            </View>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Policy Name:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor: '#859F3D',
                borderWidth: 1,
                borderRadius: 2

              }}
              value={policyName}
              onChangeText={setPolicyName}
            />
<Text style={[InsuranceStyle.label, { color: textColor }]}>Coverage Type:</Text>
<View style={InsuranceStyle.pickerContainer}>
  <Picker
    selectedValue={coverageType}  // Check if this is bound to state correctly
    onValueChange={setCoverageType} // Directly set the state
    style={[InsuranceStyle.picker, 
      {backgroundColor: theme === 'dark' ? '#333' : '#FFF',
      color: theme === 'dark' ? '#fff' : '#000' 
      }]}   >
    <Picker.Item label="Life Insurance" value="Life Insurance" />
    <Picker.Item label="Health Insurance" value="Health Insurance" />
    <Picker.Item label="Car Insurance" value="Car Insurance" />
  </Picker>
</View>

            <Text style={[InsuranceStyle.label, { color: textColor }]}>Premium Amount:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor: '#859F3D',
                borderWidth: 1,
                borderRadius: 2

              }}
              keyboardType="numeric"
              value={premiumAmount}
              onChangeText={setPremiumAmount}
            />
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Interest Rate:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor: '#859F3D',
                borderWidth: 1,
                borderRadius: 2

              }}
              keyboardType="numeric"
              value={interestRate}
              onChangeText={setInterestRate}
            />
            <Text style={[InsuranceStyle.label, { color: textColor }]}>Potential Benefits:</Text>
            <TextInput
              style={{
                backgroundColor: inputBackground,
                color: textColor,
                borderRadius: 5,
                padding: 10,
                marginBottom: 20,
                borderColor: '#859F3D',
                borderWidth: 1,
                borderRadius: 2

              }}
              value={potentialBenefits}
              onChangeText={setPotentialBenefits}
            />

            <View style={InsuranceStyle.buttonContainer}>
            <TouchableOpacity style={[InsuranceStyle.button, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]} onPress={handleAddSave}>
                <Text style={InsuranceStyle.buttonText}>Add Insurance </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[InsuranceStyle.button, {backgroundColor: theme === 'dark' ? 'red' : 'red'}]} onPress={handleCancel}>
                <Text style={InsuranceStyle.buttonText}>Cancel</Text>              
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal transparent={true} visible={isUpdateModalVisible} animationType="slide">
  <View style={styles.modalBackground}>
    <View style={styles.modalView}>
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 20 }}>
        Edit Investment Details
      </Text>

      {/* Investment Amount */}
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Investment Amount:</Text>
      <TextInput
  style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
  value={selectedInvestment?.investmentAmount || ''}
  onChangeText={(text) => setSelectedInvestment((prev) => ({ ...prev, investmentAmount: text }))}
  keyboardType="numeric"
/>

<TextInput
  style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
  value={selectedInvestment?.interestRate || ''}
  onChangeText={(text) => {
    // Ensure the input is numeric and does not exceed 100
    const numericValue = Math.min(100, Math.max(0, parseFloat(text) || 0)); 
    setSelectedInvestment((prev) => ({
      ...prev,
      interestRate: numericValue.toString(), // Convert to string for TextInput
    }));
  }}
  keyboardType="numeric"
  maxLength={5}  // Optional: Limit length if needed
/>
      {/* Duration (Years) */}
      <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Duration (Years)</Text>
      <Picker
        selectedValue={selectedInvestment?.duration || '1'}  // Pre-fill with selectedInvestment duration or default to '1'
        onValueChange={(value) =>
          setSelectedInvestment((prev) => ({ ...prev, duration: value }))
        }
        style={{
          inputAndroid: {
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#555' : '#ccc',
            marginVertical: 5,
          },
          inputIOS: {
            backgroundColor: theme === 'dark' ? '#333' : '#fff',
            color: theme === 'dark' ? '#fff' : '#000',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: theme === 'dark' ? '#555' : '#ccc',
            marginVertical: 5,
          },
        }}
      >
        <Picker.Item label="1 Year" value="1" />
        <Picker.Item label="3 Years" value="3" />
        <Picker.Item label="5 Years" value="5" />
        <Picker.Item label="10 Years" value="10" />
      </Picker>

      {/* Margin Between Picker and Buttons */}
      <View style={{ height: 20 }} />

      {/* Centered Save and Close Buttons with a gap */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
        {/* Save Button */}
        <TouchableOpacity
  style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', width: '48%' }]}
  onPress={() => handleSaveInvestment(selectedInvestment)}  // Pass selectedInvestment to handleSaveInvestment
>
  <Text style={{ textAlign: 'center', color: '#fff' }}>
    Save
  </Text>
</TouchableOpacity>


        {/* Small gap between buttons */}
        <View style={{ width: 10 }} />

        {/* Close Button */}
        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: 'red', width: '48%' }]}
          onPress={() => setIsUpdateModalVisible(false)}  // Close the modal
        >
          <Text style={{ textAlign: 'center', color: '#fff' }}>
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>







    </View>
  );
};

export default InsuranceScreen;
