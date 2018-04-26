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
import { setTag } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Button from '../components/Button';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

class CreateTagView extends Component {
  static navigationOptions = { ...navStyle, title: 'Create new tag' };

  constructor(props, context) {
    super(props);
    this.state = {
      game: this.props.game,
      name: '',
      hint: '',
    }
  }
  async createTag() {
    const token = await AsyncStorage.getItem('NFCToken');
    fetch(`${GLOBALS.BASE_URL}/tags`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        hint: this.state.hint,
        game: this.state.game.g_id
      }),
    })
      .then((response) => { return response.json() })
      .then((data) => {
        this.props.onTagChange(data);
        this.setState({newtag: data});
        this.props.navigation.navigate('ViewTag');
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  createTagRequest = () => {
    this.createTag();
  }

  render() {
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.h2}>Tag name:</Text>
            <TextInput onChangeText={(name) => this.setState({ name })}
              value={this.state.name} />

            <Text style={styles.h2}>Hint:</Text>
            <TextInput
              onChangeText={(hint) => this.setState({ hint })}
              value={this.state.hint}
              multiline={true}
              numberOfLines={4} />

            <Button label='Create tag' onPress={this.createTagRequest} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  game: state.gameState.activeGame
});

const mapDispatchToProps = (dispatch) => ({
  onTagChange: (tag) => dispatch(setTag(tag))
});

const CreateTag = connect(mapStateToProps, mapDispatchToProps)(CreateTagView);

export default CreateTag;