import { StyleSheet } from "react-native";

const DashboardStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', 
    alignItems: 'stretch',
    backgroundColor: '#fff',
    paddingHorizontal: 20, 
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center', 
    marginVertical: 20, 
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  arrow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    flex: 1, 
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  noRecordContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },
  noRecordText: {
    fontSize: 16,
    color: '#666',
  },
  addRecordText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
});

export default DashboardStyle;
