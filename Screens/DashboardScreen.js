import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import DashboardStyles from '../Styles/DashboardStyles';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={DashboardStyles.container}>
        <View style={DashboardStyles.header}>
          <Text style={DashboardStyles.logo}>LOGO</Text>
          <Text style={DashboardStyles.welcome}>Welcome, {"[User Name]"}!</Text>
        </View>

        <View style={DashboardStyles.summaryContainer}>
          <View style={DashboardStyles.summaryBox}>
            <Text>Current Savings</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text>Current Investments</Text>
          </View>
          <View style={DashboardStyles.summaryBox}>
            <Text>Future Value Predictions</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={DashboardStyles.sectionTitle}>Savings Accounts</Text>
            <TouchableOpacity>
              <Text style={DashboardStyles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text>Connected bank account</Text>
            <Text>Individual balances</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={DashboardStyles.sectionTitle}>Investment Accounts</Text>
            <TouchableOpacity>
              <Text style={DashboardStyles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text>Details such as interest rates, dividends, etc.</Text>
          </View>
        </View>

        <View style={DashboardStyles.section}>
          <View style={DashboardStyles.sectionHeader}>
            <Text style={DashboardStyles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={DashboardStyles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={DashboardStyles.accountBox}>
            <Text>Details like date, amount, and description.</Text>
          </View>
        </View>

        <View style={DashboardStyles.actionButtonsContainer}>
          <TouchableOpacity style={DashboardStyles.actionButton}>
            <Text>Add new savings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={DashboardStyles.actionButton}>
            <Text>Add new investment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={DashboardStyles.actionButton}>
            <Text>Access investment calculator</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={DashboardStyles.settingsButton} 
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Text style={DashboardStyles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={DashboardStyles.navigation}>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('BankList')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/bank.png')} style={DashboardStyles.navIcon} />
            <Text>Bank</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('InsuranceScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/life-insurance.png')} style={DashboardStyles.navIcon} />
            <Text>Insurance</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('GovernmentScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/government.png')} style={DashboardStyles.navIcon} />
            <Text>Government</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={DashboardStyles.navButton} onPress={() => navigation.navigate('CalculatorScreen')}>
          <View style={DashboardStyles.navItem}>
            <Image source={require('../assets/calculator.png')} style={DashboardStyles.navIcon} />
            <Text>Calculator</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DashboardScreen;
