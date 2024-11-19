import { StyleSheet } from 'react-native';

const BudgetStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6FCDF', // Matching background color
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    color: '#888',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    textAlign: 'center',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  arrow: {
    fontSize: 24,
    color: '#859F3D', // Updated to match button color
    paddingHorizontal: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  setBudgetButton: {
    backgroundColor: '#859F3D', // Matching button color
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    elevation: 2,
  },
  setBudgetButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    backgroundColor: '#859F3D', // Matching floating button color
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2.5,
    elevation: 4,
  },
  floatingButtonText: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'YourPreferredFont', // Consistent font
  },
  budgetSummary: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#859F3D', // Matching theme color
    fontFamily: 'YourPreferredFont', // Consistent font
  },
});

export default BudgetStyle;
