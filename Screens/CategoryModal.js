import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can use any icon set you prefer
import CategoryModalStyle from '../Styles/CategoryModalStyle';

const categories = [
  { name: 'Baby', icon: 'baby' },
  { name: 'Beauty', icon: 'female' },
  { name: 'Bills', icon: 'money' },
  { name: 'Car', icon: 'car' },
  { name: 'Clothing', icon: 'shirt' },
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
  return (
    <View style={CategoryModalStyle.modalContainer}>
      <Text style={CategoryModalStyle.title}>Select a category</Text>
      {/* Scrollable list of categories */}
      <ScrollView contentContainerStyle={CategoryModalStyle.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity key={category.name} style={CategoryModalStyle.categoryButton}>
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
  );
};

export default CategoryModal;