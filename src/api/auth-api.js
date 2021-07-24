import React, { createContext, useState } from "react";
import auth from "@react-native-firebase/auth";
import firebase, { storage } from "firebase/app";
import "firebase/auth";
// import firestore from "firebase/firestore";

import AsyncStorage from "@react-native-community/async-storage";
import { USER_STORAGE } from "../helpers/globalvariables";

// import storage from "@react-native-firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
            user_image: ""
            // posts: { title: "", description: "", photo: "" },
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

export const uploadImageToCloud = async (uri, type, path) => {
  try {
    // console.log("UPLOAD IMAGE RUNS!!!!")

    console.log("TYPE: ", type);

    // const extension = uri.split("/")[1];
    const extension = uri.substring(uri.lastIndexOf(".") + 1);

    console.log("EXTENSION: ", extension);

    const path_to_img =
      path || `/plant-app-database/images/${uuidv4()}.${extension}`;

    console.log("PATH TO IMAGE: ", path_to_img);

    // console.log("STORAGE.REF ", storage().ref(path_to_img));

    const storageRef = firebase.storage().ref();
    console.log("STORAGE REF: ", storageRef);
    const fileRef = storageRef.child(path_to_img);

    const response = await fetch(uri);
    const blob = await response.blob();

    await fileRef.put(blob)
        console.log("UPLOADED");
    
    
    const url = await firebase.storage().ref(path_to_img).getDownloadURL()
    console.log("URL: ", url);



    // const reference = await storage().ref(path_to_img).putFile(uri);

    // firebase
    //   .storage()
    //   .ref(path_to_img)
    //   .putFile(uri)
    //   .then((reference) => {
    //     console.log("UPLOADED");
    //   })
    //   .catch((e) => {
    //     console.log("ERROR ", e);
    //   });

    // await reference.putFile(uri);

    // console.log("REFERENCE: ", reference);

    // const url = await storage().ref(path_to_img).getDownloadURL();

    return { success: true, path: path_to_img, url };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export const getPosts = async () => {
  try {
    const querySnapshot = await firebase.firestore().collection("posts").get();
    if (querySnapshot && querySnapshot.size > 0) {
      return {
        data: querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })),
      };
    }
    return data;
  } catch (error) {
    console.error(error);
    return {error };
  }
};
