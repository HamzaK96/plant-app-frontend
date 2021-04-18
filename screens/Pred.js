import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  Button,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  ToastAndroid,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from "react-native";
// import { Container } from '../components/Container';

import {
  Container,
  Header,
  Content,
  Accordion,
  SimpleLineIcons,
  Icon,
} from "native-base";
import { SliderBox } from "react-native-image-slider-box";

console.disableYellowBox = true;
const imageWidth = Dimensions.get("window").width;
const imageHeight = Dimensions.get("window").height;

const causes = require("../assets/data/Causes.json");
const treatment = require("../assets/data/Treatment.json");
const symptoms = require("../assets/data/Symptoms.json");
const comments = require("../assets/data/Comments.json");

class Pred extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.navigation.getParam("img"),
      pred: this.props.navigation.getParam("pred"),
      crop: this.props.navigation
        .getParam("pred")
        .split("___")[0]
        .split("_")
        .join(" "),
      diag: this.props.navigation
        .getParam("pred")
        .split("___")[1]
        .split("_")
        .join(" "),

      // image: "blah",
      // pred: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
      // crop: "Tomato",
      // diag: "Cedar_apple_rust",
      healthy: false,

      data: [
        { title: "Cause", content: "Lorem ipsum dolor sit amet" },
        { title: "Symptoms", content: "Lorem ipsum dolor sit amet" },
        { title: "Treatment", content: "Lorem ipsum dolor sit amet" },
        { title: "More information", content: "Lorem ipsum dolor sit amet" },
      ],

      images: [],
    };
  }

  static navigationOptions = {
    title: "Crop Diagnosis",
    headerStyle: {
      backgroundColor: "#469B40",
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold",
      paddingLeft: imageWidth / 6,
      flex: 1,
    },
    headerForceInset: { top: "never", bottom: "never" },
  };

  componentDidMount() {
    console.log("Pred:", this.state.pred);

    if (this.state.diag === "healthy") {
      this.setState({
        healthy: true,
        diag: "Healthy",
      });
    } else {
      for (var i = this.state.data.length - 1; i >= 0; i--) {
        if (this.state.data[i]["title"] === "Cause") {
          this.state.data[i]["content"] = causes[this.state.pred];
        } else if (this.state.data[i]["title"] === "Symptoms") {
          this.state.data[i]["content"] = symptoms[this.state.pred];
        } else if (this.state.data[i]["title"] === "Treatment") {
          this.state.data[i]["content"] = treatment[this.state.pred];
        } else if (this.state.data[i]["title"] === "More information") {
          this.state.data[i]["content"] = comments[this.state.pred];
        }
      }
    }
    this.getPath(this.state.pred);
  }

  getPath(diag) {
    if (diag === "Apple___Apple_Scab") {
      img1 = require("../assets/cropimg/Apple___Apple_Scab/1.jpg");
      img2 = require("../assets/cropimg/Apple___Apple_Scab/2.jpg");
      img3 = require("../assets/cropimg/Apple___Apple_Scab/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Apple___Black_rot") {
      img1 = require("../assets/cropimg/Apple___Black_rot/1.jpg");
      img2 = require("../assets/cropimg/Apple___Black_rot/2.jpg");
      img3 = require("../assets/cropimg/Apple___Black_rot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Apple___Cedar_apple_rust") {
      img1 = require("../assets/cropimg/Apple___Cedar_apple_rust/1.jpg");
      img2 = require("../assets/cropimg/Apple___Cedar_apple_rust/2.jpg");
      img3 = require("../assets/cropimg/Apple___Cedar_apple_rust/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Cherry_(including_sour)___Powdery_mildew") {
      img1 = require("../assets/cropimg/Cherry_(including_sour)___Powdery_mildew/1.jpg");
      img2 = require("../assets/cropimg/Cherry_(including_sour)___Powdery_mildew/2.jpg");
      img3 = require("../assets/cropimg/Cherry_(including_sour)___Powdery_mildew/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Corn_(maize)___Cercospora_Gray_leaf_spot") {
      img1 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Corn_(maize)___Common_rust_") {
      img1 = require("../assets/cropimg/Corn_(maize)___Common_rust_/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Common_rust_/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Common_rust_/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Corn_(maize)___Northern_Leaf_Blight") {
      img1 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Grape___Esca_(Black_Measles)") {
      img1 = require("../assets/cropimg/Grape___Esca_(Black_Measles)/1.jpg");
      img2 = require("../assets/cropimg/Grape___Esca_(Black_Measles)/2.jpg");
      img3 = require("../assets/cropimg/Grape___Esca_(Black_Measles)/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)") {
      img1 = require("../assets/cropimg/Grape___Leaf_blight_(Isariopsis_Leaf_Spot)/1.jpg");
      img2 = require("../assets/cropimg/Grape___Leaf_blight_(Isariopsis_Leaf_Spot)/2.jpg");
      img3 = require("../assets/cropimg/Grape___Leaf_blight_(Isariopsis_Leaf_Spot)/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Grape___Black_rot") {
      img1 = require("../assets/cropimg/Grape___Black_rot/1.jpg");
      img2 = require("../assets/cropimg/Grape___Black_rot/2.jpg");
      img3 = require("../assets/cropimg/Grape___Black_rot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Orange___Haunglongbing_(Citrus_greening)") {
      img1 = require("../assets/cropimg/Orange___Haunglongbing_(Citrus_greening)/1.jpg");
      img2 = require("../assets/cropimg/Orange___Haunglongbing_(Citrus_greening)/2.jpg");
      img3 = require("../assets/cropimg/Orange___Haunglongbing_(Citrus_greening)/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Peach___Bacterial_spot") {
      img1 = require("../assets/cropimg/Peach___Bacterial_spot/1.jpg");
      img2 = require("../assets/cropimg/Peach___Bacterial_spot/2.jpg");
      img3 = require("../assets/cropimg/Peach___Bacterial_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Pepper_bell___Bacterial_spot") {
      img1 = require("../assets/cropimg/Pepper_bell___Bacterial_spot/1.jpg");
      img2 = require("../assets/cropimg/Pepper_bell___Bacterial_spot/2.jpg");
      img3 = require("../assets/cropimg/Pepper_bell___Bacterial_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Potato___Early_blight") {
      img1 = require("../assets/cropimg/Potato___Early_blight/1.jpg");
      img2 = require("../assets/cropimg/Potato___Early_blight/2.jpg");
      img3 = require("../assets/cropimg/Potato___Early_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Potato___Late_blight") {
      img1 = require("../assets/cropimg/Potato___Late_blight/1.jpg");
      img2 = require("../assets/cropimg/Potato___Late_blight/2.jpg");
      img3 = require("../assets/cropimg/Potato___Late_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Squash___Powdery_mildew") {
      img1 = require("../assets/cropimg/Squash___Powdery_mildew/1.jpg");
      img2 = require("../assets/cropimg/Squash___Powdery_mildew/2.jpg");
      img3 = require("../assets/cropimg/Squash___Powdery_mildew/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Strawberry___Leaf_scorch") {
      img1 = require("../assets/cropimg/Strawberry___Leaf_scorch/1.jpg");
      img2 = require("../assets/cropimg/Strawberry___Leaf_scorch/2.jpg");
      img3 = require("../assets/cropimg/Strawberry___Leaf_scorch/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Early_blight") {
      img1 = require("../assets/cropimg/Tomato___Early_blight/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Early_blight/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Early_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Leaf_Mold") {
      img1 = require("../assets/cropimg/Tomato___Leaf_Mold/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Leaf_Mold/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Leaf_Mold/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Septoria_leaf_spot") {
      img1 = require("../assets/cropimg/Tomato___Septoria_leaf_spot/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Septoria_leaf_spot/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Septoria_leaf_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Target_Spot") {
      img1 = require("../assets/cropimg/Tomato___Target_Spot/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Target_Spot/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Target_Spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Bacterial_spot") {
      img1 = require("../assets/cropimg/Tomato___Bacterial_spot/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Bacterial_spot/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Bacterial_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Late_blight") {
      img1 = require("../assets/cropimg/Tomato___Late_blight/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Late_blight/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Late_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Tomato_mosaic_virus") {
      img1 = require("../assets/cropimg/Tomato___Tomato_mosaic_virus/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Tomato_mosaic_virus/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Tomato_mosaic_virus/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Tomato_Yellow_Leaf_Curl_Virus") {
      img1 = require("../assets/cropimg/Tomato___Tomato_Yellow_Leaf_Curl_Virus/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Tomato_Yellow_Leaf_Curl_Virus/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Tomato_Yellow_Leaf_Curl_Virus/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___Two-spotted_spider_mite") {
      img1 = require("../assets/cropimg/Tomato___Two-spotted_spider_mite/1.jpg");
      img2 = require("../assets/cropimg/Tomato___Two-spotted_spider_mite/2.jpg");
      img3 = require("../assets/cropimg/Tomato___Two-spotted_spider_mite/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }

    if (diag === "Strawberry___healthy") {
      img1 = require("../assets/cropimg/Strawberry___healthy/1.jpg");
      img2 = require("../assets/cropimg/Strawberry___healthy/2.jpg");
      img3 = require("../assets/cropimg/Strawberry___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Blueberry___healthy") {
      img1 = require("../assets/cropimg/Blueberry___healthy/1.jpg");
      img2 = require("../assets/cropimg/Blueberry___healthy/2.jpg");
      img3 = require("../assets/cropimg/Blueberry___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Peach___healthy") {
      img1 = require("../assets/cropimg/Peach___healthy/1.jpg");
      img2 = require("../assets/cropimg/Peach___healthy/2.jpg");
      img3 = require("../assets/cropimg/Peach___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Potato___healthy") {
      img1 = require("../assets/cropimg/Potato___healthy/1.jpg");
      img2 = require("../assets/cropimg/Potato___healthy/2.jpg");
      img3 = require("../assets/cropimg/Potato___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Corn_(maize)___healthy") {
      img1 = require("../assets/cropimg/Corn_(maize)___healthy/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___healthy/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Apple___healthy") {
      img1 = require("../assets/cropimg/Apple___healthy/1.jpg");
      img2 = require("../assets/cropimg/Apple___healthy/2.jpg");
      img3 = require("../assets/cropimg/Apple___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Pepper_bell___healthy") {
      img1 = require("../assets/cropimg/Pepper_bell___healthy/1.jpg");
      img2 = require("../assets/cropimg/Pepper_bell___healthy/2.jpg");
      img3 = require("../assets/cropimg/Pepper_bell___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Raspberry___healthy") {
      img1 = require("../assets/cropimg/Raspberry___healthy/1.jpg");
      img2 = require("../assets/cropimg/Raspberry___healthy/2.jpg");
      img3 = require("../assets/cropimg/Raspberry___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Soybean___healthy") {
      img1 = require("../assets/cropimg/Soybean___healthy/1.jpg");
      img2 = require("../assets/cropimg/Soybean___healthy/2.jpg");
      img3 = require("../assets/cropimg/Soybean___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Grape___healthy") {
      img1 = require("../assets/cropimg/Grape___healthy/1.jpg");
      img2 = require("../assets/cropimg/Grape___healthy/2.jpg");
      img3 = require("../assets/cropimg/Grape___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Tomato___healthy") {
      img1 = require("../assets/cropimg/Tomato___healthy/1.jpg");
      img2 = require("../assets/cropimg/Tomato___healthy/2.jpg");
      img3 = require("../assets/cropimg/Tomato___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag === "Cherry_(including_sour)___healthy") {
      img1 = require("../assets/cropimg/Cherry_(including_sour)___healthy/1.jpg");
      img2 = require("../assets/cropimg/Cherry_(including_sour)___healthy/2.jpg");
      img3 = require("../assets/cropimg/Cherry_(including_sour)___healthy/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
  }

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingLeft: imageWidth / 30,
          paddingRight: imageWidth / 30,
          paddingTop: imageHeight / 50,
          paddingBottom: imageHeight / 50,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F1F0F0",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: imageWidth / 20,
            fontFamily: "sans-serif-medium",
            color: "#5F5F5F",
          }}
        >
          {" "}
          {item.title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 24 }} name="ios-arrow-dropup" />
        ) : (
          <Icon style={{ fontSize: 24 }} name="ios-arrow-dropdown" />
        )}
      </View>
    );
  }

  _renderContent(item) {
    var data = item.content.trim().split("\u2022").join("").split("\n ");

    var list = [];

    for (var i = 0; i < data.length; i++) {
      list.push({ key: data[i].trim() });
    }

    return (
      <FlatList
        data={list}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "#DEDDDD",
              paddingLeft: imageWidth / 50,
              paddingRight: imageWidth / 25,
              paddingTop: imageHeight / 120,
              paddingBottom: imageHeight / 120,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                flexWrap: "wrap",
                flex: 1,
              }}
            >
              <View style={{ width: imageWidth / 30, alignItems: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 20 }}>
                  {"\u2022" + " "}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text>
                  <Text
                    style={{
                      fontSize: imageWidth / 25,
                      fontFamily: "sans-serif-medium",
                    }}
                  >
                    {item.key}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      // <Text
      //   style={{

      //   }}
      // >
      //   {item.content}
      // </Text>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="#469B40" />

        <View
          style={{
            marginLeft: 0,
            borderBottomWidth: 2,
            borderBottomColor: "#469B40",
          }}
        >
          <SliderBox
            images={this.state.images}
            sliderBoxHeight={imageHeight / 4}
            dotColor="#FFFF00"
            inactiveDotColor="#FFFFFF"
            circleLoop
            resizeMode={"cover"}
            imageLoadingColor="#469B40"
            autoplay
            paginationBoxStyle={{
              position: "absolute",
              alignSelf: "center",
              paddingRight: 0,
              paddingLeft: 0,
              paddingTop: 3,
              paddingBottom: 3,
              marginBottom: imageHeight / 4.4,
              marginTop: imageHeight / 30,
              backgroundColor: "#A9A9A9",
              borderRadius: 10,
            }}
            dotStyle={{
              width: 9,
              height: 9,
              borderRadius: 10,
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: imageWidth / 20,
            marginRight: imageWidth / 20,
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Image
              // source={require('./apple.jpeg')}
              source={{ uri: this.state.image }}
              style={{
                width: imageHeight / 5,
                height: imageHeight / 5,
                marginTop: -imageHeight / 20,
                alignSelf: "flex-end",
                borderRadius: 20,
                borderWidth: 2,
                borderColor: "#469B40",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: 0,
                flexGrow: 1,
                paddingRight: imageWidth / 30,
              }}
            >
              <Text
                style={{
                  fontWeight: "200",
                  fontSize: imageWidth / 14,
                  fontFamily: "sans-serif-medium",
                  color: "#000000",
                  textAlign: "left",
                  marginTop: imageHeight / 100,
                  paddingBottom: imageHeight / 100,
                }}
              >
                {this.state.crop}
              </Text>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: imageWidth / 22,
                  fontFamily: "sans-serif-medium",
                  color: "#838383",
                  textAlign: "left",
                  flexShrink: 1,
                  // flexWrap: 'wrap'
                  // marginTop: imageHeight/10,
                }}
              >
                {this.state.diag}
              </Text>
            </View>
          </View>

          {!this.state.healthy && (
            <Container style={styles.container}>
              <Content>
                <Accordion
                  dataArray={this.state.data}
                  animation={true}
                  renderContent={this._renderContent}
                  renderHeader={this._renderHeader}
                  icon="add"
                  expandedIcon="remove"
                />
              </Content>
            </Container>
          )}
          {this.state.healthy && (
            <Image
              source={require("../assets/images/healthy.png")}
              style={{
                width: "60%",
                height: undefined,
                marginTop: imageHeight / 25,
                alignSelf: "center",
                aspectRatio: 733 / 999,
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: imageHeight / 15,
    textAlign: "center",
  },
});

export default Pred;
