import { StyleSheet } from 'react-native';

const DashboardStyles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Makes it take up the full available space
    paddingBottom: 200, // Adjust padding to make space for the navigation bar
  },
  container: {

    flexGrow: 1,
    padding: 16,
  },
  innerContainer:{
    paddingBottom : 70
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10, 
    height: 60,
    paddingTop: 40
   
  },
  logo: {
    width: 50,
    height: 80,
    paddingLeft: 70

  },
  welcome: {
    fontSize: 18,
  },
  summaryContainer: {
    padding: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0, // No space between buttons and value container
  },
  button1: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius : 8,

    
  },
  button2: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0, // No rounded corners for buttons
    
  },
  button3: {
    flex: 1,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius : 8,

    
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: "center",
    color : "#fff"
  },
  valueContainer: {
    padding: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,   
     marginTop: 0, // Remove space between buttons and container
    alignItems: 'center', // Center value inside the container
    justifyContent: 'center',
    minHeight: 100,
  },
  innerValueContainer: {
    backgroundColor: '#fff', // White background for the inner container
    padding: 20,
    borderRadius: 8, // Optional: Add rounded corners for the inner container
    minWidth: 200, // Set a minimum width for the inner container
    Height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Optional: Add shadow for a floating effect
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    marginLeft: 8,
  },
  

    section: {
      marginBottom: 16, // Space between sections
      padding: 16, // Padding inside the section
      height: 180,
      borderRadius: 8, // Rounded corners for the section container
      paddingBottom: 12


    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8, // Space between header and content
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeAll: {
      fontSize: 14,
      textDecorationLine: 'underline',
    },
    accountBox: {
      flex: 1,
      backgroundColor: '#fff', // Background for the account box
      borderRadius: 8,
      overflow: 'hidden', // Ensures no content spills out
      
    },

  bankLogo: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingBottom: 20
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#859F3D', // Updated button color
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff', // Change this for dark mode if needed
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  settingsButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  settingsButtonText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'YourPreferredFont', // Updated font
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    
  },
  iconContainer: {
    padding: 10,
  },
  menu: {
    backgroundColor: '#fff',
    position: 'absolute',
    right: 20,
    top: 60,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default DashboardStyles;
