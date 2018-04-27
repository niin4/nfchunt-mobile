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


export default function NavigationTab({
  onPress,
  label = 'Click me'
}) {

  return (
    <TouchableOpacity style={styles.tabContainer} onPress={onPress}>
      <Text style={styles.tabText}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

NavigationTab.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string
};
