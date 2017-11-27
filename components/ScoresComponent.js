import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';

const thisRoundScore = [0,0];

export default class ScoresComponent extends Component {

	constructor() {
		super();
		this.state = {
			score: null,
			team1Score: 0,
			team2Score: 0,
			currentRound: 0
		}
	}

	static navigationOptions = {
		title: 'SCORES SCREEN',
	};

    componentDidMount(){
        this.getCurrentScore();
    }

    getCurrentScore(){
        const {params} = this.props.navigation.state;
        console.log("Params: "+params);
        this.setState({
            score: params.score,
            currentRound: params.round
        });
    	let temp1 = 0;	//team 1 score
		let temp2 = 0;	//team 2 score
    	for(let i=0; i<this.state.currentRound; i++){
    		temp1 += this.state.score[i][0];
    		temp2 += this.state.score[i][1];
		}
		this.setState({
			team1Score: temp1,
			team2Score: temp2
		})
	}



	render() {
		return (
			<View>
				<Text>Current Round: {this.state.currentRound}</Text>
				<Text>Team 1 Current Score: {this.state.team1Score}</Text>
				<Text>Team 2 Current Score: {this.state.team2Score}</Text>
			</View>
		)

	}
}