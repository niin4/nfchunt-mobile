import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  ScrollView
} from 'react-native';

import GLOBALS from '../Globals';
import { setTag } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

const TagItem = (props) => (
  <View>
    <Text onPress={() => props.onClickEv(props.tag)}>{props.tag.t_name}</Text>
  </View>
)

const TagList = (props) => (
  <ScrollView>
    {props.tags.map((tag) =>
      <TagItem key={tag.t_id} tag={tag} onClickEv={(tag) => props.onClickEv(tag)}/>
    )}
  </ScrollView>
)

class TagsView extends Component {
  static navigationOptions = { ...navStyle, title: 'Tags' };

  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
      tags: [],
    }
  }
  onClickTag = (tag) => {
    this.props.onTagChange(tag);
    this.props.navigation.navigate('ViewTag'); 
   }

  componentDidMount = () => {
    fetch(`${GLOBALS.BASE_URL}/tags?game=${this.state.game.g_id}`)
      .then((response) => { return response.json() })
      .then((data) => {
        this.setState({ tags: data })
      })
      .catch((error) => {
        console.error(error);
      });;
  }

  render() {
    const tags = this.state.tags;
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.h2}>Tags:</Text>
            {tags.length ?
              <TagList tags={tags} onClickEv={(tag) => this.onClickTag(tag)}/>
              : <Text>No tags found</Text>
            }
            <Button
              label='Add new tag'
              onPress={() => this.props.navigation.navigate('CreateTag')}
            />
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

const Tags = connect(mapStateToProps, mapDispatchToProps)(TagsView);

export default Tags;