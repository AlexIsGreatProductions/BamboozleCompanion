import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet,Text,View, TouchableOpacity, Alert } from 'react-native';
import { Timer } from 'react-native-stopwatch-timer';


export default class CountdownComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			  timerStart: false,
			  totalDuration: this.props.navigation.state.params.Time,
			  timerReset: false,
		};
		this.toggleTimer = this.toggleTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.finishAlert = this.finishAlert.bind(this);
	}

	toggleTimer() {
		this.setState({timerStart: !this.state.timerStart, timerReset: false});
	}

	resetTimer() {
		this.setState({timerStart: false, timerReset: true});
	}

	getFormattedTime(time) {
		this.currentTime = time;
	};

	finishAlert(){
		const {navigate} = this.props.navigation

		Alert.alert('TIMES UP', 'Would you like to proceed to the Score sheet?', [
			{text: 'No', onPress: () => console.log("No Pressed")},
			{text: 'Yes', onPress: () => navigate('Scores')},
		])
	}

	static navigationOptions = {
		title: 'COUNTDOWN SCREEN',
	};

	render() {
		return (
			<View style={styles.bodyContainer}>
				<Text>Team who guesses Letters use this</Text>

				<Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
					reset={this.state.timerReset}
					options={options}
					getTime={this.getFormattedTime}
					handleFinish={this.finishAlert}

				/>

				<TouchableOpacity onPress={this.toggleTimer}>
					<Text style={{fontSize: 30}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.resetTimer}>
					<Text style={{fontSize: 30}}>Reset</Text>
				</TouchableOpacity>

			</View>
		);
	}
}

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
    button: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
    },
    
});