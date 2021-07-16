import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ProfileScreen() {
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
          <Avatar.Image
            source={require("../assets/images/default-user.png")}
            size={100}
          />
          <View style={{ marginLeft: 20 }}>
            <Title
              style={[
                styles.title,
                {
                  marginBottom: 5,
                },
              ]}
            >
              Hamza Khawaja
            </Title>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <MaterialIcons name="location-on" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Lahore, Pakistan
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="phone" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +92 333 4522434
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons name="email" size={24} color="white" />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            khawajahamza08@gmail.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Title>100</Title>
          <Caption>Posts</Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>12</Title>
          <Caption>Points</Caption>
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
