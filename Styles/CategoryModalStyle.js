import { StyleSheet } from 'react-native';

const CategoryModalStyle = StyleSheet.create({
  modalBackground:{
    backgroundColor: '#F6FCDF', // Matching background color
    padding: 20,
    borderRadius: 10,
    width: '80%',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjusted to make the background slightly visible
  },
 
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#4CAF50', // Matching text color
  },
  modalButton: {
    backgroundColor: '#4CAF50', // Matching theme button color
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
    
  },
  title: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: "bold",
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryButton: {
    width: 100,
    height: 100,
    backgroundColor: '#859F3D', // Button color
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
  },
  categoryLabel: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    color: '#fff', // Label color
  },
  closeButton: {
    padding: 10,
    marginTop: 20,
    backgroundColor: 'red',
    alignItems: 'center',
      borderRadius: 10,
      

    
  },
  closeButtonText:{
      color: '#fff',
  }
});

export default CategoryModalStyle;