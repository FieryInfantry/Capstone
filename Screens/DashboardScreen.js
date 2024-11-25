// DashboardScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image,Modal,TextInput,Alert, FlatList } from 'react-native';
import DashboardStyles from '../Styles/DashboardStyles';
import { useUser } from '../Context/UserContext'; // Import the UserContext
import AddUpdateBank from './AddUpdateBank';
import styles from '../Styles/styles';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';


const DashboardScreen = ({ navigation }) => {
  const [banks, setBanks] = useState([]);
  const [insuranceList, setInsuranceList] = useState([]);
  const [investmentList, setInvestmentList] = useState([]);
  const [currentSavings, setCurrentSavings] = useState(0);
  const [currentInvestments, setCurrentInvestments] = useState(0);
  const [futurePredictions, setFuturePredictions] = useState(0)
  const { userData, theme } = useUser();  // Access user data and theme from context
  const [isBankModalVisible, setBankModalVisible] = useState(false);
  const [isCalculatorModalVisible, setCalculatorModalVisible] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('1'); // Default duration as string
  const [predictedValues, setPredictedValues] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleSaveBank = (bankDetails) => {
    // Logic to save the bank details (optional: send to API or update context)
    console.log('Saved Bank Details:', bankDetails);
    setBankModalVisible(false);
  };

  useEffect(() => {
    // Calculate the total balance from all banks
    const totalBalance = banks.reduce((acc, curr) => acc + (Number(curr.balance) || 0), 0); 
    setCurrentSavings(totalBalance); // Set total balance as savings
    
    // Calculate only investments
    const investments = banks
      .filter((bank) => bank.type === 'investment')
      .reduce((acc, curr) => acc + (Number(curr.balance) || 0), 0); 
    setCurrentInvestments(investments);
  
    // Calculate future predictions (e.g., compound interest)
    const rate = 0.05; // Example interest rate
    const years = 5; // Example years
    const predictions = investments * Math.pow(1 + rate, years);
    setFuturePredictions(predictions.toFixed(2));
  }, [banks]); // Recalculate when the banks data changes
  

  const openBankModal = () => {
    setCalculatorModalVisible(false);  // Close the calculator modal
    setBankModalVisible(true);         // Open the bank modal
  };

  const openCalculatorModal = () => {
    setBankModalVisible(false);       // Close the bank modal
    setCalculatorModalVisible(true);  // Open the calculator modal
  };

  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:3000/banks', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBanks(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching banks:', error);
      Alert.alert('Error', 'Failed to fetch banks. Please try again later.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchBanks(); // Refresh bank list when screen gains focus
    }, [])
  );

  const fetchInsurances = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://localhost:3000/insurances', {
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
  
      const response = await axios.get('http://localhost:3000/investments', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setInvestmentList(response.data); // Assuming you have a state for storing investments
    } catch (error) {
      console.error('Error fetching investments:', error);
      Alert.alert('Error', 'Failed to fetch investment data. Please try again later.');
    }
  };
  useEffect(() => {
    fetchInsurances();
    fetchInvestments(); // Fetch insurance data when the component mounts
  }, []);

  const calculateInvestment = () => {
    const principal = parseFloat(investmentAmount);
    const rate = parseFloat(interestRate) / 100;
    const years = parseInt(duration);

    const values = [];
    for (let i = 1; i <= years; i++) {
      const amount = principal * Math.pow(1 + rate, i);
      values.push(amount.toFixed(2));
    }

    setPredictedValues(values);
    setModalVisible(true);
  };

  const resetInputs = () => {
    setInvestmentAmount('');
    setInterestRate('');
    setDuration('1'); // Reset to default duration
    setPredictedValues([]);
    setModalVisible(false);
  };



  const handleSaveInvestment = async () => {
    try {
      // Prepare the investment data
      const investmentData = {
        investmentAmount: parseFloat(investmentAmount),
        interestRate: parseFloat(interestRate),
        duration: duration,
      };
  
      // Get the authentication token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated.');
        return;
      }
  
      // Make the POST request to save the investment
      const response = await axios.post('http://192.168.1.108:3000/investments', investmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      // Check the response
      if (response.status === 201) {
        Alert.alert('Success', 'Investment saved successfully');
        // Optionally reset the form or close the modal after successful save
        resetInputs();
        setModalVisible(false);
      } else {
        Alert.alert('Error', 'Failed to save investment');
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      Alert.alert('Error', error.response?.data?.message || 'Server Error');
    }
  };
  

  const containerStyle = {
    flex: 1,
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF',
    padding: 20,
  };

  const textColor = { 
    color: theme === 'dark' ? '#FFF' : '#000',
    fontSize: 15,
    fontWeight: 'bold',
  };
  const modalBackground = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[DashboardStyles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
        <View style={DashboardStyles.header}>
          <Image source={require('../assets/logo.png')} style={DashboardStyles.logo} />
          <Text style={[DashboardStyles.welcome, { color: theme === 'dark' ? '#fff' : '#000', paddingTop: 50}]}>
  Welcome, 
  <Text style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000'}}>
    {userData?.fullName || '[User Name]'}
  </Text>
  !
</Text>


        </View>

        <View style={DashboardStyles.summaryContainer}>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#000' : '#000' }}>Current Savings ${currentSavings}</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#000' : '#000' }}>Current Investments ${currentInvestments}</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#000' : '#000' }}>Future Value Predictions ${futurePredictions}</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Savings Accounts</Text>
            <TouchableOpacity
  onPress={() => navigation.navigate('BankList')}
>
  <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>
    See all
  </Text>
</TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
  <FlatList
    data={banks.slice(0, 2)}
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View
        style={{
          marginVertical: 10,
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
        }}
      >
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Name: {item.name}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Type: {item.type}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Balance: {item.balance}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Interest Rate: {item.interestRate}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Rewards: {item.rewards}</Text>
      </View>
    )}
  />
