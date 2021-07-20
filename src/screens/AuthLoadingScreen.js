import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import Background from "../components/Background";
import { theme } from "../core/theme";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../api/auth-api";

export default function AuthLoadingScreen({ navigation }) {

    //  const [user, setUser] = useContext(AuthContext);

    // console.log("user:", user);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in

        console.log("user: ", user);

        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      } else {
        console.log("Entering Login Screen becaue logged out");

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
