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

class AddGameView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      name: '',
      welcome: '',
      completed: ''
    }
  }

  createGameRequest = () => {
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
    return (
      <View>
        <Text>Add new game</Text>
        <Text>Game name:</Text>
        <TextInput onChangeText={(name) => this.setState({ name })}
          value={this.state.name} />

        <Text>Welcome text:</Text>
        <TextInput
          onChangeText={(welcome) => this.setState({ welcome })}
          value={this.state.welcome}
          multiline={true}
          numberOfLines={4} />

        <Text>Text for winner:</Text>
        <TextInput
          onChangeText={(completed) => this.setState({ completed })}
          value={this.state.completed}
          multiline={true}
          numberOfLines={4} />

        <Button label='Create game' onPress={this.createGameRequest} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.gameState.activeGame
});

const mapDispatchToProps = {
  setGame
};

const AddGame = connect(mapStateToProps, mapDispatchToProps)(AddGameView);

export default AddGame;