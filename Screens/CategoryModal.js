import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon set you prefer
import CategoryModalStyle from '../Styles/CategoryModalStyle';
import { useUser } from '../Context/UserContext'; // Import the UserContext


const categories = [
  { name: 'Baby', icon: 'child' },
  { name: 'Beauty', icon: 'female' },
  { name: 'Bills', icon: 'money' },
  { name: 'Car', icon: 'car' },
  { name: 'Clothing', icon: 'tshirt' },
  { name: 'Education', icon: 'graduation-cap' },
  { name: 'Electronics', icon: 'laptop' },
  { name: 'Entertainment', icon: 'film' },
  { name: 'Food', icon: 'cutlery' },
  { name: 'Health', icon: 'heartbeat' },
  { name: 'Home', icon: 'home' },
  { name: 'Insurance', icon: 'shield' },
  { name: 'Shopping', icon: 'shopping-cart' },
  { name: 'Social', icon: 'users' },
  { name: 'Sports', icon: 'soccer-ball-o' },
  { name: 'Tax', icon: 'money' },
  { name: 'Telephone', icon: 'phone' },
  { name: 'Transportation', icon: 'bus' },
];

const CategoryModal = ({ closeModal }) => {
  const { userData, theme } = useUser();
  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';
  return (
    <View style={modalContainerStyle}>
  <View style={modalBackground}>
    <Text style={CategoryModalStyle.modalTitle}>Select a category</Text>
    {/* Scrollable list of categories */}
    <ScrollView contentContainerStyle={CategoryModalStyle.categoriesContainer}>
      {categories.map((category) => (
        <TouchableOpacity key={category.name} style={[CategoryModalStyle.categoryButton, {backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D'}]}>
          <Icon name={category.icon} size={30} color="#fff" />
          <Text style={CategoryModalStyle.categoryLabel}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    {/* Close button */}
    <TouchableOpacity onPress={closeModal} style={CategoryModalStyle.closeButton}>
      <Text style={CategoryModalStyle.closeButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</View>

  );
};

export default CategoryModal;