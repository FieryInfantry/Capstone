import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import axios from 'axios'; // Import Axios for API calls
import { useUser } from '../Context/UserContext'; // Import UserContext
import styles from '../Styles/styles'; // Adjust the import according to your file structure
import { LineChart } from 'react-native-chart-kit';
import Picker from 'react-native-picker-select'; // Import the Picker component

const CalculatorScreen = () => {
  const { theme } = useUser(); // Access theme from context

  const [investmentAmount, setInvestmentAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('1'); // Default duration as string
  const [modalVisible, setModalVisible] = useState(false);
  const [predictedValues, setPredictedValues] = useState([]);

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
    
    <View style={containerStyle}>
      <Text style={textColor}>Enter Investment Amount</Text>
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={investmentAmount}
        onChangeText={setInvestmentAmount}
        keyboardType="numeric"
      />

      <Text style={textColor }>Enter Interest Rate (%)</Text>
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={interestRate}
        onChangeText={(text) => {
          // Allow clearing the input if text is empty
          if (text === '') {
            setInterestRate(''); // Clear the input
            return;
          }

          // Remove any non-numeric characters
          const numericValue = text.replace(/[^0-9]/g, '');

          // Check if the numeric value is less than or equal to 100 and has 3 digits or less
          if (parseInt(numericValue) <= 100) {
            setInterestRate(numericValue); // Update the state only if valid
          }
        }}
        keyboardType="numeric"
        maxLength={3} // Ensures only 3 digits can be entered
      />

      <Text style={textColor}>Enter Duration (Years)</Text>
      <Picker
        onValueChange={(value) => setDuration(value)}
        items={[
          { label: '1 Year', value: '1' },
          { label: '3 Years', value: '3' },
          { label: '5 Years', value: '5' },
          { label: '10 Years', value: '10' },
        ]}
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
          iconContainer: {
            top: 15,
            right: 10,
          },
        }}
        placeholder={{ label: 'Select Duration', value: null }}
      />
<br></br><br></br>
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
        onPress={calculateInvestment}
      >
        
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
     
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={[modalBackground]}>
          <View style={styles.modalView}>
            <Text style={{ color: textColor, fontSize: 20, fontWeight: 'bold' }}>Investment Predictions</Text>
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
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} onPress={resetInputs}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: theme === 'dark' ? 'red' : 'red' }]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    
  );
};

export default CalculatorScreen;