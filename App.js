import React, { Component } from "react";
import Navigator from "./config/routes"
import { DeviceEventEmitter } from 'react-native';
import { SplashScreen } from 'expo'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'

class HelloWorldApp extends Component {
  componentDidMount(){ 
    SplashScreen.hide()
  }
  render(){
      return (
      	<ActionSheetProvider>
          <Navigator />
        </ActionSheetProvider>
      )
    }
}

export default HelloWorldApp