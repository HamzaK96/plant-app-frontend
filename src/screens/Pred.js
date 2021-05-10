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
class Pred extends Component {
  constructor(props) {
    super(props);
    this.state = {
        image: props.route.params.img,
        pred: props.route.params.pred,
        crop: props.route.params.pred['disease'].split(" ")[0],
        diag: props.route.params.pred['disease'],
        healthy: false,

        data: [
            {title: "Cause", content: props.route.params.pred['cause']},
            {title: "Symptoms", content: props.route.params.pred['symptoms']},
            {title: "Treatment", content: props.route.params.pred['management']},
            {title: "More Information", content: props.route.params.pred['comments']},
        ],
      images: []
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
    // console.log("Crop: ", this.state.crop)
    // console.log("Diag: ", this.state.diag)
    // console.log("Data: ", this.state.data)
    // console.log("Data: ", this.state.pred)

    if (this.state.diag.split(" ")[1] === "healthy") {
      this.setState({
        healthy: true,
        diag: "Healthy",
      });
    }
    this.getPath(this.state.pred);
  }

  getPath(diag) {
    // if (diag === "Apple___Apple_Scab") {
    //console.log("Diag disease: ", diag['disease'])
    if (diag['disease'] == "Apple Apple scab") {
        //console.log("Hello getpath")
      let img1 = require("../assets/cropimg/Apple___Apple_Scab/1.jpg");
      let img2 = require("../assets/cropimg/Apple___Apple_Scab/2.jpg");
      let img3 = require("../assets/cropimg/Apple___Apple_Scab/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Apple Black rot") {
      img1 = require("../assets/cropimg/Apple___Black_rot/1.jpg");
      img2 = require("../assets/cropimg/Apple___Black_rot/2.jpg");
      img3 = require("../assets/cropimg/Apple___Black_rot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Apple Cedar apple rust") {
      img1 = require("../assets/cropimg/Apple___Cedar_apple_rust/1.jpg");
      img2 = require("../assets/cropimg/Apple___Cedar_apple_rust/2.jpg");
      img3 = require("../assets/cropimg/Apple___Cedar_apple_rust/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Corn (maize) Cercospora leaf spot Gray leaf spot") {
      img1 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Cercospora_Gray_leaf_spot/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Corn (maize) Common rust") {
      img1 = require("../assets/cropimg/Corn_(maize)___Common_rust_/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Common_rust_/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Common_rust_/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Corn (maize) Northern Leaf Blight") {
      img1 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/1.jpg");
      img2 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/2.jpg");
      img3 = require("../assets/cropimg/Corn_(maize)___Northern_Leaf_Blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Potato Early blight") {
      img1 = require("../assets/cropimg/Potato___Early_blight/1.jpg");
      img2 = require("../assets/cropimg/Potato___Early_blight/2.jpg");
      img3 = require("../assets/cropimg/Potato___Early_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
    if (diag['disease'] === "Potato Late blight") {
      img1 = require("../assets/cropimg/Potato___Late_blight/1.jpg");
      img2 = require("../assets/cropimg/Potato___Late_blight/2.jpg");
      img3 = require("../assets/cropimg/Potato___Late_blight/3.jpg");
      this.setState({
        images: [...this.state.images, img1, img2, img3],
      });
    }
  }

  //   _renderHeader = (item, expanded) => {
  //     return (
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           paddingLeft: imageWidth / 30,
  //           paddingRight: imageWidth / 30,
  //           paddingTop: imageHeight / 50,
  //           paddingBottom: imageHeight / 50,
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //           backgroundColor: "#F1F0F0",
  //         }}
  //       >
  //         <Text
  //           style={{
  //             fontWeight: "600",
  //             fontSize: imageWidth / 20,
  //             fontFamily: "sans-serif-medium",
  //             color: "#5F5F5F",
  //           }}
  //         >
  //           {" "}
  //           {item.title}
  //         </Text>
  //         {expanded ? (
  //           <Icon style={{ fontSize: 24 }} name="ios-arrow-dropup" />
  //         ) : (
  //           <Icon style={{ fontSize: 24 }} name="ios-arrow-dropdown" />
  //         )}
  //       </View>
  //     );
  //   };

  //   _renderContent = (item) => {
  //     console.log("Inside render content");
  //     var data = item.content.trim().split("\u2022").join("").split("\n ");
  //     console.log("Data:", data);
  //     var list = [];

  //     for (var i = 0; i < data.length; i++) {
  //       list.push({ key: data[i].trim() });
  //     }

  //     return (
  //       <FlatList
  //         data={list}
  //         renderItem={({ item }) => (
  //           <View
  //             style={{
  //               flexDirection: "column",
  //               alignItems: "flex-start",
  //               backgroundColor: "#DEDDDD",
  //               paddingLeft: imageWidth / 50,
  //               paddingRight: imageWidth / 25,
  //               paddingTop: imageHeight / 120,
  //               paddingBottom: imageHeight / 120,
  //               justifyContent: "space-between",
  //             }}
  //           >
  //             <View
  //               style={{
  //                 flexDirection: "row",
  //                 alignItems: "flex-start",
  //                 flexWrap: "wrap",
  //                 flex: 1,
  //               }}
  //             >
  //               <View style={{ width: imageWidth / 30, alignItems: "center" }}>
  //                 <Text style={{ fontWeight: "600", fontSize: 20 }}>
  //                   {"\u2022" + " "}
  //                 </Text>
  //               </View>
  //               <View style={{ flex: 1 }}>
  //                 <Text>
  //                   <Text
  //                     style={{
  //                       fontSize: imageWidth / 25,
  //                       fontFamily: "sans-serif-medium",
  //                     }}
  //                   >
  //                     {item.key}
  //                   </Text>
  //                 </Text>
  //               </View>
  //             </View>
  //           </View>
  //         )}
  //       />

  //       // <Text
  //       //   style={{

  //       //   }}
  //       // >
  //       //   {item.content}
  //       // </Text>
  //     );
  //   }

  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#F1F0F0",
        }}
      >
        <Text
          style={{
            fontWeight: "600",
            fontSize: imageHeight / 35,
            fontFamily: "sans-serif-medium",
            color: "#5F5F5F",
          }}
        >
          {" "}
          {item.title}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 18 }} name="remove-circle" />
        ) : (
          <Icon style={{ fontSize: 18 }} name="add-circle" />
        )}
      </View>
    );
  }

  _renderContent = (item) => (
    <Text
      style={{
        backgroundColor: "#DEDDDD",
        padding: 10,
        fontSize: imageHeight / 38,
        fontFamily: "sans-serif-medium",
      }}
    >
      {item.content}
    </Text>
  );

  render() {
    // console.log("Health? ", this.state.healthy);
    // console.log("Data", this.state.data);
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
                  expanded={[0]}
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
    backgroundColor: "white",
  },
});

export default Pred;
