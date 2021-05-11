import React, { Component } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import { NavigationContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

import firebase from "firebase/app";
import "firebase/auth";
import { theme } from "./src/core/theme";
import {
  LoginScreen,
  Pred,
  Cam,
  RegisterScreen,
  ResetPasswordScreen,
  AuthLoadingScreen
} from "./src/screens";

import { FIREBASE_CONFIG } from './src/core/config'

const Stack = createStackNavigator();
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}

export default function App() {
  return (
    <Provider theme={theme}>
      <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="AuthLoadingScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="AuthLoadingScreen"
              component={AuthLoadingScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="cam" component={Cam} />
            <Stack.Screen name="pred" component={Pred} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
}
