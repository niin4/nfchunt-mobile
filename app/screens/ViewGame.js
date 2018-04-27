import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Modal
} from 'react-native';

import GLOBALS from '../Globals';
import { setGame } from '../actions';
import { connect } from 'react-redux';

import NavigationBar from '../components/NavigationBar';
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
      confirmModal: false
    }
  }

  setModalVisible = (visible) => {
    this.setState({ confirmModal: visible });
  }

  confirmReset = () => {
    this.setState({ reseted: true });
    this.setModalVisible(false);
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
            <Button label='Tags' onPress={() => this.props.navigation.navigate('Tags')} />
            <Button label='Reset game' onPress={() => { this.setModalVisible(true) }} />
          </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.confirmModal}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalcontainer}>
            <View elevation={10} style={styles.modal}>
              <Text style={styles.bold}>Do you really want to reset {game.g_name}?</Text>

              <Button label='Confirm'
                onPress={() => {
                  this.confirmReset();
                }}>
              </Button>
              <Button label='Cancel'
                onPress={() => {
                  this.setModalVisible(!this.state.confirmModal);
                }}>
              </Button>
            </View>
          </View>
        </Modal>
        <NavigationBar nav={this.props.navigation}/>
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