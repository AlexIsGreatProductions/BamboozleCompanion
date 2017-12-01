import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ScoresComponent extends Component {

	constructor() {
		super();
		this.state = {
			score: null,
			team1Score: 0,
			team2Score: 0,
			currentRound: 0,
			gests: [0,0],
			verbals: [0,0],
			cheats: [0,0],
            teamActions: [0,0]
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
            currentRound: params.round,
			keepScore: params.keepScore
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
		this.teamScores();
	}

	changeGest(team, up){
    	let temp = this.state.gests;
        let tempActs = this.state.teamActions;
        if (up){
            if ((tempActs[team] < 5) && (temp[team] < 5)) {
                temp[team]++; //increase the amount of Gesture Clues for that team
                tempActs[team]++;
                this.teamScores();
            }
        } else {
            if ((tempActs[team] > 0) && (temp[team] > 0)) {
                temp[team]--; //decrease the amount of Gesture Clues for that team
                tempActs[team]--;
                this.teamScores();
            }
        }
		this.setState({
            gests: temp,
            teamActions: tempActs
		});
		
	}

    changeVerbal(team, up){
        let temp = this.state.verbals;
        let tempActs = this.state.teamActions;
        if (up){
            if ((tempActs[team] < 5) && (temp[team] < 5)) {
                temp[team]++; //increase the amount of Verbal Clues for that team
                tempActs[team]++;
            }
        } else {
            if ((tempActs[team] > 0) && (temp[team] > 0)) {
                temp[team]--; //decrease the amount of Verbal Clues for that team
                tempActs[team]--;
            }
        }
        this.setState({
            verbals: temp,
            teamActions: tempActs
        });
        this.teamScores();
    }

    changeCheats(team, up){
        let temp = this.state.cheats;
        let tempActs = this.state.teamActions;
        if (up){
            if ((tempActs[team] < 5) && (temp[team] < 5)) {
                temp[team]++; //increase the amount of Cheats for that team
                tempActs[team]++;
                this.teamScores();
            }
        } else {
            if ((tempActs[team] > 0) && (temp[team] > 0)) {
                temp[team]--; //decrease the amount of Cheats for that team
                tempActs[team]--;
            }
        }
        this.setState({
            cheats: temp,
            teamActions: tempActs
        });
        
    }

    gotoTotals(){
    	this.teamScores();
		const {navigate} = this.props.navigation;
		const {params} = this.props.navigation.state;
		console.log("TEAM 1: " + this.state.team1Score)
		console.log("TEAM 2: " + this.state.team2Score)
		console.log(params);
		let roundscoretmp = [this.state.team1Score, this.state.team2Score]
		params.score.push(roundscoretmp);
		console.log("SCOREz: " + params.score)
		navigate('Totals', {
			letters: params.letters,
			score: params.score,
			keepScore: params.keepScore,
			round: params.round
		});  //goes to TotalsComponent
	}

	teamScores(){
		let t1s;
		let t2s;

		t1s = ((this.state.gests[0] * 2) + (this.state.verbals[0]) - this.state.cheats[0]);

		t2s = ((this.state.gests[1] * 2) + (this.state.verbals[1]) - this.state.cheats[1]);

		this.setState({team1Score: t1s, team2Score: t2s})
	}

	render() {


		return (
			<View style={styles.bodyContainer}>
				<Text>Current Round: {this.state.currentRound}</Text>
				<Text>Team 1 Current Score: {this.state.team1Score}</Text>
				<Text>Team 2 Current Score: {this.state.team2Score}</Text>
				<View style={styles.team}>
					<Text>Team 1</Text>
					<View style={styles.teamRow}>
                        <Text>Gestures Clues </Text>
                        <Text style={styles.valueText}>{this.state.gests[0]}</Text>
                        <Icon.Button
                            id = "team1GestsPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeGest(0,true)}
                        />
                        <Icon.Button
                            id = "team1GestsMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeGest(0,false)}
                        />
					</View>
                    <View style={styles.teamRow}>
                        <Text>Verbal Clues </Text>
                        <Text style={styles.valueText}>{this.state.verbals[0]}</Text>
                        <Icon.Button
                            id = "team1VerbalPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeVerbal(0,true)}
                        />
                        <Icon.Button
                            id = "team1VerbalMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeVerbal(0,false)}
                        />
                    </View>
                    <View style={styles.teamRow}>
                        <Text>Cheats </Text>
                        <Text style={styles.valueText}>{this.state.cheats[0]}</Text>
                        <Icon.Button
                            id = "team1CheatsPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeCheats(0,true)}
                        />
                        <Icon.Button
                            id = "team1CheatsMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeCheats(0,false)}
                        />
                    </View>
				</View>
                <View>
                    <Text>Team 2</Text>
                    <View style={styles.teamRow}>
                        <Text style={{flex:7}}>Gestures Clues </Text>
                        <Text style={styles.valueText}>{this.state.gests[1]}</Text>
                        <Icon.Button
                            id = "team2GestsPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeGest(1,true)}
                        />
                        <Icon.Button
                            id = "team2GestsMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeGest(1,false)}
                        />
                    </View>
                    <View style={styles.teamRow}>
                        <Text>Verbal Clues </Text>
                        <Text style={styles.valueText}>{this.state.verbals[1]}</Text>
                        <Icon.Button
                            id = "team2VerbalPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeVerbal(1,true)}
                        />
                        <Icon.Button
                            id = "team2VerbalMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeVerbal(1,false)}
                        />
                    </View>
                    <View style={styles.teamRow}>
                        <Text>Cheats </Text>
                        <Text style={styles.valueText}>{this.state.cheats[1]}</Text>
                        <Icon.Button
                            id = "team2CheatsPlus"
                            name="plus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeCheats(1,true)}
                        />
                        <Icon.Button
                            id = "team2CheatsMinus"
                            name="minus-square"
                            style={styles.scoreButts}
                            onPress={() => this.changeCheats(1,false)}
                        />
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.gotoTotals()}>
					<Text style={styles.button}>FINISH</Text>
				</TouchableOpacity>
			</View>
		)

	}
}

const styles = StyleSheet.create({
    button: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    scoreButts: {
        //color: "#841584"
    },
    bodyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db'
    },
    teamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    team: {
        flexDirection: 'column'
    },
    valueText: {
        backgroundColor: '#FFFFFF'
    },
    letters: {
        fontSize: 25,
        color: '#f39c12',
        marginTop: 10
    },
       button: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    }

});