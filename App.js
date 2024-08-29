import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";

import SplashScreen from "./Screens/SplashScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import AnalysisScreen from "./Screens/AnalysisScreen";
import BudgetScreen from "./Screens/BudgetScreen";
import AccountScreen from "./Screens/AccountScreen";
import CategoryScreen from "./Screens/CategoryScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Records"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Budgets"
        component={BudgetScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Accounts"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={BottomTabNavigator} />
    </Drawer.Navigator>
  );
};

// Main Stack Navigator
const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
