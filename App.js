import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// Import your screens
import BankList from "./Screens/BankListScreen";
import AddUpdateBank from "./Screens/AddUpdateBank";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import DashboardScreen from "./Screens/DashboardScreen";
const Stack = createStackNavigator();

// Main App
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Auth Screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }}
        />

        {/* Bank Management Screens */}
        <Stack.Screen
          name="BankList"
          component={BankList}
          options={{ title: "Connected Banks" }}
        />
        <Stack.Screen
          name="AddUpdateBank"
          component={AddUpdateBank}
          options={{ title: "Add/Update Bank" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
