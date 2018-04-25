import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation'; 
import { Home, AddGame,  CreateTag, ViewGame, ViewGames, Tags, ViewTag } from './screens';
import { Provider, connect } from 'react-redux'
import store from './store';

const RootStack = StackNavigator(
  {
    AddGame: {
      screen: AddGame,
    },
    CreateTag: {
      screen: CreateTag
    },
    Home: {
      screen: Home,
    }, 
    Tags: {
      screen: Tags
    },
    ViewGame: {
      screen: ViewGame,
    },
    ViewGames: {
      screen: ViewGames
    },
    ViewTag: {
      screen: ViewTag
    }
  },
  {
    initialRouteName: 'Home',
  }
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}

export default App;