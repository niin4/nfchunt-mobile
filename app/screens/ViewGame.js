import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import GLOBALS from '../Globals';
import { setGame } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';

class ViewGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
    }
  }

  startGameRequest = () => {
    fetch(`${GLOBALS.BASE_URL}/games`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: this.state.user,
        name: this.state.name,
        welcometext: this.state.welcome,
        completedtext: this.state.completed
      }),
    })
    .then((response) => { response.json()})
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });;
  }

  render() {
    const game = this.state.game;
    return (
      <View>
        <Text>View game</Text>
        <Text>Game name:</Text>
        <Text>{game.g_name}</Text>
        <Text>Welcome text:</Text>
        <Text>{game.g_welcometext}</Text>
        <Text>Text for winner:</Text>
        <Text>{game.g_completedtext}</Text>
        <Button label='Edit'/><Button label='Add tags'/>
        <Button label='Start game' onPress={this.startGameRequest} />
      </View>
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