import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CategoryModalStyle from '../Styles/CategoryModalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For fetching the token


const categoryIconMapping = {
  'Baby': '🍼',
  'Beauty': '💄',
  'Bills': '🧾',
  'Car': '🚗',
  'Clothing': '👗',
  'Education': '🎓',
  // Add more mappings here as needed
};


const CategoryModal = ({ closeModal, onCategorySelect }) => {
  const [categories, setCategories] = useState([]); // State to store categories data
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    const getCategories = async () => {
      const token = await AsyncStorage.getItem('authToken'); // Get the token from AsyncStorage
      
      try {
        const response = await fetch('http://localhost:3000/budgets', { // Use the correct /budgets endpoint
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch budgets');
        }

        const data = await response.json();
        console.log('Budgets:', data);

        // Process budgets to create a list of unique categories
        const categoryData = data.reduce((acc, budget) => {
          if (!acc.find(item => item.name === budget.category)) {
            acc.push({
              name: budget.category,
              budget: budget.amount,
              icon: categoryIconMapping[budget.category] || '❓',
            });
          }
          return acc;
        }, []);
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getCategories(); // Fetch categories on component mount
  }, []);

  const handleCategorySelect = (category) => {
    console.log('Selected Category:', category); // Debug the selected category
    if (onCategorySelect) {
      onCategorySelect(category); // Call the callback with selected category
    }
    closeModal(); // Close the modal
  };

  if (loading) {
    return (
      <View style={CategoryModalStyle.modalContainer}>
        <Text style={CategoryModalStyle.title}>Loading categories...</Text>
      </View>
    );
  }

  return (
    <View style={CategoryModalStyle.modalContainer}>
      <Text style={CategoryModalStyle.title}>Select a category</Text>
      {categories.length === 0 ? (
        <Text>No categories available</Text>
      ) : (
        <ScrollView contentContainerStyle={CategoryModalStyle.categoriesContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index} // Use index if no unique ID is available
              style={CategoryModalStyle.categoryButton}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={CategoryModalStyle.categoryLabel}>
                {category.icon} {category.name} - ₱{category.budget.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity onPress={closeModal} style={CategoryModalStyle.closeButton}>
        <Text style={CategoryModalStyle.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryModal;
