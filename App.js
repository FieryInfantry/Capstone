import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

// Import your screens
import SplashScreen from "./Screens/SplashScreen";
import BankList from "./Screens/BankListScreen";
import AddUpdateBank from "./Screens/AddUpdateBank";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import UpdateInfoScreen from "./Screens/UpdateInfoScreen";
import ChangePasswordScreen from "./Screens/ChangepasswordScreen";
import InsuranceScreen from "./Screens/InsuranceScreen";
import UpdateInsuranceScreen from "./Screens/UpdateInsuranceScreen";
import GovernmentScreen from "./Screens/GovernmentScreen";
import CalculatorScreen from "./Screens/CalculatorScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import BudgetScreen from "./Screens/BudgetScreen";
import ExpenseInputScreen from "./Screens/ExpenseInputScreen";
import IncomeInputScreen from "./Screens/IncomeInputScreen";

// Import context
import { UserProvider } from './Context/UserContext';

// Stack Navigator setup
const Stack = createStackNavigator();

// Main App component with navigation
const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            gestureEnabled: true,  // Enable swipe gestures across all screens
            gestureDirection: 'horizontal',  // Swipe direction for back gesture
            cardStyle: { backgroundColor: 'white' }, // Optional, set card style
          }}
        >
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

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
            name="ResetPassword"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BankList"
            component={BankList}
            options={{ title: "Connected Banks" }}
          />
          <Stack.Screen
            name="AddUpdateBank"
            component={AddUpdateBank}
            options={({ route }) => ({
              title: route.params?.bank ? 'Update Bank' : 'Add Bank',
            })}
          />

          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
          <Stack.Screen
            name="UpdateInfoScreen"
            component={UpdateInfoScreen}
            options={{ title: "Update Information" }}
          />
          <Stack.Screen
            name="ChangepasswordScreen"
            component={ChangePasswordScreen}
            options={{ title: "Change Password" }}
          />

          <Stack.Screen
            name="InsuranceScreen"
            component={InsuranceScreen}
            options={{ title: "Insurance Screen" }}
          />
          <Stack.Screen
            name="UpdateInsuranceScreen"
            component={UpdateInsuranceScreen}
            options={{ title: "Update Insurance" }}
          />

          <Stack.Screen
            name="GovernmentScreen"
            component={GovernmentScreen}
            options={{ title: "Government" }}
          />
          <Stack.Screen
            name="CalculatorScreen"
            component={CalculatorScreen}
            options={{ title: "Calculator" }}
          />
          <Stack.Screen
            name="BudgetScreen"
            component={BudgetScreen}
            options={{ title: "Budget Screen" }}
          />
          <Stack.Screen
            name="ExpenseInputScreen"
            component={ExpenseInputScreen}
            options={{ title: "Expense Input" }}
          />
          <Stack.Screen
            name="IncomeInputScreen"
            component={IncomeInputScreen}
            options={{ title: "Income Input" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
