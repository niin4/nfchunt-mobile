import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import { setGame } from '../actions';

import Button from '../components/Button';
const image = require('../assets/background.jpeg');
import * as COMMON from '../styles/common';

// Styles
import navStyle from '../styles/navigation';

const buttonPressed = (screen) => {
  this.props.navigation.navigate(screen)
};

class HomeView extends Component {
  static navigationOptions = {...navStyle, title: 'NFC Hunt'};

  render() {
    const user = this.props.user;
    return (
      <ImageBackground
        source={image}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Text style={styles.welcome}>
            NFC Hunt, user: {user}
          </Text>
          <Button label='Create game' onPress={() => this.props.navigation.navigate('AddGame')} />
          <Button label='View games' onPress={() => this.props.navigation.navigate('ViewGames')} />
          <Button label='Inspect tag' onPress={() => buttonPressed('InspectTag')} />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = state => ({
  user: state.gameState.user
});

const mapDispatchToProps = {
  setGame
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default Home;
