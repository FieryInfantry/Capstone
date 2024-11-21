import React, { useLayoutEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import BudgetModal from "./SetBudgetModal"; // Ensure this component exists and is properly implemented
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Baby', icon: '🍼' },
  { id: '2', name: 'Beauty', icon: '💄' },
  { id: '3', name: 'Bills', icon: '🧾' },
  { id: '4', name: 'Car', icon: '🚗' },
  { id: '5', name: 'Clothing', icon: '👗' },
  { id: '6', name: 'Education', icon: '🎓' },
];

const BudgetScreen = () => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("Budget"); // To toggle between "Budget" and "Income & Expense"
  const [budgets, setBudgets] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const getMonthName = (monthIndex) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthIndex];
  };

  const handleOpenModal = (categoryName) => {
    setSelectedCategory(categoryName);
    setModalVisible(true);
  };

  const handleSaveBudget = (categoryName, amount) => {
    setBudgets((prevBudgets) => ({
      ...prevBudgets,
      [categoryName]: { limit: parseFloat(amount), spent: 0 },
    }));
    setModalVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate('ExpenseInputScreen')}
        >
          <Text style={styles.navButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const calculateRemaining = (limit, spent) => Math.max(limit - spent, 0);

  const renderBudgetContent = () => (
    <View>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>TOTAL BUDGET</Text>
        <Text style={styles.summaryAmount}>
          ₱{Object.values(budgets).reduce((sum, b) => sum + (b.limit || 0), 0).toFixed(2)}
        </Text>
        <Text style={styles.summaryText}>TOTAL SPENT</Text>
        <Text style={styles.summaryAmountSpent}>
          ₱{Object.values(budgets).reduce((sum, b) => sum + (b.spent || 0), 0).toFixed(2)}
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Budgeted categories: {getMonthName(month)}, {year}</Text>
      {Object.keys(budgets).length > 0 ? (
        <FlatList
          data={Object.entries(budgets).map(([name, details]) => ({
            name,
            ...details,
          }))}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.budgetCard}>
              <Text style={styles.budgetCardHeader}>{item.name}</Text>
              <Text style={styles.budgetDetails}>Limit: ₱{item.limit.toFixed(2)}</Text>
              <Text style={styles.budgetDetails}>Spent: ₱{item.spent.toFixed(2)}</Text>
              <Text style={styles.budgetDetails}>
                Remaining: ₱{calculateRemaining(item.limit, item.spent).toFixed(2)}
              </Text>
              <View style={styles.progressBar}>
                <View
                  style={{
                    ...styles.progress,
                    width: `${Math.min((item.spent / item.limit) * 100, 100)}%`,
                    backgroundColor: item.spent > item.limit ? 'red' : '#4caf50',
                  }}
                />
              </View>
              {item.spent > item.limit && <Text style={styles.limitExceeded}>*Limit exceeded</Text>}
            </View>
          )}
        />
      ) : (
        <Text style={styles.noBudgetText}>
          No budgets set for this month. Start by setting your budgets below.
        </Text>
      )}

      <Text style={styles.sectionHeader}>Not budgeted this month</Text>
      <FlatList
        data={categories.filter((category) => !budgets[category.name])}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryRow}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.setBudgetButton}
              onPress={() => handleOpenModal(item.name)}
            >
              <Text style={styles.setBudgetButtonText}>SET</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );

  const renderIncomeExpenseContent = () => (
    <View style={styles.incomeExpenseContainer}>


      <Text style={styles.incomeExpenseText}>Income & Expense content will go here!</Text>
    </View>
    
  );

  return (
    <View style={styles.container}>
                  <View style={styles.monthSelector}>
        <TouchableOpacity onPress={handlePrevMonth}>
          <Text style={styles.arrow}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{getMonthName(month)}, {year}</Text>
        <TouchableOpacity onPress={handleNextMonth}>
          <Text style={styles.arrow}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={[styles.navButton, activeScreen === "Budget" && styles.activeButton]}
          onPress={() => setActiveScreen("Budget")}
        >
          <Text style={styles.navButtonText}>Budget</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, activeScreen === "IncomeExpense" && styles.activeButton]}
          onPress={() => setActiveScreen("IncomeExpense")}
        >
          <Text style={styles.navButtonText}>Income & Expense</Text>
        </TouchableOpacity>
      </View>

      {activeScreen === "Budget" ? renderBudgetContent() : renderIncomeExpenseContent()}

      <BudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        budgetItem={selectedCategory}
        onSaveBudget={handleSaveBudget}
      />
    </View>
  );
};

export default BudgetScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f8fce6" 
  },
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: "#45a049",
  },
  navButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  monthSelector: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  arrow: { fontSize: 24 },
  monthText: { fontSize: 20, fontWeight: "bold" },
  summary: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  summaryText: { fontSize: 14, color: "#666" },
  summaryAmount: { fontSize: 18, fontWeight: "bold", color: "#4caf50" },
  summaryAmountSpent: { fontSize: 18, fontWeight: "bold", color: "red" },
  sectionHeader: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  budgetCard: { backgroundColor: "#f9f9f9", padding: 15, marginBottom: 10, borderRadius: 10 },
  budgetCardHeader: { fontSize: 16, fontWeight: "bold" },
  budgetDetails: { fontSize: 14, marginVertical: 2 },
  progressBar: { height: 5, backgroundColor: "#ddd", marginVertical: 5 },
  progress: { height: "100%", borderRadius: 5 },
  limitExceeded: { color: "red", fontSize: 12 },
  noBudgetText: { fontSize: 14, color: "#999" },
  categoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  categoryIcon: { fontSize: 30, marginRight: 15 },
  categoryName: { fontSize: 16, flex: 1 },
  setBudgetButton: { paddingVertical: 5, paddingHorizontal: 15, backgroundColor: "#4caf50", borderRadius: 5 },
  setBudgetButtonText: { color: "#fff", fontSize: 14 },
  incomeExpenseContainer: { padding: 20 },
  incomeExpenseText: { fontSize: 16 },
});
