import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Mailer from 'react-native-mail';


const widthArr = [100, 100, 100];

export default class TotalScoreComponent extends Component {

    constructor() {
        super();
        this.header = ['Round', 'Team 1', 'Team 2' ];
        this.tableData;
        this.footer;
        this.state = {
            score: null,
            keepScore: false,
            team1Score: 0,
            team2Score: 0,
            currentRound: 0,
            team1Win: false,
            team2Win: false,
            gameEnd: false
        }
    }

    static navigationOptions = {
        title: 'TOTALS SCREEN',
    };

    componentWillMount(){
        this.getCurrentScore();

    }

    componentDidMount(){
        this.evalScore();
    }

    getCurrentScore(){
        const {params} = this.props.navigation.state;
        console.log("Params: "+params);
        console.log("Scores: "+params.score);
        this.setState({
            //score: params.score,
            //currentRound: params.round,
            score: [[4,8],[3,6],[10,8],[8,5],[9,5]],
            currentRound: 5,
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
                this.setState({team2Win: false, gameEnd: true});
            }
        }
        let foot = ['Totals', temp1, temp2];
        this.setState({
            team1Score: temp1,
            team2Score: temp2
        });
        this.tableData = rounds;
        this.footer = foot;
        console.log('Rows: '+this.tableData);
    }



    render() {
        return (
            <View style={styles.bodyContainer}>
                <Text>Current Round: {this.state.currentRound}</Text>
                <Table style={styles.table}>
                    <Row data={this.header} style={styles.head} textStyle={styles.headText} widthArr={widthArr}/>

                    <Rows data={this.tableData} style={styles.list} textStyle={styles.listText} widthArr={widthArr}/>
                    <Row data={this.footer} style={styles.foot} textStyle={styles.headText} widthArr={widthArr}/>
                </Table>
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
    },
    table: { width: 300, flexDirection: 'column' },
    head: { backgroundColor: '#333', height: 40 },
    foot: { backgroundColor: '#333', height: 40},
    headText: { color: '#fff', textAlign: 'center' },
    list: { height: 28, backgroundColor: '#f0f0f0' },
    listText: { textAlign: 'right', marginRight: 6 }

});