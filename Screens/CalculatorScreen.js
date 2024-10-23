import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import styles from '../Styles/styles'; // Adjust the import according to your file structure
import { LineChart } from 'react-native-chart-kit';

const CalculatorScreen = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
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
    setDuration('');
    setPredictedValues([]);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Investment Calculator</Text>
      
      <Text style={styles.label}>Enter Investment Amount</Text>
      <TextInput
        style={styles.input}
        value={investmentAmount}
        onChangeText={setInvestmentAmount}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Enter Interest Rate (%)</Text>
      <TextInput
        style={styles.input}
        value={interestRate}
        onChangeText={setInterestRate}
        keyboardType="numeric"
      />
      
      <Text style={styles.label}>Enter Duration (Years)</Text>
      <TextInput
        style={styles.input}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.modalButton} onPress={calculateInvestment}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Investment Predictions</Text>
            <ScrollView>
              {predictedValues.map((value, index) => (
                <Text key={index}>
                  Predicted value after {index + 1} year: {value}
                </Text>
              ))}
            </ScrollView>
            <LineChart
              data={{
                labels: Array.from({ length: predictedValues.length }, (_, i) => (i + 1).toString()),
                datasets: [
                  {
                    data: predictedValues.map(val => parseFloat(val))
                  }
                ]
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
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
            <TouchableOpacity style={styles.modalButton} onPress={resetInputs}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalculatorScreen;
