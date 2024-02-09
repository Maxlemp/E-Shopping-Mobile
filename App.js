import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "nativewind";
import { StatusBar } from "expo-status-bar";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductsList from "./components/ProductsList";

const Stack = createStackNavigator();

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [registered, setRegistered] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegistrationComplete = () => {
    setRegistered(true);
    setLoggedIn(true); // Navigate to the login screen after registration
  };

  const handleLoginComplete = () => {
    setLoggedIn(true);
  };

  return (
    <NavigationContainer>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          initialParams={{
            onRegistrationComplete: handleRegistrationComplete,
          }}
        />

        <Stack.Screen name="ProductsList" component={ProductsList} />

        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ onLoginComplete: handleLoginComplete }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