</View>
</View>


        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Investment Accounts</Text>
            <TouchableOpacity onPress={() => navigation.navigate('InsuranceScreen')}            >
              <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
          <FlatList
          data={insuranceList.slice(0, 2)}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View
              style={{
                marginVertical: 10,
                padding: 15,
                borderRadius: 8,
                backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
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
              
          </View>)}/>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text style={{ color: theme === 'dark' ? '#000' : '#000' }}>Details like date, amount, and description.</Text>
          </View>
        </View>

        <View style={DashboardStyles.actionButtonsContainer}>
      <TouchableOpacity
        style={[DashboardStyles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={openBankModal} // Open the bank modal
      >
        <Text style={{ color: 'white' }}>Add new savings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[DashboardStyles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={openCalculatorModal} // Open the calculator modal
      >
        <Text style={{ color: 'white' }}>Add new investment</Text>
      </TouchableOpacity>
    </View>

        <TouchableOpacity 
          style={[DashboardStyles.settingsButton, { backgroundColor: theme === 'dark' ? '#2F3B2D' : '#fff' }]} 
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Text style={[DashboardStyles.settingsButtonText, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={[DashboardStyles.navigation, { backgroundColor: theme === 'dark' ? '#2F3B2D' : '#fff' }]}>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('BankList')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/bank.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Bank</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('InsuranceScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/life-insurance.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Insurance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('GovernmentScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/government.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Government</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('CalculatorScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/calculator.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Calculator</Text>
          </View>
        </TouchableOpacity>        
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('BudgetScreen')}>
          <View style={DashboardStyles.navItem}>
          <Image source={require('../assets/budget.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Budget</Text>
          </View>
        </TouchableOpacity>
      </View>
      <AddUpdateBank
        visible={isBankModalVisible}
        onClose={() => setBankModalVisible(false)}
        onSave={handleSaveBank} // Save the bank details
        bank={null} // Pass null for adding a new bank
      />
<Modal
        transparent={true}
        visible={isCalculatorModalVisible}
        animationType="slide"
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>
              Enter Investment Details
            </Text>

            <Text style={textColor}>Enter Investment Amount</Text>
            <TextInput
              style={[styles.input, { color: textColor }]}
              value={investmentAmount}
              onChangeText={setInvestmentAmount}
              keyboardType="numeric"
            />

            <Text style={textColor}>Enter Interest Rate (%)</Text>
            <TextInput
  style={[styles.input, { color: textColor }]}
  value={interestRate}
  onChangeText={(text) => {
    if (text === '') {
      setInterestRate('');
      return;
    }

    // Remove any non-numeric characters
    const numericValue = text.replace(/[^0-9]/g, '');

    // Ensure the value doesn't exceed 100
    if (parseInt(numericValue) > 100) {
      setInterestRate('100');
    } else {
      setInterestRate(numericValue);
    }
  }}
  keyboardType="numeric"
  maxLength={3}
/>

            <Text style={textColor}>Enter Duration (Years)</Text>
            <Picker
              selectedValue={duration}
              onValueChange={(value) => setDuration(value)}
              style={{
                inputAndroid: {
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: theme === 'dark' ? '#555' : '#ccc',
                  marginVertical: 5,
                },
                inputIOS: {
                  backgroundColor: theme === 'dark' ? '#333' : '#fff',
                  color: textColor,
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

            <View style={{ height: 20 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
  {/* Calculate Button */}
  <TouchableOpacity
    style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', width: '48%' }]}
    onPress={calculateInvestment}
  >
    <Text style={styles.buttonText}>Calculate</Text>
  </TouchableOpacity>

  {/* Save Button */}
  <TouchableOpacity
    style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', width: '48%' }]}
    onPress={() => handleSaveInvestment()}
  >
    <Text style={styles.buttonText}>Save</Text>
  </TouchableOpacity>
</View>

{/* Close Button */}
<View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
  <TouchableOpacity
    style={[styles.modalButton, { backgroundColor: 'red', width: '48%' }]}
    onPress={() => setCalculatorModalVisible(false)}
  >
    <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>
</View>

            {/* Investment Predictions Modal */}
            <Modal
  transparent={true}
  visible={modalVisible}
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalBackground}>
    <View style={styles.modalView}>
      <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>
        Investment Predictions
      </Text>
      <ScrollView>
        {predictedValues.map((value, index) => (
          <Text key={index} style={{ color: textColor }}>
            Predicted value after {index + 1} year: {value}
          </Text>
        ))}
      </ScrollView>
      <LineChart
        data={{
          labels: Array.from({ length: predictedValues.length }, (_, i) => (i + 1).toString()),
          datasets: [
            {
              data: predictedValues.map(val => parseFloat(val)),
            },
          ],
        }}
        width={300} // Adjust width as needed
        height={220}
        yAxisLabel="$"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 2, // optional, defaults to 2
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>


        <TouchableOpacity
          style={[styles.modalButton, { backgroundColor: 'red', width: '48%' }]} // Close button style
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={resetInputs}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


          </View>
        </View>
      </Modal>

    </View>
  );
};

export default DashboardScreen;
