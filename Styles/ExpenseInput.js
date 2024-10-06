import { StyleSheet } from 'react-native';

const ExpenseStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    padding: 10,
    margin: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
  },
  operatorButton: {
    backgroundColor: '#ff9f00',
    borderColor: '#ff8c00',
    borderWidth: 1,
  },
  operatorButtonText: {
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: '#e57373', // Red background for delete
    borderColor: '#d32f2f',     // Darker red border
    borderWidth: 1,
    width: 60,                  // Adjust width for better fit
    height: 50,                 // Match height with other buttons
    alignItems: 'center',       // Center content horizontally
    justifyContent: 'center',   // Center content vertically
  },
  deleteButtonText: {
    color: '#fff',               // White text for contrast
    fontSize: 24,                // Larger text for better visibility
  },
  calculatorContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  displayContainer: {
    flexDirection: 'row',      // Arrange items in a row
    alignItems: 'center',      // Center items vertically
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  display: {
    fontSize: 24,
    textAlign: 'right',
    flex: 1,                   // Allow display to take remaining space
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowLast: {
    marginBottom: 0,
  },
});

export default ExpenseStyle;
