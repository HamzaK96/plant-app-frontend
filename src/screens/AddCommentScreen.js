import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import firebase from "firebase/app";
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
} from "react-native";

import { theme } from "../core/theme";
import { commentValidator } from "../helpers/commentValidator";
export default function AddCommentScreen() {
  const [comment, setComment] = useState({ value: "", error: "" });

  const addComment = async () => {
    const commentError = commentValidator(comment.value);

    if (commentError) {
      setComment({ ...comment, error: commentError });
      alert(commentError);
      return;
    }

    AsyncStorage.getItem("USER_STORAGE").then((user_id) => {
      //   alert(user_id);

      //   setUserID(user_id);

      var docRef = firebase.firestore().collection("users").doc(user_id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            // setUserName(doc.data()["user_name"]);
            // setUserEmail(doc.data()["user_email"]);

            try {
              firebase
                .firestore()
                .collection("comments")
                .add({
                  user_id: user_id,
                  user_name: doc.data()["user_name"],
                  user_email: doc.data()["user_email"],
                  user_comment: comment.value,
                })
                .then(() => {
                  alert("Post Created Successfully!");
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    });
  };

  console.log("COMMENT SCREEN");

  return (
    <View style={styles.container}>
      <View style={styles.action}>
        <MaterialCommunityIcons name="format-title" size={24} color="white" />
        <TextInput
          placeholder="Write Title"
          placeholderTextColor="#666666"
          onChangeText={(text) => setComment({ value: text, error: "" })}
          autoCorrect={false}
          error={!!comment.error}
          style={styles.textInput}
          errorText={comment.error}
        />
      </View>

      <TouchableOpacity style={styles.commandButton} onPress={addComment}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: theme.colors.btn,
    alignItems: "center",
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
