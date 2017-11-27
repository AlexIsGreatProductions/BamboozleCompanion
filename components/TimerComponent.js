import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';

var seconds = 0;
export default class TimerComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			  stopwatchStart: false,
			  stopwatchReset: false,
			  totalTime: this.totalTime,
		};
		this.toggleStopwatch = this.toggleStopwatch.bind(this);
		this.resetStopwatch = this.resetStopwatch.bind(this);
		this.getFormattedTime = this.getFormattedTime.bind(this);
	}

	toggleStopwatch() {
		this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
	}

	resetStopwatch() {
		this.setState({stopwatchStart: false, stopwatchReset: true});
	}

	getFormattedTime(time) {
		this.currentTime = time;

		let a = time.split(':');
		seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]) * 1000 + (+a[3]); 


	};


	async gotoCountdown(){
		 await this.setState({totalTime: seconds});
		const {navigate} = this.props.navigation;
		navigate('Countdown', {Time: this.state.totalTime})  //goes to Countdown
	}


	static navigationOptions = {
		title: 'TIMER SCREEN',
	};

	render() {
		return (
			<View style={styles.bodyContainer}>

				<Text>Team who Has letters use this</Text>

				<Stopwatch laps msecs start={this.state.stopwatchStart}
					reset={this.state.stopwatchReset}
					options={options}
					getTime={this.getFormattedTime} />

				<TouchableOpacity onPress={this.toggleStopwatch}>
					<Text style={{fontSize: 30}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={this.resetStopwatch}>
					<Text style={{fontSize: 30}}>Reset</Text>
				</TouchableOpacity>


				<TouchableOpacity onPress={() => this.gotoCountdown()}>
					<Text style={styles.button}>FINISH</Text>
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
