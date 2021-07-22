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
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { titleValidator } from "../helpers/titleValidator";
import { questionValidator } from "../helpers/questionValidator";
// import TextInput from "../components/TextInput";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import exampleImagePlant from "../assets/images/default-user.png";
import firebase from "firebase/app";
import AsyncStorage from "@react-native-community/async-storage";
import { USER_STORAGE } from "../helpers/globalvariables";
// import { firebase } from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

export default function CreatePostScreen() {
  const exampleImageUri = Image.resolveAssetSource(exampleImagePlant).uri;
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState(exampleImageUri);
  const [title, setTitle] = useState({ value: "", error: "" });
  const [question, setQuestion] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [user_id_current, setUserID] = useState("");
  const [user_name_current, setUserName] = useState("");
  const [user_email_current, setUserEmail] = useState("");

  savePost = async () => {
    const titleError = titleValidator(title.value);
    const questionError = questionValidator(question.value);

    if (titleError) {
      setTitle({ ...title, error: titleError });
      alert(titleError);
      return;
    }

    if (questionError) {
      setQuestion({ ...question, error: questionError });
      alert(questionError);
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
                .collection("posts")
                .add({
                  user_id: user_id,
                  user_name: doc.data()["user_name"],
                  user_email: doc.data()["user_email"],
                  post_title: title.value,
                  post_question: question.value,
                  // post_image: pickedimgurl,
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

    // console.log("USER_ID_POST: ", user_id_current);

    setLoading(true);

    // try {
    //   await firebase.firestore().collection("posts").add({
    //     user_id: user_id_current,
    //     user_name: user_name_current,
    //     user_email: user_email_current,
    //     post_title: title.value,
    //     post_question: question.value,
    //     // post_image: pickedimgurl,
    //   });

    //   alert("Post Created Successfully!");
    // } catch (error) {
    //   console.log(error);
    // }

    setLoading(false);
  };

  showImagePicker = async () => {
    const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //console.log("Camera Permission Granted")
    // console.log("Status:", status)

    // if (status !== "granted") {
    //     alert("You've refused to allow this appp to access your gallery!");
    //     return;
    // }

    // console.log("Status:", status)

    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);

      //   const { success, path, url } = await uploadImageToCloud(response.uri, response.type, logoPath)
      //   if (success) { setPickedImageURL(path) }
    }
  };

  // This function is triggered when the "Open camera" button pressed
  openCamera = async () => {
    console.log("Camera Accessed");

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    console.log("Permission:", permissionResult);

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };

  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Plant Picture</Text>
      </View>

      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pickedImagePath !== "" && (
                <ImageBackground
                  source={{
                    uri: pickedImagePath,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialIcons
                      name="photo-camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons name="format-title" size={24} color="white" />
          <TextInput
            placeholder="Write Title"
            placeholderTextColor="#666666"
            onChangeText={(text) => setTitle({ value: text, error: "" })}
            autoCorrect={false}
            error={!!title.error}
            style={styles.textInput}
            errorText={title.error}
          />
        </View>

        <View style={styles.action}>
          <MaterialCommunityIcons
            name="head-question"
            size={24}
            color="white"
          />
          <TextInput
            placeholder="What is your issue?"
            placeholderTextColor="#666666"
            autoCorrect={false}
            onChangeText={(text) => setQuestion({ value: text, error: "" })}
            style={styles.textInput}
            error={!!question.error}
            errorText={question.error}
          />
        </View>

        <TouchableOpacity style={styles.commandButton} onPress={savePost}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </Animated.View>
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
