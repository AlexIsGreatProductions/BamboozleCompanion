import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';


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
			cheats: [0,0]
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
	}

	changeGest(team, up){
    	let temp = this.state.gests;
    	if (up){
    		temp[team]++; //increase the amount of Successful Gestures for that team
		} else {
    		temp[team]--; //decrease the amount of Successful Gestures for that team
		}
		this.setState({gests: temp});
	}

    changeVerbal(team, up){
        let temp = this.state.verbals;
        if (up){
            temp[team]++; //increase the amount of Successful Verbals for that team
        } else {
            temp[team]--; //decrease the amount of Successful Verbals for that team
        }
        this.setState({verbals: temp});
    }

    changeCheats(team, up){
        let temp = this.state.cheats;
        if (up){
            temp[team]++; //increase the amount of Cheats for that team
        } else {
            temp[team]--; //decrease the amount of Cheats for that team
        }
        this.setState({cheats: temp});
    }

	render() {
		return (
			<View style={styles.bodyContainer}>
				<Text>Current Round: {this.state.currentRound}</Text>
				<Text>Team 1 Current Score: {this.state.team1Score}</Text>
				<Text>Team 2 Current Score: {this.state.team2Score}</Text>
				<View>
					<Text>Team 1</Text>
					<View>
                        <Text>Gestures Clues {this.state.gests[0]}</Text>
                        <Button
                            onPress={() => this.changeGest(0,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeGest(0,false)}
                            title="-"
                            color="#841584"
                        />
					</View>
                    <View>
                        <Text>Verbal Clues {this.state.verbals[0]}</Text>
                        <Button
                            onPress={() => this.changeVerbal(0,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeVerbal(0,false)}
                            title="-"
                            color="#841584"
                        />
                    </View>
                    <View>
                        <Text>Cheats {this.state.cheats[0]}</Text>
                        <Button
                            onPress={() => this.changeCheats(0,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeCheats(0,false)}
                            title="-"
                            color="#841584"
                        />
                    </View>
				</View>
                <View>
                    <Text>Team 2</Text>
                    <View>
                        <Text>Gestures Clues {this.state.gests[1]}</Text>
                        <Button
                            onPress={() => this.changeGest(1,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeGest(1,false)}
                            title="-"
                            color="#841584"
                        />
                    </View>
                    <View>
                        <Text>Verbal Clues {this.state.verbals[1]}</Text>
                        <Button
                            onPress={() => this.changeVerbal(1,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeVerbal(1,false)}
                            title="-"
                            color="#841584"
                        />
                    </View>
                    <View>
                        <Text>Cheats {this.state.cheats[1]}</Text>
                        <Button
                            onPress={() => this.changeCheats(1,true)}
                            title="+"
                            color="#841584"
                        />
                        <Button
                            onPress={() => this.changeCheats(1,false)}
                            title="-"
                            color="#841584"
                        />
                    </View>
                </View>
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