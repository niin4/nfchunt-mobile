import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import styles from './styles';
const image = require('../../assets/home.png');


export default function HomeTab({
  onPress
}) {

  return (
    <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
      <View style={styles.tab}><Image style={{marginTop: 10, marginBottom: 5, width: 25, height: 25}} source={image}/></View>
    </TouchableOpacity>
  );
}

HomeTab.propTypes = {
  onPress: PropTypes.func.isRequired
};
