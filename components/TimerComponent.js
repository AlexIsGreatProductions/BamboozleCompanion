import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight, Alert } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class TimerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			  timerStart: false,
			  stopwatchStart: false,
			  totalDuration: 90000,
			  timerReset: false,
			  stopwatchReset: false,
		};
		this.toggleTimer = this.toggleTimer.bind(this);
		this.resetTimer = this.resetTimer.bind(this);
		this.toggleStopwatch = this.toggleStopwatch.bind(this);
		this.resetStopwatch = this.resetStopwatch.bind(this);
	}

	toggleStopwatch() {
		this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
	}

	resetStopwatch() {
		this.setState({stopwatchStart: false, stopwatchReset: true});
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

	getTime(time){
		return time;
	}

	static navigationOptions = {
		title: 'TIMER SCREEN',
	};

	goToScore(){
		const {params} = this.props.navigation.state;
		const {navigate} = this.props.navigation;
		navigate("Scores", {
			keepScore: params.keepScore,
			score: params.score,
			round: params.round,
			letters: params.letters
		});
	}

	render() {
		const {navigate} = this.props.navigation;
		return (
			<View>

				<Text>Team who Has letters use this</Text>

				<Stopwatch laps msecs start={this.state.stopwatchStart}
					reset={this.state.stopwatchReset}
					options={options}
					getTime={this.getFormattedTime} />

				<TouchableHighlight onPress={this.toggleStopwatch}>
					<Text style={{fontSize: 30}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={this.resetStopwatch}>
					<Text style={{fontSize: 30}}>Reset</Text>
				</TouchableHighlight>



				<Text>Team who guesses Letters use this</Text>

				<Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
					reset={this.state.timerReset}
					options={options}
					getTime={this.getFormattedTime}
					handleFinish={
						Alert.alert('TIMES UP', 'Would you like to proceed to the Score sheet?', [
							{text: 'No', onPress: () => console.log("No Pressed")},
							{text: 'Yes', onPress: () => navigate('Scores')},
						])
					}

				/>

				<TouchableHighlight onPress={this.toggleTimer}>
					<Text style={{fontSize: 30}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
				</TouchableHighlight>

				<TouchableHighlight onPress={this.resetTimer}>
					<Text style={{fontSize: 30}}>Reset</Text>
				</TouchableHighlight>

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
