import { StyleSheet } from 'react-native';

const CategoryModalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F6FCDF', // Background color
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
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
    backgroundColor: '#859F3D',
    alignItems: 'center',
    borderRadius: 10,

    
  },
  closeButtonText:{
      color: '#fff',
  }
});

export default CategoryModalStyle;