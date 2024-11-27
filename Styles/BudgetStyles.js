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
      backgroundColor: "#859F3D",
    },
    
    navButtonText: {
      color: "#fff",
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
      justifyContent: "center", // Center both containers with separation
      alignItems: "center", // Keep items vertically centered
    },
    
    amountContainer: {
      alignItems: "center", // Center the amount and text within each container
      paddingHorizontal: 10, // Add some padding to bring the containers closer
    },
    
    summaryText: {
      fontSize: 16,
      marginTop: 5, // Space between the amount and the label
      opacity: 0.7, // Slight opacity for a less bold text
    },
    
    summaryAmount: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#388e3c",
    },
    
    summaryAmountSpent: {
      fontSize: 20,
      fontWeight: "bold",
      color: "red",
    },
    
    separator: {
      width: 1, // Thin line
      height: "60%", // Make it shorter so it doesn't occupy the whole height
      backgroundColor: "#000", // Black color for the separator line
      marginHorizontal: 15, // Space the separator from the two columns
    },
    
    
  
    sectionHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    budgetCard: {
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      borderColor: "#859F3D",
      borderWidth: 1
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
    outerContainer: {
      backgroundColor: "#859F3D", // Outer container background color
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      alignItems: "center", // Center content horizontally
      height: 150

    },
    
    innerContainer: {
      backgroundColor: "white", // Inner container background color (white)
      padding: 20,
      borderRadius: 5,
      alignItems: "center", // Center content horizontally
      width: "70%", // Make inner container fill the width of the outer container
      height: 80,
      shadowColor: "#000", // Optional: Add shadow for depth
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3, // Add elevation for Android
    },
    
    bankBalanceText: {
      fontSize: 23,
      fontWeight: "bold",
      color: "#fff", // Slightly dark color for the title
    },
    
    summaryAmount: {
      fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  
    },
    eyeIcon:{
      alignItems:"center",
      marginLeft : 8
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
    expenseCard:{
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      borderColor: "#859F3D",
      borderWidth: 1
    },
    incomeExpenseContainer: {
      flex: 1, // Allow the container to take up full screen height
      paddingHorizontal: 15,
      paddingBottom: 80, // Add padding to avoid content overlapping with floating button
    },
    floatingButton: {
      position: 'absolute',
      bottom: 30, // Position the button near the bottom of the screen
      right: 20, // Align to the right
      backgroundColor: '#859F3D',
      width: 60,
      height: 60,
      borderRadius: 30, // Make it circular
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3,
      elevation: 5, // For Android shadow
    },
});


  export default BudgetStyles;