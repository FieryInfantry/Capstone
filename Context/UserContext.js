import React, { createContext, useContext, useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native'; // For persisting theme in AsyncStorage

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [token, setToken] = useState(null); // Store token separately
  const [theme, setTheme] = useState('light'); // Default theme is light

  // Load the theme from AsyncStorage when the app starts
  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme();
  }, []);

  // Function to toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme); // Persist theme in AsyncStorage
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, token, setToken, theme, toggleTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
