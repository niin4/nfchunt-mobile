import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground
} from 'react-native';

import GLOBALS from '../Globals';
import { setGame } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

class ViewGameView extends Component {
  static navigationOptions = { ...navStyle, title: 'Game details' };

  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
    }
  }

  render() {
    const game = this.state.game;
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.h2}>{game.g_name}</Text>
            <Text style={styles.bold}>Welcome text:</Text>
            <Text>{game.g_welcometext}</Text>
            <Text style={styles.bold}>Text for winner:</Text>
            <Text>{game.g_completedtext}</Text>
            <Button label='Edit' />
            <Button label='Tags' onPress={() => this.props.navigation.navigate('Tags')}/>
            <Button label='Start game'/>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  game: state.gameState.activeGame
});

const mapDispatchToProps = {
  setGame
};

const ViewGame = connect(mapStateToProps, mapDispatchToProps)(ViewGameView);

export default ViewGame;