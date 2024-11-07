import { StyleSheet } from 'react-native';

const GovernmentStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6FCDF', // Updated background color
  },
  schemeContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
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
