import { StyleSheet } from 'react-native';

const ExpenseStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6FCDF', // Matching theme background
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16, // Slightly smaller font size for label
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  button: {
    flex: 1,
    padding: 12,
    margin: 5,
    backgroundColor: '#F6FCDF', // Button color as requested
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40, // Reduced height for a more compact button
    elevation: 2, // Added elevation for consistency
    backgroundColor:"#859F3D"
  },
  buttonInlineContainer: {
    flexDirection: 'row', // Makes the buttons align horizontally
    justifyContent: 'space-between',
    marginBottom: 20, // Space between buttons
  },
  buttonText: {
    fontSize: 14, // Smaller font size for buttons
    color: '#fff',
    fontFamily: 'YourPreferredFont', // Consistent font
    alignItems: 'center',
  },
  operatorButton: {
    backgroundColor: '#F6FCDF', // Matching button color
    borderColor: '#738c32',     // Slightly darker green for the border
    borderWidth: 1,
    borderRadius: 10,
    height: 50,                 // Make operator buttons the same size
    width: 80,
    alignItems: 'center',
    paddingTop: 12,
  },
  operatorButtonText: {
    color: '#333',
    fontSize: 18,               // Smaller font size for consistency
    alignItems: 'center',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  deleteButton: {
    backgroundColor: '#e57373', // Red background for delete
    borderColor: '#d32f2f',     // Darker red border
    borderWidth: 1,
    width: 70,                  // Slightly wider delete button
    height: 50,                 // Reduced height for consistency
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,            // Rounded edges
    elevation: 2,               // Added elevation for consistency
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,               // Reduced font size for delete button
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  calculatorContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  displayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    padding: 10,
    elevation: 1, // Added slight elevation for consistency
  },
  display: {
    fontSize: 32, // Larger display text
    textAlign: 'right',
    flex: 1,
    color: '#333',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rowLast: {
    marginBottom: 0,
  },
  dateContainer: {
    marginTop: 20,
    backgroundColor: '#F6FCDF', // Light background for the date container
    padding: 10,
    borderRadius: 8, // Rounded corners
    alignItems: 'center', // Centers the content
  },
  dateText: {
    fontSize: 20, // Smaller font size for date and time
    color: '#333',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align buttons horizontally
    marginBottom: 20,
  },
});

export default ExpenseStyle;
