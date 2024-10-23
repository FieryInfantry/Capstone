import { StyleSheet } from 'react-native';

const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20, // Increased margin for better separation
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 18,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20, // Increased margin for better separation
  },
  summaryBox: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 4, // Use horizontal margin for better spacing
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Added border radius for a softer look
    elevation: 2, // Added elevation for shadow effect (Android)
  },
  section: {
    marginBottom: 20, // Increased margin for better separation
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Added margin for spacing between header and content
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007bff',
  },
  accountBox: {
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8, // Added border radius for consistency
    elevation: 1, // Added elevation for shadow effect (Android)
  },
  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Increased margin for better separation
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 4, // Use horizontal margin for better spacing
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8, // Added border radius for a softer look
    elevation: 2, // Added elevation for shadow effect (Android)
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20, // Increased margin for better separation
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 8, // Added border radius for consistency
    elevation: 1, // Added elevation for shadow effect (Android)
  },
  settingsButton: {
    marginTop: 20, // Adds space above the button
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#007bff', // Button text color
  },
  
});

export default DashboardStyles;
