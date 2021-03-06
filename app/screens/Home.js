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
import NavigationBar from '../components/NavigationBar';
import LoginState from '../components/LoginState';
import * as COMMON from '../styles/common';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

const buttonPressed = (screen) => {
  this.props.navigation.navigate(screen)
};

class HomeView extends Component {
  static navigationOptions = {...navStyle, title: 'NFC Hunt'};

  render() {
    const user = this.props.user;
    const links = [{label:'Tags', dest: 'Tags'},{label:'Game', dest: 'ViewGame'}];
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.h1}>
            NFC Hunt, user: {user}
          </Text>
          <Button label='Create game' onPress={() => this.props.navigation.navigate('AddGame')} />
          <Button label='View games' onPress={() => this.props.navigation.navigate('ViewGames')} />
        </View>
        <LoginState/>
        <NavigationBar links={links} nav={this.props.navigation}/>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  user: state.gameState.user
});

const mapDispatchToProps = {
  setGame
};

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);

export default Home;
