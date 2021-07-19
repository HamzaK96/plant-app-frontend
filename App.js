import React, { Component } from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// import { NavigationContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { theme } from "./src/core/theme";
import {
  LoginScreen,
  //   Pred,
  //   Cam,
  RegisterScreen,
  ResetPasswordScreen,
  AuthLoadingScreen,
  //   ProfileScreen,
  //   EditProfileScreen,
  DrawerRoutes,
} from "./src/screens";

import { FIREBASE_CONFIG } from "./src/core/config";
import { Icon } from "native-base";

import { DrawerContent } from "./src/screens/DrawerContent";

const Stack = createStackNavigator();
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE_CONFIG);
  const db = firebase.firestore();
}

// const HomeStack = createStackNavigator();
// const ProfileStack = createStackNavigator();
// const FeedStack = createStackNavigator();
// const FavouritesStack = createStackNavigator();

// const Drawer = createDrawerNavigator();

// const HomeStackScreen = ({ navigation }) => (
//   <HomeStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: "#242424",
//       },
//       headerTitleStyle: {
//         textAlign: "center",
//         alignSelf: "center", //if style using flexbox
//       },
//     }}
//   >
//     <HomeStack.Screen
//       name="cam"
//       component={Cam}
//       options={{
//         title: "Home",
//         headerLeft: () => (
//           <Ionicons
//             name="ios-menu"
//             size={25}
//             color="white"
//             onPress={() => {
//               navigation.openDrawer();
//             }}
//           ></Ionicons>
//         ),
//       }}
//     />
//   </HomeStack.Navigator>
// );

// const ProfileStackScreen = ({ navigation }) => (
//   <ProfileStack.Navigator
//     screenOptions={{
//       headerStyle: {
//         backgroundColor: "#242424",
//       },
//       headerTitleStyle: {
//         textAlign: "center",
//         alignSelf: "center", //if style using flexbox
//       },
//     }}
//   >
//     <ProfileStack.Screen
//       name="ProfileScreen"
//       component={ProfileScreen}
//       options={{
//         title: "Profile",
//         headerLeft: () => (
//           <Ionicons
//             name="ios-menu"
//             size={25}
//             color="white"
//             onPress={() => {
//               navigation.openDrawer();
//             }}
//           ></Ionicons>
//         ),
//         headerRight: () => (
//           <MaterialCommunityIcons
//             name="account-edit"
//             size={25}
//             color="white"
//             onPress={() => navigation.navigate("EditProfile")}
//           ></MaterialCommunityIcons>
//         ),
//       }}
//     />

//     <ProfileStack.Screen
//       name="EditProfile"
//       component={EditProfileScreen}
//       options={{
//         title: "Edit Profile",
//       }}
//     />
//   </ProfileStack.Navigator>
// );

// function DrawerRoutes() {
//   return (
//     <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
//       <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
//       <Drawer.Screen name="ProfileDrawer" component={ProfileStackScreen} />
//       {/* <Drawer.Screen name="FeedDrawer" component={FeedStackScreen} />
//       <Drawer.Screen name="FavouritesDrawer" component={FavouritesStackScreen} /> */}
//     </Drawer.Navigator>
//   );
// }

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
