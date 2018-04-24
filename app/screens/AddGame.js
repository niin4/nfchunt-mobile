import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import Button from '../components/Button';
import GLOBALS from '../Globals';
const DeviceInfo = require('react-native-deviceinfo');


type Props = {};
export default class AddGame extends Component<Props> {
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
  componentDidMount = () => {
    console.log("App Instance ID", DeviceInfo.getInstanceID()); 
    this.setState({user: DeviceInfo.getInstanceID()})
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