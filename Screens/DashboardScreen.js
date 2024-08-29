import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DashboardStyle from "../Styles/DashboardStyle"; // Ensure you have the correct DashboardStyle in your DashboardStyle file

const DashboardScreen = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  
  // Expense, income, and total values (dummy data for now)
  const expense = 0;
  const income = 0;
  const total = income - expense;

  // Function to handle previous month
  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  // Function to handle next month
  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  // Get month name from month index
  const getMonthName = (monthIndex) => {
    const monthNames = ["January,", "February,", "March,", "April,", "May,", "June,", "July,", "August,", "September,", "October,", "November,", "December,"];
    return monthNames[monthIndex];
  };

  return (
    <View style={DashboardStyle.container}>
      <View style={DashboardStyle.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={DashboardStyle.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={DashboardStyle.monthText}>{getMonthName(month)} {year}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={DashboardStyle.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <View style={DashboardStyle.summaryContainer}>
        <View style={DashboardStyle.summaryItem}>
          <Text style={DashboardStyle.summaryLabel}>Expense</Text>
          <Text style={DashboardStyle.summaryValue}>₱{expense.toFixed(2)}</Text>
        </View>
        <View style={DashboardStyle.summaryItem}>
          <Text style={DashboardStyle.summaryLabel}>Income</Text>
          <Text style={DashboardStyle.summaryValue}>₱{income.toFixed(2)}</Text>
        </View>
        <View style={DashboardStyle.summaryItem}>
          <Text style={DashboardStyle.summaryLabel}>Total</Text>
          <Text style={DashboardStyle.summaryValue}>₱{total.toFixed(2)}</Text>
        </View>
      </View>

      <View style={DashboardStyle.noRecordContainer}>
        <Text style={DashboardStyle.noRecordText}>No record in this month.</Text>
        <Text style={DashboardStyle.addRecordText}>Tap + to add new expense or income.</Text>
      </View>
    </View>
  );
};


export default DashboardScreen;
