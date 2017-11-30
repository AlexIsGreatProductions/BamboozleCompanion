import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet } from 'react-native';


export default class TotalScoreComponent extends Component {

    constructor() {
        super();
        this.state = {
            score: null,
            team1Score: 0,
            team2Score: 0,
            currentRound: 0,
            team1Gest: 0,
            team2Gest: 0,
            team1Verb: 0,
            team2Verb: 0,
            team1Cheat: 0,
            team2Cheat: 0
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



    render() {
        return (
            <View style={styles.bodyContainer}>
                <Text>Current Round: {this.state.currentRound}</Text>
                <Text>Team 1 Current Score: {this.state.team1Score}</Text>
                <Text>Team 2 Current Score: {this.state.team2Score}</Text>
                <View>
                    <Text>Team 1</Text>
                    <Text>Gestures Clues {team1Gest}</Text>
                    <Button
                        onPress={onPressLearnMore}
                        title="+"
                        color="#841584"
                        accessibilityLabel="Learn more about this purple button"
                    />
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