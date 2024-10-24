import { StyleSheet } from 'react-native';

const DashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    paddingBottom: 80, // Added padding to avoid content being hidden under the fixed nav bar
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
    position: 'absolute', // Make the navigation fixed at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8, // Added border radius for consistency
    borderTopRightRadius: 8, // Added border radius for consistency
    elevation: 1, // Added elevation for shadow effect (Android)
  },
  navButton: {
    flex: 1, // Allow nav buttons to take equal space
    alignItems: 'center', // Center the items in the button
  },
  navItem: {
    alignItems: 'center', // Center align items in each navigation button
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5, // Add margin to the bottom of the icon to separate from text
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
