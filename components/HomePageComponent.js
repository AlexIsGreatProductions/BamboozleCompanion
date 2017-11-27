import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default class HomePageComponent extends Component {

	constructor() {
		super();
		this.state = {

		}
	}

	static navigationOptions = {
		title: 'HOME SCREEN',
		header: null
	};

	startGame(keepScore){
        const {navigate} = this.props.navigation;
        let score = [[0,0]];  //both teams start a 0 for the first round.
        navigate('Generate', {keepScore: keepScore, score: score})
	}

	render() {		

		return (
			<View style={styles.bodyContainer}>
				<StatusBar 
					hidden={true}
				/>
      
		        <Animatable.Text animation="shake" iterationCount={'infinite'} direction="alternate" style={styles.textStyle}>Bamboozle</Animatable.Text>
		        <TouchableOpacity onPress={() => this.startGame(false)}>
		        	<Text style={styles.button}>PLAY</Text>
		        </TouchableOpacity>
				<TouchableOpacity onPress={() => this.startGame(true)}>
					<Text style={styles.button}>PLAY AND KEEP SCORE</Text>
				</TouchableOpacity>

			</View>
		)

	}
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
  },
  textStyle: {
    color: '#f39c12',
    fontSize: 45,
    top: 20,
    marginBottom: 250,
  },
  button: {
  	fontSize: 25,
  	color: 'white',
  	textAlign: 'center'
   }
});