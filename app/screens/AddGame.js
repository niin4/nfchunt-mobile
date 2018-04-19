import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

type Props = {};
export default class AddGame extends Component<Props> {
  render() {
    return (
      <View>
        <Text>
          Add new game
        </Text>
      </View>
    );
  }
}