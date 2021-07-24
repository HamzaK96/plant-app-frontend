import React, { useContext, useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/app";
import Background from "../components/Background";
import { theme } from "../core/theme";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "../api/auth-api";
import AsyncStorage from "@react-native-community/async-storage";
import { USER_STORAGE } from "../helpers/globalvariables";
// import readData from "../api/auth-api";

export default function AuthLoadingScreen({ navigation }) {
  const [user, setUser] = useState(null);

  let user_id;

  //   useEffect(() => {
  //     user_id = readData();
  //     console.log("USER_ID", user_id)
  //   }, [user_id]);

  AsyncStorage.getItem("USER_STORAGE").then((user_id) => {
    if (user_id != null) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home", params: {user_id: user_id}}],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  });

  //   user_id =  readData();

  //   console.log("api-auth user: ", user);

  //  const [user, setUser] = useContext(AuthContext);

  // console.log("user:", user);

  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is logged in

  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "Home" }],
  //       });
  //     } else {
  //       console.log("Entering Login Screen becaue logged out");

  //       console.log("user authstate: ", user);

  //       // User is not logged in
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: "LoginScreen" }],
  //       });
  //     }
  //   });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
