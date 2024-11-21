import { StyleSheet } from 'react-native';

const GovernmentStyles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the full available space
    justifyContent: "center", // Centers children vertically
    alignItems: "center", // Centers children horizontally
    backgroundColor: "#F6FCDF",
  },
  schemeContainer: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
  },
  schemeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'YourPreferredFont', // Custom font
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'YourPreferredFont', // Custom font
  },
  value: {
    fontSize: 16,
    fontFamily: 'YourPreferredFont', // Custom font
    marginBottom: 10,
  },
});

export default GovernmentStyles;