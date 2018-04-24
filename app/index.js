import React, { Component } from 'react';
import { addNavigationHelpers, StackNavigator } from 'react-navigation'; 
import { Home, AddGame } from './screens';
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
  },
  {
    initialRouteName: 'Home',
  }
);

class App extends React.Component {
  render() {
    const { navState, dispatch} = this.props;
    return (
      <Provider store={store}>
        <RootStack/>
      </Provider>
    );
  }
}

export default App;