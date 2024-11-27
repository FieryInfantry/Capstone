import { StyleSheet } from 'react-native';

const InsuranceStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6FCDF',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Adjusted to make the background slightly visible
  },
  modalView: {
    backgroundColor: '#F6FCDF', // Matching background color
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
  pickerContainer: {
    borderColor: '#859F3D',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    height: 50,
  },
  input: {
    height: 40,
    borderColor: '#4CAF50', // Matching border color
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50', // Matching theme button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default InsuranceStyle;
