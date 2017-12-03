import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ScoresComponent extends Component {

	constructor() {
		super();
		this.state = {
			score: [],
			team1Score: 0,
			team2Score: 0,
			currentRound: 0,
			gests: [0,0],
			verbals: [0,0],
			cheats: [0,0],
            teamActions: [0,0]
		}
	}

    componentWillMount(){
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
		});
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
        this.teamScores();
    }

    gotoTotals(){
    	this.teamScores();
		const {navigate} = this.props.navigation;
		const {params} = this.props.navigation.state;
        let temp = this.state.score;
        temp.push([this.state.team1Score,this.state.team2Score]);
		navigate('Totals', {
			score: this.state.score,
			keepScore: this.state.keepScore,
			round: this.state.currentRound
		});  //goes to TotalsComponent

	}

	teamScores(){
		let t1s;
		let t2s;

		t1s = ((this.state.gests[0] * 2) + (this.state.verbals[0]) - this.state.cheats[0]);

		t2s = ((this.state.gests[1] * 2) + (this.state.verbals[1]) - this.state.cheats[1]);
		this.setState({
			team1Score: t1s,
			team2Score: t2s
		})
	}

	render() {


		return (
			<View style={styles.bodyContainer}>
				<Text style={styles.letters}>Current Round: {this.state.currentRound}</Text>
				<View style={styles.team}>
					<Text style={[styles.teamTitle, {color: '#C96A9F'}]}>Team 1</Text>
					<View style={styles.teamRow}>
                        <Text>Gestures Clues: </Text>
                        <Text style={styles.valueText}>{this.state.gests[0]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeGest(0,true)}>
		                        <Icon
		                            id = "team1GestsPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeGest(0,false)}>
	                        <Icon
	                            id = "team1GestsMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
                        </TouchableOpacity>
					</View>
                    <View style={styles.teamRow}>
                        <Text>Verbal Clues: </Text>
                        <Text style={styles.valueText}>{this.state.verbals[0]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeVerbal(0,true)}>
		                        <Icon
		                            id = "team1VerbalPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeVerbal(0,false)}>
	                        <Icon
	                            id = "team1VerbalMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.teamRow}>
                        <Text>Cheats: </Text>
                        <Text style={styles.valueText}>{this.state.cheats[0]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeCheats(0,true)}>
		                        <Icon
		                            id = "team1CheatsPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeCheats(0,false)}>
	                        <Icon
	                            id = "team1CheatsMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
						</TouchableOpacity>

                    </View>
                    <View style={styles.teamRow}>
                		<Text style={styles.score}>Team 1 Current Score: </Text>
                		<Text style={styles.valueText}>{this.state.team1Score}</Text>
                	</View>
				</View>
                <View style={styles.team}>
                    <Text style={[styles.teamTitle, {color: '#F67C15'}]}>Team 2</Text>
                    <View style={styles.teamRow}>
                        <Text>Gestures Clues: </Text>
                        <Text style={styles.valueText}>{this.state.gests[1]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeGest(1,true)}>
		                        <Icon
		                            id = "team1GestsPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeGest(1,false)}>
	                        <Icon
	                            id = "team1GestsMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
                        </TouchableOpacity>
					</View>
                    <View style={styles.teamRow}>
                        <Text>Verbal Clues: </Text>
                        <Text style={styles.valueText}>{this.state.verbals[1]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeVerbal(1,true)}>
		                        <Icon
		                            id = "team1VerbalPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeVerbal(1,false)}>
	                        <Icon
	                            id = "team1VerbalMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.teamRow}>
                        <Text>Cheats: </Text>
                        <Text style={styles.valueText}>{this.state.cheats[1]}</Text>
                    </View>
                    <View style={styles.teamRow}>
                    	<View style={styles.margin}>
	                    	<TouchableOpacity onPress={() => this.changeCheats(1,true)}>
		                        <Icon
		                            id = "team1CheatsPlus"
		                            name="plus-square"
		                            size = {30}
		                            color = "#841584"
		                        />
	                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => this.changeCheats(1,false)}>
	                        <Icon
	                            id = "team1CheatsMinus"
	                            name="minus-square"
	                            size = {30}
	                            color = "#841584"
	                        />
						</TouchableOpacity>

                    </View>
                    <View style={styles.teamRow}>
                    	<Text style={styles.score}>Team 2 Current Score: </Text>
                    	<Text style={styles.valueText}>{this.state.team2Score}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.gotoTotals()}>
					<Text style={styles.button}>PROCEED</Text>
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
        backgroundColor: '#3498db'
    },
    teamRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
    },
    team: {
        flexDirection: 'column',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 5,
        padding: 1,
        width: Dimensions.get('window').width*.75,
        height: Dimensions.get('window').height*.33
    },
    valueText: {
        backgroundColor: '#FFFFFF',
        left: Dimensions.get('window').width*.55,
        position: 'absolute',
        textAlign: 'center',
        height: 20,
        width: 20,
        borderRadius: 100
    },
    letters: {
        fontSize: 25,
        color: '#f39c12'
    },
    button: {
        fontSize: 25,
        color: 'white',
        textAlign: 'center'
    },
    teamTitle: {
    	fontSize: 20,
    	alignSelf: 'center',
	    textShadowColor: '#000000',
	    textShadowOffset: {
	      width: 1,
	      height: 1
	    }
    },
    score: {
    	alignSelf: 'center'
    },
    margin: {
    	marginRight: 5
    },

});