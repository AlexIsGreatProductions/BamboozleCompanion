import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const letters = [
	['A','B','C','D','E','F'],
	['G','H','I','J','K',' '],
	['L','M','N','O','P',' '],
	['Q','R','S','T','U',' '],
	['V','W','X','Y','Z',' ']
]

export default class GenerateLettersComponent extends Component {

	constructor() {
		super();
		this.state = {
			newLetters: []
		}
	}

	static defaultProps = {
	};

    componentDidMount(){
    	this.generateLetters();
	}

	generateLetters(){
		let temp = [];
		for (let i=0; i<5; i++){
			let randNum = Math.round(Math.random() * 5);
			temp.push(letters[i][randNum]);
		}
		console.log(temp);
		this.setState({newLetters: temp})
	}

	goToTimer(){
		const {navigate} = this.props.navigation;
		navigate('Timer', {letters: this.state.newLetters})  //goes to Timer
	}



	render() {
		return (
			<View style={styles.bodyContainer}>
				<Text style={styles.textStyle}>Letters are ready!</Text>
				<TouchableOpacity onPress={() => this.goToTimer()}>
					<Text style={styles.button}>Start Round</Text>
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