import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Container Styles
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F6FCDF', // Updated background color
  },
  logo: {
    paddingTop: 100,
    paddingBottom: 50,
    width: 100,
    height: 50,
    marginBottom: 5,
  },
  
  // Text Styles
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'YourPreferredFont', // Updated font
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'YourPreferredFont', // Updated font
    marginBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'YourPreferredFont', // Updated font
    marginTop: 20,
  },
  terms: {
    fontSize: 12,
    color: '#888',
    marginTop: 40,
    textAlign: 'center',
    fontFamily: 'YourPreferredFont', // Updated font
  },
  label: {
    fontSize: 18,
    fontFamily: 'YourPreferredFont', // Updated font
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'YourPreferredFont', // Updated font
    marginBottom: 15,
  },
  
  // Input and Button Styles
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'underline',
    alignSelf: 'flex-end',
    marginVertical: 5,
    fontFamily: 'YourPreferredFont', // Updated font
  },
  button: {
    backgroundColor: '#859F3D', // Updated button color
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'YourPreferredFont', // Updated font
  },
  actionButton: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
    width: '100%',
  },
  
  // Specific button styles for actions
  updateButton: {
    backgroundColor: '#859F3D', // Updated color to match theme
  },
  changePasswordButton: {
    backgroundColor: '#859F3D', // Updated color to match theme
  },
  logoutButton: {
    backgroundColor: '#859F3D', // Updated color to match theme
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#859F3D', // Updated button color
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#859F3D', // Updated button color
  },

  // Insurance Screen Specific Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    padding: 8,
  },
  menu: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
    zIndex: 1000,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    width: '100%',
  },
  value: {
    fontSize: 16,
    fontFamily: 'YourPreferredFont', // Updated font
    marginBottom: 12,
  },
  
  // Picker (Dropdown) Styles
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  
  // Additional styles for the update modal
  modalInput: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },

  // Graph Specific Button Styles
  calculateButton: {
    backgroundColor: '#859F3D', // Updated button color
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#008CBA',
    padding: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  incomeExpenseContainer: {
    padding: 20,
    backgroundColor: "#f1f8e9",
    borderRadius: 5,
  },
  incomeExpenseText: {
    fontSize: 16,
  },
  expenseCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  expenseName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  expenseAmount: {
    fontSize: 16,
    color: "#388e3c",
  },
  expenseCategory: {
    fontSize: 14,
    color: "gray",
  },
  expenseDate: {
    fontSize: 12,
    color: "gray",
  },
  noExpenseText: {
    fontSize: 16,
    color: "gray",
  },
});

export default styles;
