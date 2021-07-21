import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firebase from "firebase/app";
import "firebase/auth";
// import firestore from "firebase/firestore";

import AsyncStorage from "@react-native-community/async-storage";
import { USER_STORAGE } from "../helpers/globalvariables";

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signUpUser = async ({ name, email, password }) => {
  //    const [user, setUser] = useState(null);

  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        return firebase
          .firestore()
          .collection("users")
          .doc(cred.uid)
          .set({
            user_name: name,
            user_email: email,
            user_password: password,
            user_bio: "",
            user_phone: "",
            user_location: "",
            doc_id: cred.uid,
            posts: { title: "", description: "", photo: "" },
          });
      });
    //console.log("user:", user)
    // console.log("user", user);
    // const docSnapshot = await firebase.firestore().collection("users").add({
    //   email,
    //   name,
    //   uid: user.uid
    // });

    // firebase.auth().currentUser.updateProfile({
    //   displayName: name,
    // })

    //setUser(user);

    return { user };
  } catch (error) {
    console.log({ error });
    return {
      error: error.message,
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return { user };
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const sendEmailWithPassword = async (email) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export const saveData = async (uid) => {
  //   console.log("saving data...");
  try {
    await AsyncStorage.setItem("USER_STORAGE", uid);
    // console.log("UID: ", uid);
    alert("Data successfully saved");
  } catch (e) {
    alert("Failed to save the data to the storage");
  }
};

export const readData = async () => {
  //   console.log("reading data...");
  try {
    await AsyncStorage.getItem("USER_STORAGE").then((user_id) => {
      console.log("USER_ID: ", user_id);
      return user_id;
    });
  } catch (e) {
    alert("Failed to fetch the data from storage");
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem("USER_STORAGE");
    alert("Storage successfully cleared!");
  } catch (e) {
    alert("Failed to clear the async storage.");
  }
};
