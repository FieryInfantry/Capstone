import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import DashboardStyle from "../Styles/DashboardStyle"; // Ensure you have the correct DashboardStyle in your DashboardStyle file
import Icon from 'react-native-vector-icons/Ionicons'; // Import an icon library

const DashboardScreen = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [day, setDay] = useState(new Date().getDate());
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [selectedViewMode, setSelectedViewMode] = useState("Daily"); // State to track the selected view mode

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

  // Update the date based on the selected view mode
  const updateDateForViewMode = (mode) => {
    setSelectedViewMode(mode);
    const currentDate = new Date();
    
    if (mode === "Daily") {
      setDay(currentDate.getDate());
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
    } else if (mode === "Weekly") {
      const firstDayOfWeek = currentDate.getDate() - currentDate.getDay() + 1; // Monday as the first day
      setDay(firstDayOfWeek);
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
    } else if (mode === "Monthly") {
      setDay(1); // Reset to the first of the month in monthly mode
      setMonth(currentDate.getMonth());
      setYear(currentDate.getFullYear());
    } else if (mode === "3 Months") {
      const quarterStartMonth = Math.floor(currentDate.getMonth() / 3) * 3; // Find the start of the quarter
      setMonth(quarterStartMonth);
      setDay(1);
    } else if (mode === "6 Months") {
      const halfYearStartMonth = currentDate.getMonth() < 6 ? 0 : 6; // First half or second half of the year
      setMonth(halfYearStartMonth);
      setDay(1);
    } else if (mode === "Yearly") {
      setMonth(0); // Set to January
      setDay(1);
    }
  };

  return (
    <View style={DashboardStyle.container}>
      <View style={DashboardStyle.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={DashboardStyle.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={DashboardStyle.monthText}>
          {selectedViewMode === "Daily" ? `${getMonthName(month)} ${day}, ${year}` 
          : selectedViewMode === "Weekly" ? `Week of ${getMonthName(month)} ${day}, ${year}` 
          : selectedViewMode === "Monthly" ? `${getMonthName(month)} ${year}`
          : selectedViewMode === "3 Months" ? `Quarter Starting ${getMonthName(month)} ${year}` 
          : selectedViewMode === "6 Months" ? `Half-Year Starting ${getMonthName(month)} ${year}`
          : `Year ${year}`}
        </Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={DashboardStyle.arrow}>{">"}</Text>
        </TouchableOpacity>
        {/* Add icon button here */}
        <TouchableOpacity onPress={() => setShowModal(true)} style={DashboardStyle.iconButton}>
          <Icon name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Summary Section */}
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

      {/* No Record Section */}
      <View style={DashboardStyle.noRecordContainer}>
        <Text style={DashboardStyle.noRecordText}>No record in this month.</Text>
        <Text style={DashboardStyle.addRecordText}>Tap + to add new expense or income.</Text>
      </View>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Display Options</Text>
            <View style={styles.modalContent}>
              {/* View mode options */}
              <Text style={styles.optionTitle}>View mode:</Text>
              <TouchableOpacity onPress={() => updateDateForViewMode("Daily")}>
                <Text style={[styles.optionText, selectedViewMode === "Daily" && styles.selectedOption]}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateDateForViewMode("Weekly")}>
                <Text style={[styles.optionText, selectedViewMode === "Weekly" && styles.selectedOption]}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateDateForViewMode("Monthly")}>
                <Text style={[styles.optionText, selectedViewMode === "Monthly" && styles.selectedOption]}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateDateForViewMode("3 Months")}>
                <Text style={[styles.optionText, selectedViewMode === "3 Months" && styles.selectedOption]}>3 Months</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateDateForViewMode("6 Months")}>
                <Text style={[styles.optionText, selectedViewMode === "6 Months" && styles.selectedOption]}>6 Months</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => updateDateForViewMode("Yearly")}>
                <Text style={[styles.optionText, selectedViewMode === "Yearly" && styles.selectedOption]}>Yearly</Text>
              </TouchableOpacity>

              {/* Show total options */}
              <Text style={styles.optionTitle}>Show total:</Text>
              <Text style={styles.optionText}>Yes</Text>
              <Text style={styles.optionText}>No</Text>

              {/* Carry over options */}
              <Text style={styles.optionTitle}>Carry over:</Text>
              <Text style={styles.optionText}>On</Text>
              <Text style={styles.optionText}>Off</Text>
            </View>

            {/* Close button */}
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    alignItems: 'flex-start',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  optionText: {
    fontSize: 14,
    paddingLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    color: 'blue',
    fontSize: 16,
  },
  selectedOption: {
    fontWeight: 'bold',
    color: 'blue',
  },
});

export default DashboardScreen;
