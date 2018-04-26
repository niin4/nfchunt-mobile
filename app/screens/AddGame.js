import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  AsyncStorage
} from 'react-native';

import GLOBALS from '../Globals';
import { setGame } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../components/Button';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

class AddGameView extends Component {
  static navigationOptions = { ...navStyle, title: 'Create new game' };

  constructor(props, context) {
    super(props);
    this.state = {
      user: this.props.user,
      name: '',
      welcome: '',
      completed: '',
      activeGame: {
        g_name: 'moi'
      },
    }
  }
  
  async postGame() {
    const token = await AsyncStorage.getItem('NFCToken');
    fetch(`${GLOBALS.BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        welcometext: this.state.welcome,
        completedtext: this.state.completed
      }),
    })
      .then((response) => { return response.json() })
      .then((data) => {
        this.props.onGameChange(data);
        this.props.navigation.navigate('ViewGame');
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  createGameRequest = () => {
    this.postGame();
  }

  render() {
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.h2}>Game name:</Text>
            <TextInput onChangeText={(name) => this.setState({ name })}
              value={this.state.name} />

            <Text style={styles.h2}>Welcome text:</Text>
            <TextInput
              onChangeText={(welcome) => this.setState({ welcome })}
              value={this.state.welcome}
              multiline={true}
              numberOfLines={4} />

            <Text style={styles.h2}>Text for winner:</Text>
            <TextInput
              onChangeText={(completed) => this.setState({ completed })}
              value={this.state.completed}
              multiline={true}
              numberOfLines={4} />

            <Button label='Create game' onPress={this.createGameRequest} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  user: state.gameState.user,
  activeGame: state.gameState.activeGame
});

const mapDispatchToProps = (dispatch) => ({
  onGameChange: (game) => dispatch(setGame(game))
});

const AddGame = connect(mapStateToProps, mapDispatchToProps)(AddGameView);

export default AddGame;