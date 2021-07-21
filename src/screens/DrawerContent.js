import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { clearStorage, logoutUser } from "../api/auth-api";
import AuthContext from "../api/auth-api";
import { AuthProvider } from "../api/auth-api";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export function DrawerContent(props) {
  //   const { logoutUser } = useContext(AuthContext);

  const onLogoutPressed = async () => {
    const response = await logoutUser();
    clearStorage()
    props.navigation.navigate("LoginScreen");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={require("../assets/images/default-user.png")}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>Hamza Khawaja</Title>
                <Caption style={styles.caption}>
                  khawajahamza08@gmail.com
                </Caption>
              </View>
            </View>
          </View>
        </View>

        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate("HomeDrawer");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="account-circle" color={color} size={size} />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate("ProfileDrawer");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="forum" color={color} size={size} />
            )}
            label="Community Feed"
            onPress={() => {
              props.navigation.navigate("FeedDrawer");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="favorite" color={color} size={size} />
            )}
            label="Favourites"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialIcons name="settings" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => {}}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={onLogoutPressed}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
