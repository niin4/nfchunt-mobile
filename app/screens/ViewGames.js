import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';

import GLOBALS from '../Globals';
import { setGame } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';

// styles
import navStyle from '../styles/navigation';

const GameItem = (props) => (
  <View>
    <Text onPress={() => props.onClickEv(props.game)}>{props.game.g_name}</Text>
  </View>
)

const GameList = (props) => (
  <ScrollView>
    {props.games.map((game) =>
      <GameItem key={game.g_id} game={game} onClickEv={(game) => props.onClickEv(game)}/>
    )}
  </ScrollView>
)

class ViewGamesView extends Component {
  static navigationOptions = {...navStyle, title: 'All games'};

  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      games: []
    }
  }
  onClickGame = (game) => {
    this.props.onGameChange(game);
    this.props.navigation.navigate('ViewGame'); 
   }

  componentDidMount = () => {
    fetch(`${GLOBALS.BASE_URL}/games?user=${this.state.user}`)
      .then((response) => { return response.json() })
      .then((data) => {
        this.setState({ games: data })
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  render() {
    const games = this.state.games;
    return (
      <View>
        {games.length ?
          <GameList games={games} onClickEv={(game) => this.onClickGame(game)}/>
          : <Text>No games found {this.state.user}</Text>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.gameState.user
});

const mapDispatchToProps = (dispatch) => ({
  onGameChange: (game) => dispatch(setGame(game))
});

const ViewGames = connect(mapStateToProps, mapDispatchToProps)(ViewGamesView);

export default ViewGames;