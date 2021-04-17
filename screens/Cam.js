import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StatusBar, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Container } from '../components/Container';
import CameraComponent from '../components/Camera/Camera.js'

console.disableYellowBox = true

class Cam extends Component {

	static navigationOptions = {
	    header: null
  };



	render() {
		return (
				<CameraComponent navigation={this.props.navigation}/>
			)
	}
}

export default Cam