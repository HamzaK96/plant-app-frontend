import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import firebase from "firebase/app";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

export default function ProfileScreen() {
  const [user_img, setUserImg] = useState("");
  const [user_name, setUserName] = useState("Your Name");
  const [user_phone, setUserPhone] = useState("Your Phone Number i.e +1234567");
  const [user_location, setUserLocation] = useState(
    "Your Location i.e Lahore, Pakistan"
  );
  const [user_email, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  //   alert(user_img);

  useEffect(() => {
    const updateUserProfile = async () => {
      await AsyncStorage.getItem("USER_STORAGE").then((user_id) => {
        var docRef = firebase.firestore().collection("users").doc(user_id);

        // console.log("ENTERS USEEFFECT");
        // console.log("user_name useffect: ", user_name);

        docRef.get().then((doc) => {
          if (doc.exists) {
            setUserName(doc.data()["user_name"]);
            setUserEmail(doc.data()["user_email"]);
            setUserPhone(doc.data()["user_phone"]);
            setUserLocation(doc.data()["user_location"]);
            setUserImg(doc.data()["user_image"]);
          }
        });
      });

      //   console.log("LOADING: ", loading);
      setLoading(false);
      //   console.log("LOADING: ", loading);
    };

    if (isFocused) {
      updateUserProfile();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 15,
          }}
        >
          {user_img != "" ? (
            <Avatar.Image
              // source={require("../assets/images/default-user.png")}
              source={{ uri: user_img }}
              size={100}
            />
          ) : (
            <Avatar.Image
              source={require("../assets/images/default-user.png")}
              size={100}
            />
          )}
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginBottom: 5,
                },
              ]}
            >
              {/* Hamza Khawaja */}
              {user_name}
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialIcons name="location-on" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            {user_location}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="phone" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user_phone}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="email" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>{user_email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
