import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { setGame } from '../actions';

import Button from '../components/Button';

const buttonPressed = (screen) => {
  this.props.navigation.navigate(screen)
};

class HomeView extends Component {
  render() {
    const user = this.props.user;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          NFC Hunt, user: {user}
        </Text>
        <Button label='Create game' onPress={() => this.props.navigation.navigate('AddGame')} />
        <Button label='View games' onPress={() => buttonPressed('ViewGames')} />
        <Button label='Inspect tag' onPress={() => buttonPressed('InspectTag')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
