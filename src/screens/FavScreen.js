import React, { useState } from "react";
import {
  CheckBox,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import firebase from "firebase/app";
import AsyncStorage from "@react-native-community/async-storage";

export default function FavScreen() {
  const [isSelected1, setSelection1] = useState(false);
  const [isSelected2, setSelection2] = useState(false);
  const [isSelected3, setSelection3] = useState(false);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.box}>
          <CheckBox
            value={isSelected1}
            onValueChange={setSelection1}
            style={styles.checkbox}
          />
          <Text>Apple</Text>
        </View>
        <View style={styles.box}>
          <CheckBox
            value={isSelected2}
            onValueChange={setSelection2}
            style={styles.checkbox}
          />
          <Text>Corn</Text>
        </View>
        <View style={styles.box}>
          <CheckBox
            value={isSelected3}
            onValueChange={setSelection3}
            style={styles.checkbox}
          />
          <Text>Potato</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2,
  },

  checkbox: {
    alignSelf: "center",
  },
  box: {
    margin: 2,
    width: Dimensions.get("window").width / 2 - 6,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
});
