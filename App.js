import React, { Component } from "react";
import * as SplashScreen from "expo-splash-screen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase/app'
import 'firebase/auth'
import { theme } from './src/core/theme'
import {
    LoginScreen,
    Pred,
    Cam,
  } from './src/screens'

import { FIREBASE_CONFIG } from './src/core/config'

const Stack = createStackNavigator()
if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG)
}
  
export default function App() {
    return (
      <Provider theme={theme}>
          <ActionSheetProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              name="cam"
              component={Cam}
            />
            <Stack.Screen
              name="pred"
              component={Pred}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </ActionSheetProvider>
      </Provider>
    )
}
  

// class HelloWorldApp extends Component {
//   componentDidMount() {
//     SplashScreen.hideAsync();
//   }
//   render() {
//     return (
//       <ActionSheetProvider>
//         <Navigator />
//       </ActionSheetProvider>
//     );
//   }
// }

// export default HelloWorldApp;
