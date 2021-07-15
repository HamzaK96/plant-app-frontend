import React, { Component } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";

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
  AuthLoadingScreen,
} from "./src/screens";

import { FIREBASE_CONFIG } from "./src/core/config";
import { Icon } from "native-base";

import { DrawerContent } from "./src/screens/DrawerContent";

const Stack = createStackNavigator();
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#242424",
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center", //if style using flexbox
      },
    }}
  >
    <HomeStack.Screen
      name="cam"
      component={Cam}
      options={{
        title: "Home",
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            size={25}
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Ionicons>
        ),
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#242424",
      },
      headerTitleStyle: {
        textAlign: "center",
        alignSelf: "center", //if style using flexbox
      },
    }}
  >
    <DetailsStack.Screen
      name="cam"
      component={Cam}
      options={{
        title: "Home",
        headerLeft: () => (
          <Ionicons
            name="ios-menu"
            size={25}
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          ></Ionicons>
        ),
      }}
    />
  </DetailsStack.Navigator>
);

function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent = {props => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
      <Drawer.Screen name="DetailsDrawer" component={DetailsStackScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider theme={theme}>
      <ActionSheetProvider>
        <NavigationContainer>
          {/* <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeStackScreen} />
            <Drawer.Screen name="Details" component={DetailsStackScreen} />
          </Drawer.Navigator> */}
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
            <Stack.Screen name="Home" component={DrawerRoutes} />
            {/* <Stack.Screen name="pred" component={Pred} /> */}
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
