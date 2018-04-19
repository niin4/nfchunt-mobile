import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from '../components/Button';

const buttonPressed = (screen) => {
  this.props.navigation.navigate(screen)
};

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          NFC Hunt
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
