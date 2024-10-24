import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const GovernmentScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* PhilHealth Insurance Section */}
      <View style={styles.schemeContainer}>
        <Text style={styles.schemeTitle}>Scheme Name: PhilHealth Insurance</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>PhilHealth provides health insurance coverage for medical expenses.</Text>
        <Text style={styles.label}>Eligibility Criteria:</Text>
        <Text style={styles.value}>Available to all registered members and their dependents.</Text>
        <Text style={styles.label}>Benefits:</Text>
        <Text style={styles.value}>Coverage includes hospitalization, outpatient care, and other medical services.</Text>
        <Text style={styles.label}>Application Process:</Text>
        <Text style={styles.value}>Register online or visit the nearest PhilHealth office.</Text>
      </View>

      {/* SSS Retirement Benefit Section */}
      <View style={styles.schemeContainer}>
        <Text style={styles.schemeTitle}>Policy Name: SSS Retirement Benefit</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>Provides monthly pension for retired SSS members.</Text>
        <Text style={styles.label}>Coverage Details:</Text>
        <Text style={styles.value}>Includes pension amount based on contributions and years of service.</Text>
        <Text style={styles.label}>Premium Rates:</Text>
        <Text style={styles.value}>Contributions vary based on salary and employment status.</Text>
        <Text style={styles.label}>Contact Information:</Text>
        <Text style={styles.value}>Visit the nearest SSS office or call the SSS hotline for assistance.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  schemeContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default GovernmentScreen;
