import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; 
import { Home, AddGame } from './screens';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    AddGame: {
      screen: AddGame,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}