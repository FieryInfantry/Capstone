import { StyleSheet } from 'react-native';

const BudgetStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#f8fce6",
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
    monthSelector: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    arrow: { fontSize: 24 },
    monthText: { fontSize: 20, fontWeight: "bold" },
    summary: {
      backgroundColor: "#d0f0c0",
      padding: 15,
      borderRadius: 5,
      marginBottom: 20,
      flexDirection: "row", // Align horizontally
      justifyContent: "flex-start", // Align to the start
      alignItems: "center", // Align items vertically centered
    },
    summaryText: {
      fontSize: 16,
      marginRight: 8, // Space between text and number
    },
    summaryAmount: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#388e3c",
      paddingLeft: 5, // Adds space between the text and the number
      marginRight: 40,
    },
    summaryAmountSpent: {
      fontSize: 20,
      fontWeight: "bold",
      color: "red",
      marginRight: 8, // Space between the text and the amount
    },
  
    sectionHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    budgetCard: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
    },
    budgetCardHeader: { fontSize: 18, fontWeight: "bold" },
    budgetDetails: { fontSize: 16 },
    progressBar: {
      height: 10,
      backgroundColor: "#ddd",
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 5,
    },
    progress: {
      height: "100%",
      borderRadius: 5,
    },
    limitExceeded: { color: "red", fontSize: 14, marginTop: 5 },
    noBudgetText: { fontSize: 16, color: "gray" },
    categoryRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    categoryIcon: { fontSize: 24, marginRight: 10 },
    categoryName: { fontSize: 16, flex: 1 },
    setBudgetButton: {
      backgroundColor: "#388e3c",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    setBudgetButtonText: { color: "#fff", fontSize: 16 },
    bankBalance: {
      backgroundColor: "#e1f5fe",
      padding: 15,
      borderRadius: 5,
      marginBottom: 20,
    },
    bankBalanceText: { fontSize: 16 },
    incomeExpenseContainer: {
      padding: 20,
      backgroundColor: "#f1f8e9",
      borderRadius: 5,
    },
    incomeExpenseText: { fontSize: 16 },
    deleteButton: {
      backgroundColor: "red",
      paddingVertical: 5,
      paddingHorizontal: 20, // Adjust the horizontal padding for a wider button
      borderRadius: 5,
      marginTop: 10,
      width: "auto", // Allow the button to expand based on content
      alignSelf: "center", // Center the button horizontally
    },
    deleteButtonText: {
      color: "white",
      fontSize: 16,
      textAlign: "center",
    },
  });
  

  export default BudgetStyles;