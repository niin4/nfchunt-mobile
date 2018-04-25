import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation'; 
import { Home, AddGame, ViewGame, ViewGames } from './screens';
import { Provider, connect } from 'react-redux'
import store from './store';

const RootStack = StackNavigator(
  {
    Home: {
      screen: Home,
    },
    AddGame: {
      screen: AddGame,
    },
    ViewGame: {
      screen: ViewGame,
    },
    ViewGames: {
      screen: ViewGames
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