import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import CategoryModalStyle from '../Styles/CategoryModalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For fetching the token
import { useUser } from '../Context/UserContext'; // Import the UserContext

const categoryIconMapping = {
  'Baby': '🍼',
  'Beauty': '💄',
  'Bills': '🧾',
  'Car': '🚗',
  'Clothing': '👗',
  'Education': '🎓',
  // Add more mappings here as needed
};

const incomeCategoryIconMapping = {
  'Awards': '🏆',
  'Coupons': '🎟️',
  'Grants': '💰',
  'Lottery': '🎰',
  'Refunds': '🔙',
  'Rental': '🏠',
  'Salary': '💵',
  'Sale': '🛍️',
};

const CategoryModal = ({ closeModal, onCategorySelect, modalType }) => {
  const [categories, setCategories] = useState([]); // State to store categories data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const { theme } = useUser(); // Always call useContext here (top-level)

  useEffect(() => {
    const getCategories = async () => {
      const token = await AsyncStorage.getItem('authToken'); // Get the token from AsyncStorage
      
      try {
        const response = await fetch('http://192.168.86.249:3000/budgets', { // Use the correct /budgets endpoint
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data = await response.json();
        console.log('Categories:', data);

        // Process categories to create a list for expense categories
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

        // Add income categories as well
        const incomeCategories = Object.keys(incomeCategoryIconMapping).map(category => ({
          name: category,
          icon: incomeCategoryIconMapping[category],
        }));

        setCategories({ expense: categoryData, income: incomeCategories });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getCategories(); // Fetch categories on component mount
  }, []); // Empty dependency array ensures this effect runs only once

  if (loading) {
    return (
      <View style={CategoryModalStyle.modalContainer}>
        <Text style={CategoryModalStyle.title}>Loading categories...</Text>
      </View>
    );
  }

  const modalContainerStyle = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
  };

  const modalBackground = {
    backgroundColor: theme === 'dark' ? '#1A1A19' : '#FFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  };

  const textColor = theme === 'dark' ? '#FFF' : '#000';

  return (
    <View style={modalContainerStyle}>
      <View style={modalBackground}>
        {/* Conditionally render content based on modalType */}
        <Text style={[CategoryModalStyle.title, { color: textColor }]}>
          {modalType === 'expense' ? 'Select Expense Category' : 'Select Income Category'}
        </Text>

        {/* Dynamically display categories based on modalType */}
        {modalType === 'expense' ? (
          categories.expense.length === 0 ? (
            <Text>No categories available</Text>
          ) : (
            <ScrollView contentContainerStyle={CategoryModalStyle.categoriesContainer}>
              {categories.expense.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[CategoryModalStyle.categoryButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
                  onPress={() => {
                    onCategorySelect(category); // Pass the selected category to the parent
                    closeModal(); // Close the modal after selection
                  }}
                >
                  <Text style={CategoryModalStyle.categoryLabel}>
                    <Text>{category.icon}</Text>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        ) : modalType === 'income' ? (
          categories.income.length === 0 ? (
            <Text>No income categories available</Text>
          ) : (
            <ScrollView contentContainerStyle={CategoryModalStyle.categoriesContainer}>
              {categories.income.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[CategoryModalStyle.categoryButton, { backgroundColor: theme === 'dark' ? '#31511E' : '#859F3D' }]}
                  onPress={() => {
                    onCategorySelect(category); // Pass the selected category to the parent
                    closeModal(); // Close the modal after selection
                  }}
                >
                  <Text style={CategoryModalStyle.categoryLabel}>
                    <Text>{category.icon}</Text>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        ) : null}

        {/* Close button */}
        <TouchableOpacity onPress={closeModal} style={CategoryModalStyle.closeButton}>
          <Text style={CategoryModalStyle.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryModal;
