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
			  maxState: false,
			  showLetters: false,
			  letterDisplay: ''
		};
		this.toggleStopwatch = this.toggleStopwatch.bind(this);
		this.resetStopwatch = this.resetStopwatch.bind(this);
		this.getFormattedTime = this.getFormattedTime.bind(this);

		//So this code creates a warning. This disables that warning (if I have extra Time I will try to fix it)
		console.disableYellowBox = true;
	}

	toggleStopwatch() {
		this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
		console.log(seconds);
		if(this.state.showLetters == false) {
			this.showLetters()

		}
	}

	resetStopwatch() {
		this.setState({stopwatchStart: false, stopwatchReset: true});
	}

	getFormattedTime(time) {
		this.currentTime = time;
		let a = time.split(':');
		seconds = (+a[1]) * 60000 + (+a[2]) * 1000 + (+a[3]);

		if(this.state.maxState == false){
			if(a[1] == 1) {
				this.timesUp()
			}
		}
	
	};

	componentDidMount(){
		let split = '';
		let list = this.props.navigation.state.params.letters;
		for(let i = 0; i < list.length; i ++){

			if(i == list.length-1){
				split = split + '"' + list[i] + '"'
			} else {
				split = split + '"' + list[i] + '", '
			}
		}
		this.setState({letterDisplay: split}) 
	}

	showLetters(){

		this.setState({showLetters: true});

	}

	timesUp(){
		this.setState({stopwatchStart: false, stopwatchReset: false, maxState: true});
		alert("TIMES UP")
	}


	gotoCountdown(){
		const {navigate} = this.props.navigation;
		const {params} = this.props.navigation.state;
		this.setState({stopwatchStart: false, stopwatchReset: false});
		console.log(params);
		navigate('Countdown', {
			Time: seconds,
			letters: params.letters,
			score: params.score,
			keepScore: params.keepScore,
			round: params.round
		});  //goes to Countdown
	}


	static navigationOptions = {
		title: 'TIMER SCREEN',
	};


	render() {
		let opacityText = this.state.showLetters ? 1 : 0;

		return (
			<View style={styles.bodyContainer}>

				<Text style={styles.letters}>Round: {this.props.navigation.state.params.round}</Text>

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

				<Text>YOUR LETTERS</Text>
				<Text style={[styles.letters, {opacity: opacityText}]}>{this.state.letterDisplay}</Text>

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
        textAlign: 'center',
        marginBottom: 20
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
    },
    letters: {
    	fontSize: 25,
    	color: '#f39c12',
    	marginTop: 10
    }
    
});
