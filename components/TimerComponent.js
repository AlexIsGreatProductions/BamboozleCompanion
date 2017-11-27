import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity } from 'react-native';
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
		console.log("TOTES: "+this.state.totalTime)

		const {navigate} = this.props.navigation;
		navigate('Countdown', {Time: this.state.totalTime})  //goes to Countdown
		console.log("GO TO COUNTDOWN")
	}


	static navigationOptions = {
		title: 'TIMER SCREEN',
	};

	render() {
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
    
});
