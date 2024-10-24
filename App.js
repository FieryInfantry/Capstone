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
import SettingsScreen from "./Screens/SettingsScreen"; // Import SettingsScreen
import UpdateInfoScreen from "./Screens/UpdateInfoScreen";
import ChangePasswordScreen from "./Screens/ChangepasswordScreen";
import InsuranceScreen from "./Screens/InsuranceScreen";
import UpdateInsuranceScreen from "./Screens/UpdateInsuranceScreen";
import GovernmentScreen from "./Screens/GovernmentScreen";
import CalculatorScreen from "./Screens/CalculatorScreen";

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

        {/*Settings */}
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{ title: "Settings" }} 
        />
        <Stack.Screen
          name="UpdateInfoScreen"
          component={UpdateInfoScreen}
          options={{ title: "UpdateInfo" }}
        />
        <Stack.Screen
          name="ChangepasswordScreen"
          component={ChangePasswordScreen}
          options={{ title: "Change Password" }}
          />
        {/*Insurance */}
        <Stack.Screen
          name="InsuranceScreen"
          component={InsuranceScreen}
          options={{title: "Insurance"}}
        />
        {/*Goverment*/}
        <Stack.Screen
         name="GovernmentScreen"
         component={GovernmentScreen}
         options={{title: "Government"}}
         />
        {/*Calculator*/}
        <Stack.Screen
         name="CalculatorScreen"
         component={CalculatorScreen}
         options={{title: "Calculator"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
