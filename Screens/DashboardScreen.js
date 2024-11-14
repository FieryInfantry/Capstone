// DashboardScreen.js
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import DashboardStyles from '../Styles/DashboardStyles';
import { useUser } from '../Context/UserContext'; // Import the UserContext

const DashboardScreen = ({ navigation }) => {
  const { userData, theme } = useUser();  // Access user data and theme from context

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[DashboardStyles.container, { backgroundColor: theme === 'dark' ? '#1A1A19' : '#F6FCDF' }]}>
        <View style={DashboardStyles.header}>
          <Text style={[DashboardStyles.logo, { color: theme === 'dark' ? '#fff' : '#000' }]}>LOGO</Text>
          <Text style={[DashboardStyles.welcome, { color: theme === 'dark' ? '#fff' : '#000' }]}>
  Welcome, 
  <Text style={{ fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#000' }}>
    {userData?.fullName || '[User Name]'}
  </Text>
  !
</Text>


        </View>

        <View style={DashboardStyles.summaryContainer}>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Current Savings</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Current Investments</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Future Value Predictions</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Savings Accounts</Text>
            <TouchableOpacity>
              <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Connected bank account</Text>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Individual balances</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={[DashboardStyles.sectionTitle, { color: theme === 'dark' ? '#fff' : '#000' }]}>Investment Accounts</Text>
            <TouchableOpacity>
              <Text style={[DashboardStyles.seeAll, { color: theme === 'dark' ? '#fff' : '#007bff' }]}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Details such as interest rates, dividends, etc.</Text>
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
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Details like date, amount, and description.</Text>
          </View>
        </View>

        <View style={DashboardStyles.actionButtonsContainer}>
          <TouchableOpacity 
            style={[DashboardStyles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} 
            onPress={() => navigation.navigate('AddUpdateBank')}
          >
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Add new savings</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[DashboardStyles.actionButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]} 
            onPress={() => navigation.navigate('CalculatorScreen')}
          >
            <Text style={{ color: theme === 'dark' ? '#fff' : '#000' }}>Add new investment</Text>
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
      </View>
    </View>
  );
};

export default DashboardScreen;
