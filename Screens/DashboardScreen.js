// DashboardScreen.js
import React, { useState, useEffect } from 'react';
import {SafeAreaView , View, Text, ScrollView, TouchableOpacity, Image,Modal,TextInput,Alert, FlatList, Dimensions} from 'react-native';
import DashboardStyles from '../Styles/DashboardStyles';
import { useUser } from '../Context/UserContext'; // Import the UserContext
import AddUpdateBank from './AddUpdateBank';
import SideNavModal from './SideNavModal';
import styles from '../Styles/styles';
import { LineChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCallback } from 'react';

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
  const [sideModalVisible, setSideModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('currentSavings');
  const [containerColor, setContainerColor] = useState('#729762'); // Default color for Current Savings
  const [isVisible, setIsVisible] = useState(true); // Control value visibility
  const screenWidth = Dimensions.get('window').width;
  const [selectedBank, setSelectedBank] = useState(null);
  const [currentSavingsVisible, setCurrentSavingsVisible] = React.useState(false);
  const [currentInvestmentsVisible, setCurrentInvestmentsVisible] = React.useState(false);
  const [futurePredictionsVisible, setFuturePredictionsVisible] = React.useState(false);
  // Handle button press
  const handlePress = (section, color) => {
    setActiveSection(section);
    setContainerColor(color); // Change container background color
  };

  // Toggle visibility
  const toggleVisibility = (section) => {
    if (section === 'currentSavings') {
      setCurrentSavingsVisible((prev) => !prev);
    } else if (section === 'currentInvestments') {
      setCurrentInvestmentsVisible((prev) => !prev);
    } else if (section === 'futurePredictions') {
      setFuturePredictionsVisible((prev) => !prev);
    }
  };

  // Masked value for hidden state
  const maskedValue = '*******';

  // Determine the current value based on the active section
  const getCurrentValue = () => {
    if (activeSection === 'currentSavings') return currentSavings.toLocaleString();
    if (activeSection === 'currentInvestments') return currentInvestments.toLocaleString();
    if (activeSection === 'futurePredictions') return futurePredictions.toLocaleString();
    return '';
  };
  const handleSaveBank = async (bankDetails) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      if (selectedBank) {
        // Update bank
        await axios.put(`http://192.168.0.115:3000/banks/${selectedBank._id}`, bankDetails, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBanks((prevBanks) =>
          prevBanks.map((bank) => (bank._id === selectedBank._id ? { ...bank, ...bankDetails } : bank))
        );
      } else {
        // Add new bank
        const response = await axios.post('http://192.168.0.115:3000/banks', bankDetails, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBanks((prevBanks) => [...prevBanks, response.data]);
      }

      setBankModalVisible(false);
    } catch (error) {
      console.error('Error saving bank:', error);
      Alert.alert('Error', 'Failed to save bank. Please try again later.');
    }
  };

  useEffect(() => {
    // Calculate the total balance from all banks (for current savings)
    const totalBalance = banks.reduce((acc, curr) => acc + (Number(curr.balance) || 0), 0); 
    setCurrentSavings(totalBalance); // Set total balance as savings
    
    // Calculate only investments based on `investmentAmount` from each item
    const investments = investmentList.reduce((acc, curr) => acc + (Number(curr.investmentAmount) || 0), 0); 
    setCurrentInvestments(investments);
    
    // Combine current savings and investments for future predictions (e.g., compound interest)
    const rate = 0.05; // Example interest rate
    const years = 5; // Example years
    const totalAmount = totalBalance + investments; // Add savings and investments together
    const predictions = totalAmount * Math.pow(1 + rate, years); // Calculate future value with compound interest
    
    setFuturePredictions(predictions.toFixed(2)); // Set future value predictions
  }, [banks, investmentList]); // Recalculate when the banks or investmentList data changes
  

  const openBankModal = () => {
    setCalculatorModalVisible(false);  // Close the calculator modal
    setBankModalVisible(true);         // Open the bank modal
  };

  const openCalculatorModal = () => {
    setBankModalVisible(false);       // Close the bank modal
    setCalculatorModalVisible(true);  // Open the calculator modal
  };
  const handleCloseModal = () => {
    setSideModalVisible(false);
  };

  const fetchBanks = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.get('http://192.168.0.115:3000/banks', {
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

      const response = await axios.get('http://192.168.0.115:3000/insurances', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setInsuranceList(response.data);
    } catch (error) {
      console.error('Error fetching insurances:', error);
      Alert.alert('Error', 'Failed to fetch insurance data. Please try again later.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchInvestments(); 
    }, [])
  );


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
  
      // Sort investments by the 'createdAt' field in descending order (latest first)
      const sortedInvestments = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  
      setInvestmentList(sortedInvestments); // Store the sorted investment data in state
    } catch (error) {
      console.error('Error fetching investments:', error);
      Alert.alert('Error', 'Failed to fetch investment data. Please try again later.');
    }
  };
  
  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/logout', {
        method: 'POST',
      });

      if (response.ok) {
        navigation.navigate('Login');
      } else {
        Alert.alert('Logout Failed', 'Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      Alert.alert('Error', 'An error occurred during logout.');
    }
  };
  
  useEffect(() => {
    fetchInsurances(); // Fetch insurance data when the component mounts
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
      const response = await axios.post('http://192.168.0.115:3000/investments', investmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      fetchInvestments();
      // Check the response
      setCalculatorModalVisible(false);
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
    <View style={DashboardStyles.maninContainer}>
      <View style={DashboardStyles.innerContainer}>
      <ScrollView style={[DashboardStyles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
        <View style={DashboardStyles.header}>
          <Image source={require('../assets/logo.png')} style={DashboardStyles.logo} />
          <TouchableOpacity onPress={() => setSideModalVisible(true)} style={{paddingRight :10, height: 35, paddingTop: 3}}>
        <Icon
          name="menu"
          size={30}
          style={{ color: theme === 'dark' ? '#fff' : '#000' }}
        />
      </TouchableOpacity>

      <SideNavModal
        userData={userData}
        navigation={navigation}
        handleLogout={handleLogout}
        modalVisible={sideModalVisible}
        onClose={handleCloseModal} // Pass the function to close the modal
      />

        </View>

        

        <View style={DashboardStyles.summaryContainer}>


<View style={DashboardStyles.buttonsRow}>
  <TouchableOpacity 
    style={[DashboardStyles.button1, { backgroundColor: '#729762' }]} 
    onPress={() => handlePress('currentSavings', '#729762')}

  >
    <Text style={[DashboardStyles.summaryLabel, { color: '#fff' }]}>
      Current Savings
    </Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={[DashboardStyles.button2, { backgroundColor: '#658147' }]} 
    onPress={() => handlePress('currentInvestments', '#658147')}
  >
    <Text style={[DashboardStyles.summaryLabel, { color: '#fff' }]}>
      Current Investments
    </Text>
  </TouchableOpacity>

  <TouchableOpacity 
    style={[DashboardStyles.button3, { backgroundColor: '#597445' }]} 
    onPress={() => handlePress('futurePredictions', '#597445')}
  >
    <Text style={[DashboardStyles.summaryLabel, { color: '#fff' }]}>
      Future Value Predictions
    </Text>
  </TouchableOpacity>
</View>

<View style={[DashboardStyles.valueContainer, { backgroundColor: containerColor }]}>

<View style={DashboardStyles.innerValueContainer}>
      <View style={DashboardStyles.valueRow}>
        {activeSection === 'currentSavings' && (
          <>
            <Text style={[DashboardStyles.summaryValue, { color: '#000' }]}>
              {currentSavingsVisible ? `₱${currentSavings.toLocaleString()}` : maskedValue}
            </Text>
            <TouchableOpacity onPress={() => toggleVisibility('currentSavings')}>
              <Icon
                name={currentSavingsVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#000"
                style={DashboardStyles.eyeIcon}
              />
            </TouchableOpacity>
          </>
        )}

        {activeSection === 'currentInvestments' && (
          <>
            <Text style={[DashboardStyles.summaryValue, { color: '#000' }]}>
              {currentInvestmentsVisible ? `₱${currentInvestments.toLocaleString()}` : maskedValue}
            </Text>
            <TouchableOpacity onPress={() => toggleVisibility('currentInvestments')}>
              <Icon
                name={currentInvestmentsVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#000"
                style={DashboardStyles.eyeIcon}
              />
            </TouchableOpacity>
          </>
        )}

        {activeSection === 'futurePredictions' && (
          <>
            <Text style={[DashboardStyles.summaryValue, { color: '#000' }]}>
              {futurePredictionsVisible ? `₱${futurePredictions.toLocaleString()}` : maskedValue}
            </Text>
            <TouchableOpacity onPress={() => toggleVisibility('futurePredictions')}>
              <Icon
                name={futurePredictionsVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#000"
                style={DashboardStyles.eyeIcon}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
</View>
</View>
<View style={DashboardStyles.section1}>

  <View style={DashboardStyles.sectionHeader}>
    <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
      Savings Accounts
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('BankList')}>
      <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>
        See all
      </Text>
    </TouchableOpacity>
  </View>

  <View style={[DashboardStyles.accountBox, {backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF',height: 50 }]}>
  <FlatList
    data={banks} // Use the full array of banks
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View
        style={{
          marginHorizontal: 10, // Add horizontal spacing between cards
          padding: 15,
          borderRadius: 8,
          backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
          width: 300, // Set a fixed width for each card
          borderColor : "#859F3D",
          borderWidth: 2,
          height: 140
        }}
      >
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000' , paddingBottom: 3}}>Name: {item.name}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', paddingBottom: 3 }}>Type: {item.type}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', paddingBottom: 3 }}>Balance: {item.balance}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', paddingBottom: 3 }}>Interest Rate: {item.interestRate}</Text>
        <Text style={{ color: theme === 'dark' ? '#fff' : '#000', paddingBottom: 3 }}>Rewards: {item.rewards}</Text>
      </View>
    )}
    horizontal // Enable horizontal scrolling
    showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
    contentContainerStyle={{ paddingHorizontal: 10 }} // Add padding to the start and end
    snapToInterval={320} // Adjust for card width + margin
    decelerationRate="fast" // Smooth snap effect
    snapToAlignment="center" // Align snapped card in the center
  />
</View>
</View>



<View style={DashboardStyles.section2}>
  <View style={DashboardStyles.sectionHeader}>
    <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>
      Investment Accounts
    </Text>
    <TouchableOpacity onPress={() => navigation.navigate('InsuranceScreen')}>
      <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>See all</Text>
    </TouchableOpacity>
  </View>

  <View
    style={[
      DashboardStyles.accountBox,
      {
        backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF',
        height: 200,  // Adjusted for proper height
        flexDirection: 'row',  // Make sure items are laid out horizontally
        overflow: 'hidden',  // Avoid any overflow
      },
    ]}
  >
    <FlatList
      data={investmentList} // Display all items in investmentList
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View
          style={{
            marginHorizontal: 10, // Add horizontal spacing between cards
            padding: 15,
            borderRadius: 8,
            backgroundColor: theme === 'dark' ? '#2A2A2A' : '#FFF',
            width: 300, // Set a fixed width for each card
            borderColor : "#859F3D",
            borderWidth: 2,
            height: 100
          }}
        >
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000',paddingBottom: 3 }}>
            Investment Amount: {item.investmentAmount}
          </Text>
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000',paddingBottom: 3 }}>
            Interest Rate: {item.interestRate}%
          </Text>
          <Text style={{ color: theme === 'dark' ? '#fff' : '#000',paddingBottom: 3 }}>
            Duration: {item.duration} Years
          </Text>
        </View>
      )}
      horizontal // Enable horizontal scrolling
    showsHorizontalScrollIndicator={false} // Hide the horizontal scrollbar
    contentContainerStyle={{ paddingHorizontal: 10 }} // Add padding to the start and end
    snapToInterval={320} // Adjust for card width + margin
    decelerationRate="fast" // Smooth snap effect
    snapToAlignment="center" // Align snapped card in the center
    />
  </View>
</View>

        <View style={DashboardStyles.section3}>
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
        <Text style={styles.buttonText}>Add new savings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[DashboardStyles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={openCalculatorModal} // Open the calculator modal
      >
        <Text style={styles.buttonText}>Add new investment</Text>
      </TouchableOpacity>
    </View>

      
      </ScrollView>
      </View>


      <View style={[DashboardStyles.navigation, { backgroundColor: theme === 'dark' ? '#2F3B2D' : '#fff' }]}>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('BankList')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/bank.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 11 }}>Bank</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('InsuranceScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/life-insurance.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 11 }}>Insurance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('GovernmentScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/government.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 11}}>Government</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('CalculatorScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/calculator.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 11 }}>Calculator</Text>
          </View>
        </TouchableOpacity>        
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('BudgetScreen')}>
          <View style={DashboardStyles.navItem}>
          <Image source={require('../assets/budget.png')} style={DashboardStyles.navIcon} />
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000', fontSize: 11 }}>Budget</Text>
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


  <TouchableOpacity
    style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D', width: '48%' }]}
    onPress={() => handleSaveInvestment()}
  >
    <Text style={styles.buttonText}>Save</Text>
  </TouchableOpacity>
</View>

<View style={{ alignItems: 'center', width: '100%', marginTop: 10 }}>
  <TouchableOpacity
    style={[styles.modalButton, { backgroundColor: 'red', width: '48%' }]}
    onPress={() => setCalculatorModalVisible(false)}
  >
    <Text style={styles.buttonText}>Close</Text>
  </TouchableOpacity>
</View>

        
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
