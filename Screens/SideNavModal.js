import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons'; // Import Entypo icons

const SideNavModal = ({ userData, navigation, handleLogout, modalVisible, onClose, theme }) => {
  const [slideAnim] = useState(new Animated.Value(250)); // Start position off-screen to the right

  useEffect(() => {
    if (modalVisible) {
      // Trigger animation to slide in from the right to the left
      Animated.timing(slideAnim, {
        toValue: 0, // Move to screen (position 0)
        duration: 300, // Duration of the animation
        useNativeDriver: true, // Use native driver for performance
      }).start();
    } else {
      // Trigger animation to slide out from left to right
      Animated.timing(slideAnim, {
        toValue: 250, // Move off-screen to the right
        duration: 300, // Duration of the animation
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  const modalBackgroundColor = theme === 'dark' ? '#1A1A19' : '#F6FCDF';
  const modalContainerColor = theme === 'dark' ? '#1A1A19' : '#F6FCDF';
  const textColor = theme === 'dark' ? '#FFF' : '#000';
  const iconColor = theme === 'dark' ? '#31511E' : '#859F3D';

  return (
    <Modal
      visible={modalVisible}
      animationType="none" // Disable default animation
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={[styles.modalOverlay, { backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.3)' }]}>
        <Animated.View style={[styles.modalContainer, { backgroundColor: modalContainerColor, transform: [{ translateX: slideAnim }] }]}>
          {/* Close Button with Chevron Icon */}
          
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Entypo name="chevron-left" size={30} color={textColor} />
          </TouchableOpacity>
          
          {/* User Information */}
          <View style={styles.userInfoContainer}>
            <Text style={[styles.userName, { color: textColor }]}>
              {userData?.fullName || '[User Name]'}
            </Text>
            <Text style={[styles.userEmail, { color: textColor }]}>
              {userData?.email || '[User Email]'}
            </Text>
          </View>

          {/* Menu Options */}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SettingsScreen');
              onClose(); // Close modal after navigating
            }}
            style={styles.menuItem}
          >
            <Entypo name="cog" size={24} color={iconColor} />
            <Text style={[styles.menuText, { color: textColor }]}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TermsModal');
              onClose(); // Close modal after navigating
            }}
            style={styles.menuItem}
          >
            <Entypo name="document" size={24} color={iconColor} />
            <Text style={[styles.menuText, { color: textColor }]}>Terms and Service</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handleLogout();
              onClose(); // Close modal after logout
            }}
            style={styles.menuItem}
          >
            <Entypo name="log-out" size={24} color={iconColor} />
            <Text style={[styles.menuText, { color: textColor }]}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end', // Align to the right side of the screen
  },
  modalContainer: {
    width: 250,
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    height: '100%', // Ensure it takes up the full height of the screen
    position: 'absolute',
    right: 0, // Position at the right side
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  userInfoContainer: {
    paddingTop : 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default SideNavModal;
