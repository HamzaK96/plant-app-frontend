import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

// import { NavigationContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'

import firebase from "firebase/app";
import "firebase/auth";
import Cam from "./Cam";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import FeedScreen from "./FeedScreen";
import CreatePostScreen from "./CreatePostScreen";
// import {
// //   LoginScreen,
// //   Pred,
//   Cam,
// //   RegisterScreen,
// //   ResetPasswordScreen,
// //   AuthLoadingScreen,
//   ProfileScreen,
//   EditProfileScreen,
// } from "./screens";

// import { FIREBASE_CONFIG } from "./src/core/config";

import { DrawerContent } from "./DrawerContent";
import Pred from "./Pred";

// const Stack = createStackNavigator();
// if (!firebase.apps.length) {
//   firebase.initializeApp(FIREBASE_CONFIG);
// }

const HomeStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FeedStack = createStackNavigator();
const FavouritesStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const LeftButton = ({ navigation }) => {
  return (
    <View style={padding.paddingLeft}>
      <Ionicons
        name="ios-menu"
        size={25}
        color="white"
        onPress={() => {
          navigation.openDrawer();
        }}
      ></Ionicons>
    </View>
  );
};

const RightButton = ({ navigation }) => {
  return (
    <View style={padding.paddingRight}>
      <MaterialCommunityIcons
        name="account-edit"
        size={25}
        color="white"
        onPress={() => navigation.navigate("EditProfile")}
      ></MaterialCommunityIcons>
    </View>
  );
};

const FeedStackScreen = ({ navigation }) => (
  <FeedStack.Navigator
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
    <FeedStack.Screen
      name="FeedScreen"
      component={FeedScreen}
      options={{
        title: "Community Feed",
        headerLeft: () => <LeftButton navigation={navigation} />,
        headerRight: () => (
          <View style={padding.paddingRight}>
            <MaterialIcons
              name="create"
              size={25}
              color="white"
              onPress={() => navigation.navigate("CreatePost")}
            ></MaterialIcons>
          </View>
        ),
      }}
    />

    <FeedStack.Screen
      name="CreatePost"
      component={CreatePostScreen}
      options={{
        title: "Create Post",
      }}
    />
  </FeedStack.Navigator>
);

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
        headerLeft: () => <LeftButton navigation={navigation} />,
      }}
    />
    <HomeStack.Screen
      name="pred"
      component={Pred}
      options={{
        title: "Home",
        headerLeft: () => <LeftButton navigation={navigation} />,
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <ProfileStack.Navigator
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
      
    <ProfileStack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        title: "Profile",
        headerLeft: () => <LeftButton navigation={navigation} />,
        headerRight: () => <RightButton navigation={navigation} />,
      }}
    />

    <ProfileStack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{
        title: "Edit Profile",
      }}
    />
  </ProfileStack.Navigator>
);

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={HomeStackScreen} />
      <Drawer.Screen name="ProfileDrawer" component={ProfileStackScreen} />
      <Drawer.Screen name="FeedDrawer" component={FeedStackScreen} />
      {/* <Drawer.Screen name="FavouritesDrawer" component={FavouritesStackScreen} /> */}
    </Drawer.Navigator>
  );
}

const padding = StyleSheet.create({
  paddingLeft: {
    paddingLeft: 12,
  },
  paddingRight: {
    paddingRight: 12,
  },
});
