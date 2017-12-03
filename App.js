import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';


import HomePageComponent from "./components/HomePageComponent";
import GenerateLettersComponent from "./components/GenerateLettersComponent";
import TimerComponent from "./components/TimerComponent";
import ScoresComponent from "./components/ScoresComponent";
import CountdownComponent from "./components/CountdownComponent";
import TotalScoreComponent from "./components/TotalScoreComponent";


const Bamboozle = StackNavigator({
  Home: {
    screen: HomePageComponent
  },
  Generate: {
    screen: GenerateLettersComponent
  },
  Timer: {
    screen: TimerComponent
  },
  Scores: {
    screen: ScoresComponent
  },
  Countdown: {
    screen: CountdownComponent
  },
  Totals: {
    screen: TotalScoreComponent
  }

}, {
  headerMode: 'screen'
});

export default class App extends React.Component {
  render() {
    return (

        <Bamboozle />

    );
  }
}

