import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import DashboardStyles from '../Styles/DashboardStyles';

const DashboardScreen = ({ navigation }) => {
  return (
    <ScrollView style={DashboardStyles.container}>
      <View style={DashboardStyles.header}>
        <Text style={DashboardStyles.logo}>LOGO</Text>
        <Text style={DashboardStyles.welcome}>Welcome, [User Name]!</Text>
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
          <Image source={{ uri: 'bank_logo_url' }} style={DashboardStyles.bankLogo} />
          <View>
            <Text>Connected bank account</Text>
            <Text>Individual balances</Text>
          </View>
        </View>
        {/* Repeat for more accounts if needed */}
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

      <View style={DashboardStyles.navigation}>
        <TouchableOpacity onPress={() => navigation.navigate('BankList')}>
          <Text>Bank</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Government</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Calculator</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
