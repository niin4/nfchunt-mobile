import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground
} from 'react-native';

import GLOBALS from '../Globals';
import { setTag } from '../actions';
import { connect } from 'react-redux';

import Button from '../components/Button';
import NavigationBar from '../components/NavigationBar';

// Styles
import navStyle from '../styles/navigation';
import styles from '../styles/container';
const image = require('../assets/background.jpeg');

class ViewTagView extends Component {
  static navigationOptions = { ...navStyle, title: 'Tag details' };

  constructor(props) {
    super(props);
    this.state = {
      tag: this.props.tag,
    }
  }

  
  render() {
    const tag = this.state.tag;
    const links = [{label:'Tags', dest: 'Tags'},{label:'Game', dest: 'ViewGame'}];
    return (
      <ImageBackground
        source={image}
        style={styles.background}>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text style={styles.h2}>{tag.t_name}</Text>
            <Text style={styles.bold}>Hint:</Text>
            <Text>{tag.t_hint}</Text>
            <Button label='Edit' />
            <Button label='Register' onPress={() => this.props.navigation.navigate('RegisterTag')}/>
            <Button label='Back to game' onPress={() => this.props.navigation.navigate('ViewGame')}/>
          </View>
        </View>
        <NavigationBar links={links} nav={this.props.navigation}/>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  tag: state.gameState.activeTag
});

const mapDispatchToProps = {
  setTag
};

const ViewTag = connect(mapStateToProps, mapDispatchToProps)(ViewTagView);

export default ViewTag;