import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useUser } from '../Context/UserContext'; // Import the UserContext for theme
import GovernmentStyles from '../Styles/GovernmentStyles'; // Importing GovernmentStyles

const GovernmentScreen = () => {
  const { theme } = useUser(); // Access theme from context

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }}
      contentContainerStyle={{ alignItems: 'center', paddingVertical: 20 }} // Center cards
    >
      <View style={[GovernmentStyles.schemeContainer, { backgroundColor: theme === 'dark' ? '#2A2A2A' : '#fff', width: '90%', maxWidth: 400 }]}>
        <Text style={[GovernmentStyles.schemeTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Scheme Name: PhilHealth Insurance</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Description:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>PhilHealth provides health insurance coverage for medical expenses.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Eligibility Criteria:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Available to all registered members and their dependents.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Benefits:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Coverage includes hospitalization, outpatient care, and other medical services.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Application Process:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Register online or visit the nearest PhilHealth office.</Text>
      </View>

      <View style={[GovernmentStyles.schemeContainer, { backgroundColor: theme === 'dark' ? '#2A2A2A' : '#fff', width: '90%', maxWidth: 400 }]}>
        <Text style={[GovernmentStyles.schemeTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Policy Name: SSS Retirement Benefit</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Description:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Provides monthly pension for retired SSS members.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Coverage Details:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Includes pension amount based on contributions and years of service.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Premium Rates:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Contributions vary based on salary and employment status.</Text>
        <Text style={[GovernmentStyles.label, { color: theme === 'dark' ? '#fff' : '#000' }]}>Contact Information:</Text>
        <Text style={[GovernmentStyles.value, { color: theme === 'dark' ? '#fff' : '#000' }]}>Visit the nearest SSS office or call the SSS hotline for assistance.</Text>
      </View>
    </ScrollView>
  );
};

export default GovernmentScreen;
