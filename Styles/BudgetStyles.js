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
    incomeExpenseContainer: {
      padding: 16,
    },
    incomeExpenseText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    sectionHeader: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 16,
    },
    cardContainer: {
      marginVertical: 8,
    },
    incomeCard: {
      padding: 12,
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
    },
    expenseCard: {
      padding: 12,
      backgroundColor: '#f8d7da',
      borderRadius: 8,
    },
    incomeName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    expenseName: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    incomeAmount: {
      fontSize: 14,
      color: '#28a745',
    },
    expenseAmount: {
      fontSize: 14,
      color: '#dc3545',
    },
    incomeDetailsContainer: {
      marginTop: 8,
    },
    expenseDetailsContainer: {
      marginTop: 8,
    },
    incomeCategory: {
      fontSize: 12,
      color: '#555',
    },
    expenseCategory: {
      fontSize: 12,
      color: '#555',
    },
    incomeDate: {
      fontSize: 12,
      color: '#555',
    },
    expenseDate: {
      fontSize: 12,
      color: '#555',
    },
    incomeBank: {
      fontSize: 12,
      color: '#007bff', // Adjust color as needed
    },
    expenseBank: {
      fontSize: 12,
      color: '#007bff', // Adjust color as needed
    },
    noDataText: {
      fontSize: 14,
      color: '#888',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteButton: {
      backgroundColor: 'blue', // Adjust the color to match your desired style
      padding: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
      fontSize: 16,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    },
    modalText: {
      color: 'white',
      fontSize: 18,
    },
  });
  

  export default BudgetStyles;