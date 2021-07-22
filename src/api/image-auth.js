import React, { createContext, useState } from "react";
import firebase from "@react-native-firebase/app";
import storage from "@react-native-firebase/storage";
// import firestore from "@react-native-firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

    console.log("URL: ", url);

    return { success: true, path: path_to_img, url };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};
