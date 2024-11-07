import { StyleSheet } from 'react-native';

const SettingsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'YourPreferredFont',
    marginBottom: 20,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: 'YourPreferredFont',
    marginBottom: 8,
  },
  themeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff', // Button text color
  },
});

export default SettingsStyle;
