import React, { useState } from "react";
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

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "../core/theme";

import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import exampleImageUser from "../assets/images/default-user.png";
import firebase from "firebase/app";

import AsyncStorage from "@react-native-community/async-storage";
import { USER_STORAGE } from "../helpers/globalvariables";
import storage from "@react-native-firebase/storage";
import { uploadImageToCloud } from "../api/auth-api";
import { nameValidator } from "../helpers/nameValidator";

export default function EditProfileScreen({navigation}) {
  const exampleImageUri = Image.resolveAssetSource(exampleImageUser).uri;
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState(exampleImageUri);
  const [user_name_current, setUserName] = useState("");
  const [user_phone_current, setUserPhone] = useState("Your Phone Number i.e 1234567");
  const [user_location_current, setUserLocation] = useState("Your Location i.e Lahore, Punjab, Pakistan");

  const [user_img_url, setURL] = useState("");

  const addToUserDatabase = async () => {


    AsyncStorage.getItem("USER_STORAGE").then((user_id) => {
      //alert(user_id);
      var user_ref = firebase.firestore().collection("users").doc(user_id);
      return user_ref
        .update({
          user_name: user_name_current,
          user_phone: user_phone_current,
          user_location: user_location_current,
          user_image: user_img_url,
        })
        .then(() => {
        //   console.log("Document successfully updated!");
        navigation.navigate("ProfileScreen");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    });
  };

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
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

      const { success, path, url } = await uploadImageToCloud(
        result.uri,
        result.type
      );

      setURL(url);

      console.log("URL: ", url);

      //   console.log(result.uri);
    }
  };

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
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

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>

      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={showImagePicker}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
    </View>
  );

  let bs = React.createRef();
  let fall = new Animated.Value(1);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}
      >
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
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
          <Feather name="user" size={24} color="black" />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            onChangeText={(name) => setUserName(name)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <MaterialIcons name="phone" size={24} color="white" />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            onChangeText={(phone) => setUserPhone(phone)}
            keyboardType="number-pad"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <MaterialIcons name="location-on" size={24} color="white" />
          <TextInput
            placeholder="Location"
            placeholderTextColor="#666666"
            onChangeText={(location) =>
              setUserLocation(location)
            }
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>

        <TouchableOpacity
          style={styles.commandButton}
          onPress={addToUserDatabase}
        >
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
