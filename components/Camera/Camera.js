import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import {
  Button,
  StatusBar,
  TextStyle,
  ActivityIndicator,
  Icon,
  Item,
  Dimensions,
  Platform,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  KeyboardAvoidingView,
  Image,
  ToastAndroid,
  Alert,
} from "react-native";
const axios = require("axios");
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import {
  connectActionSheet,
  ActionSheetOptions,
  ActionSheetProps,
} from "@expo/react-native-action-sheet";
import {
  SimpleLineIcons,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const imageWidth = Dimensions.get("window").width;
const imageHeight = Dimensions.get("window").height;
const DESIRED_RATIO = "16:9";

const icon = () => <SimpleLineIcons name={name} size={24} color="#469B40" />;

class CameraComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: "",
      pred: "",
    };
  }

  async componentWilllMount() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        ToastAndroid.show("Permission Denied!");
      }
    }
  }

  _OpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["Open Camera", "Open Gallery"];
    const cancelButtonIndex = 2;
    const textStyle = {
      fontWeight: "500",
      color: "#469B40",
    };
    const containerStyle = {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    };
    icons = [icon("camera"), icon("picture")];

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        textStyle,
        containerStyle,
        icons,
      },
      (buttonIndex) => {
        this._pickImage(buttonIndex);
      }
    );
  };

  _pickImage = async (index) => {
    if (index === 0) {
      let result = await ImagePicker.launchCameraAsync({
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.cancelled) {
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { width: 256 } }]
        );
        this.setState({ image: resizedPhoto.uri });
      }

      img_type = this.state.image.split(".").pop();
      img_type = "jpg";
      const type_ = "image/" + img_type;
      const name_ = "photo." + img_type;

      const formData = new FormData();
      const photo = {
        uri: this.state.image,
        type: type_,
        name: name_,
      };

      formData.append("file", photo);

      this.setState({ text: "Running Diagnostics..." });
      // console.log(formData)
      const res = await axios
        .post("https://plant-app-backend.herokuapp.com/analyze", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.setState({ pred: response.data["result"] });
          // ToastAndroid.show(String(this.state.pred), ToastAndroid.LONG)
          // console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });

      var temp_img = this.state.image;

      this.setState({ image: null });

      if (this.state.pred != "non") {
        this.props.navigation.navigate("pred", {
          img: temp_img,
          pred: this.state.pred,
        });
      } else {
        ToastAndroid.show("Invalid image. No leaf found!", ToastAndroid.LONG);
      }
    } else if (index === 1) {
      let result = await ImagePicker.launchImageLibraryAsync({
        quality: 1,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.cancelled) {
        const resizedPhoto = await ImageManipulator.manipulateAsync(
          result.uri,
          [{ resize: { width: 256 } }]
        );
        this.setState({ image: resizedPhoto.uri });
      }

      img_type = this.state.image.split(".").pop();
      img_type = "jpg";
      const type_ = "image/" + img_type;
      const name_ = "photo." + img_type;

      const formData = new FormData();
      const photo = {
        uri: this.state.image,
        type: type_,
        name: name_,
      };

      formData.append("file", photo);

      this.setState({ text: "Running Diagnostics..." });
      console.log(formData);
      const res = await axios
        .post("https://soil-sproj.herokuapp.com/analyze", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.setState({ pred: response.data["result"] });
          // ToastAndroid.show(String(this.state.pred), ToastAndroid.LONG)
          // console.log(response);
        })
        .catch(function (err) {
          console.log(err);
        });

      var temp_img = this.state.image;

      this.setState({ image: null });

      if (this.state.pred != "non") {
        this.props.navigation.navigate("pred", {
          img: temp_img,
          pred: this.state.pred,
        });
      } else {
        ToastAndroid.show("Invalid image. No leaf found!", ToastAndroid.LONG);
      }
    }
    // this._pickImage()
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (0) {
      return <View />;
    } else if (0) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <StatusBar backgroundColor="#469B40" />
          <View
            style={{
              height: imageHeight,
              width: imageWidth,
              paddingTop: imageHeight / 35,
              paddingLeft: imageWidth / 30,
              paddingRight: imageWidth / 30,
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                alignItems: "center",
                fontSize: imageWidth / 15,
                fontFamily: "sans-serif-medium",
                color: "#469B40",
              }}
            >
              Plant Doctor
            </Text>
            <Text
              style={{
                fontWeight: "600",
                alignItems: "center",
                fontSize: imageWidth / 20,
                fontFamily: "sans-serif-medium",
                color: "#469B40",
                textAlign: "center",
                paddingTop: imageHeight / 15,
              }}
            >
              Diagnose your crops using images
            </Text>
            <Image
              source={require("../../assets/images/4.png")}
              style={{
                width: imageHeight / 2.8,
                height: imageHeight / 2.8,
                marginTop: imageHeight / 40,
                marginRight: imageWidth / 20,
                marginLeft: imageWidth / 25,
                borderRadius: 5,
                alignSelf: "center",
              }}
            />
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: imageWidth / 24,
                  fontFamily: "sans-serif-medium",
                  fontWeight: "500",
                  textAlign: "center",
                  color: "darkgrey",
                  paddingRight: imageWidth / 30,
                  paddingLeft: imageWidth / 30,
                }}
              >
                Ensure that the image is a top view image of a single leaf as
                shown below.
              </Text>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  paddingTop: imageHeight / 20,
                  paddingBottom: imageHeight / 20,
                }}
              >
                <Image
                  source={require("../../assets/images/1.jpg")}
                  style={{
                    width: imageHeight / 8,
                    height: imageHeight / 8,
                    marginRight: imageWidth / 20,
                    marginLeft: imageWidth / 25,
                    borderRadius: 5,
                  }}
                />
                <Image
                  source={require("../../assets/images/2.jpg")}
                  style={{
                    width: imageHeight / 8,
                    height: imageHeight / 8,
                    marginRight: imageWidth / 20,
                    borderRadius: 5,
                  }}
                />
                <Image
                  source={require("../../assets/images/3.jpg")}
                  style={{
                    width: imageHeight / 8,
                    height: imageHeight / 8,
                    marginRight: imageWidth / 20,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#469B40",
                width: imageWidth * 0.7,
                height: imageHeight / 15,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
                marginVertical: 20,
                alignSelf: "center",
              }}
              onPress={this._OpenActionSheet}
            >
              <Text
                style={{
                  fontWeight: "600",
                  alignItems: "center",
                  fontSize: imageWidth / 20,
                  color: "#FFFFFF",
                  fontFamily: "sans-serif-medium",
                }}
              >
                Diagnose Your Crop{" "}
              </Text>
              <Entypo name="leaf" size={imageWidth / 15} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {this.state.image && (
            <View
              style={{
                height: imageHeight,
                width: imageWidth,
                position: "absolute",
                paddingLeft: 0,
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                backgroundColor: "#469B40",
              }}
            ></View>
          )}
          {this.state.image && (
            <View
              style={{
                height: imageHeight,
                width: imageWidth,
                position: "absolute",
                paddingLeft: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontWeight: "bold",
                  paddingBottom: imageHeight / 40,
                }}
              >
                {this.state.text}
              </Text>
              <ActivityIndicator
                style={{ alignSelf: "center" }}
                color="#FFFFFF"
                size="large"
              />
            </View>
          )}
        </View>
      );
    }
  }
}

export default connectActionSheet(CameraComponent);
