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
  container2: {
    
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F6FCDF', // Updated background color
    width: "100%",
    height: "100%",
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
    backgroundColor:'rgba(255, 255, 255, 0.8)', // Adjusted to make the background slightly visible
  },
  modalView: {
    backgroundColor: '#fff', // Matching background color
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4CAF50', // Matching text color
  },
  modalButton: {
    backgroundColor: '#859F3D', // Matching theme button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
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
});

export default styles;