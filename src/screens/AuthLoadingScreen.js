import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import Background from "../components/Background";
import { theme } from "../core/theme";
import auth from "@react-native-firebase/auth";

export default function AuthLoadingScreen({ navigation }) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is logged in

        console.log("Entering Home Screen becaue logged in")

      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {

        console.log("Entering Login Screen becaue logged out")

      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
