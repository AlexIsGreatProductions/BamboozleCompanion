import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Text, View, Button, TouchableOpacity, StyleSheet, Alert, TextInput} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import email from 'react-native-email';


const widthArr = [100, 100, 100];
const emailPlaceholder = "Enter an Email";

export default class TotalScoreComponent extends Component {

    constructor() {
        super();
        this.state = {
            score: null,
            keepScore: false,
            team1Score: 0,
            team2Score: 0,
            currentRound: 0,
            header : ['Round', 'Team 1', 'Team 2' ],
            tableData: [],
            footer: [],
            team1Win: false,
            team2Win: false,
            gameEnd: false,
            draw: false,
            recipient: ''
        }
    }


    componentWillMount(){
        this.getCurrentScore();

    }

    componentDidMount(){
        this.evalScore();
    }

    static navigationOptions = {
        title: 'blah blah',
        header: null
    };

    getCurrentScore(){
        const {params} = this.props.navigation.state;
        console.log("Params: "+params);
        console.log("Scores: "+params.score);
        this.setState({
            score: params.score,
            currentRound: params.round,
            // score: [[4,8],[3,6],[10,8],[8,5],[9,5]],
            // currentRound: 5,
            keepScore: params.keepScore
        });
    }

    evalScore(){
        let temp1 = 0;	//team 1 score
        let temp2 = 0;	//team 2 score
        console.log('Round '+this.state.currentRound);
        let rounds = [];
        for(let i=0; i<this.state.currentRound; i++){
            let roundNum = i+1;
            let temp = ['Round '+ roundNum, this.state.score[i][0], this.state.score[i][1]];
            rounds.push(temp);
            temp1 += this.state.score[i][0];
            temp2 += this.state.score[i][1];
        }
        console.log('Rounds: '+rounds);
        if((temp1 >= 30) || (temp2 >= 30)) {
            if (temp1 > temp2) {
                this.setState({team1Win: true, gameEnd: true});
            }
            if (temp1 < temp2) {
                this.setState({team2Win: true, gameEnd: true});
            }
            if (temp1 == temp2) {
                this.setState({draw: true, gameEnd: true})
            }
        }
        let foot = ['Totals', temp1, temp2];
        this.setState({
            team1Score: temp1,
            team2Score: temp2,
            tableData: rounds,
            footer: foot
        });
        console.log('Rows: '+this.state.tableData);
    }

    goToNextRound(){
        const {navigate} = this.props.navigation;
        const {params} = this.props.navigation.state;
        Alert.alert('Next Round', 'Would you like to Start a new Round?', [
            {text: 'No', onPress: () => console.log("No Pressed")},
            {text: 'Yes', onPress: () => navigate('Generate', {
                    score: params.score,
                    keepScore: params.keepScore,
                    round: params.round +1
                })},
        ])
    }

    mailScore(){
        let body = "Bamboozle Game Complete\n\n";
        let now = new Date();
        let subject = "Bamboozle Game "+ now.toDateString();
        body += "Date: "+ now.toDateString()+"\n\n";
        body += "----------------------------------\n";
        body += "|  Round    |  Team 1  |  Team 2 |\n";
        for (let i=0; i<this.state.currentRound; i++){
            body += "|  "+(this.state.tableData[i][0]+"  |     "+ this.state.tableData[i][1]+"    |    "+ this.state.tableData[i][2])+"    |\n";
        }
        body += "----------------------------------\n\nThank You for playing.";
        console.log("Recipient: "+ this.state.recipient);
        console.log(body);
        let to = this.state.recipient;
        email(to, {
            subject: subject,
            body: body,
        }).catch(console.error);
    }

    endGame(){
        const {navigate} = this.props.navigation;
        Alert.alert('Game Over', 'Would you like to start over?', [
            {text: 'No', onPress: () => console.log("No Pressed")},
            {text: 'Yes', onPress: () => navigate('Home')}
        ]);
    }

    render() {

        let opacityNextRound = this.state.gameEnd ? 0 : 1;
        let opacityTeam1 = this.state.team1Win ? 1 : 0;
        let opacityTeam2 = this.state.team2Win ? 1 : 0;
        let opacityDraw = this.state.draw ? 1 : 0;
        return (
            <View style={styles.bodyContainer}>
                <Text>Current Round: {this.state.currentRound}</Text>
                <Table style={styles.table}>
                    <Row data={this.state.header} style={styles.head} textStyle={styles.headText} widthArr={widthArr}/>
                    <Rows data={this.state.tableData} style={styles.list} textStyle={styles.listText} widthArr={widthArr}/>
                    <Row data={this.state.footer} style={styles.foot} textStyle={styles.headText} widthArr={widthArr}/>
                </Table>
                <View style={{opacity: opacityNextRound}}>
                    <TouchableOpacity onPress={() => this.goToNextRound()}>
                        <Text style={styles.button}>NEXT ROUND</Text>
                    </TouchableOpacity>
                </View>
                <View style={{opacity: opacityTeam1}}>
                    <Text style={styles.winner}>Team 1 Wins!!!</Text>
                    <TouchableOpacity onPress={() => this.endGame()}>
                        <Text style={styles.button}>END GAME</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.email}
                        placeholder={emailPlaceholder}
                        value={this.state.recipient}
                        onChangeText={(value) => this.setState({recipient: value})}
                    />
                    <TouchableOpacity onPress={() => this.mailScore()}>
                        <Text style={styles.button}>MAIL SCORE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{opacity: opacityTeam2}}>
                    <Text style={styles.winner}>Team 2 Wins!!!</Text>
                    <TouchableOpacity onPress={() => this.endGame()}>
                        <Text style={styles.button}>END GAME</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.email}
                        placeholder={emailPlaceholder}
                        value={this.state.recipient}
                        onChangeText={(value) => this.setState({recipient: value})}
                    />
                    <TouchableOpacity onPress={() => this.mailScore()}>
                        <Text style={styles.button}>MAIL SCORE</Text>
                    </TouchableOpacity>
                </View>
                <View style={{opacity: opacityDraw}}>
                    <Text style={styles.winner}>Both Teams Win!!!</Text>
                    <TouchableOpacity onPress={() => this.endGame()}>
                        <Text style={styles.button}>END GAME</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.email}
                        placeholder={emailPlaceholder}
                        value={this.state.recipient}
                        onChangeText={(value) => this.setState({recipient: value})}
                    />
                    <TouchableOpacity onPress={() => this.mailScore()}>
                        <Text style={styles.button}>MAIL SCORE</Text>
                    </TouchableOpacity>
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
    winner: {
        fontSize: 25
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
    },
    email: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1
    },
    table: { width: 300, flexDirection: 'column' },
    head: { backgroundColor: '#333', height: 40 },
    foot: { backgroundColor: '#333', height: 40},
    headText: { color: '#fff', textAlign: 'center' },
    list: { height: 28, backgroundColor: '#f0f0f0' },
    listText: { textAlign: 'right', marginRight: 6 }

});