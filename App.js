import React, { Component } from "react";
import Navigator from "./config/routes";
import * as SplashScreen from "expo-splash-screen";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
class HelloWorldApp extends Component {
  componentDidMount() {
    SplashScreen.hideAsync();
  }
  render() {
    return (
      <ActionSheetProvider>
        <Navigator />
      </ActionSheetProvider>
    );
  }
}

export default HelloWorldApp;
