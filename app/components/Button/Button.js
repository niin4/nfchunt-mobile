import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';


export default function Button({
  onPress,
  label = 'Click me'
}) {

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.button}>{label.toUpperCase()}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  label: PropTypes.string
};
