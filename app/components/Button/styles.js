import { StyleSheet } from 'react-native';
import * as COMMON from '../../styles/common';
const image = require('../../assets/background.jpeg');

export default StyleSheet.create({
  button: {
    backgroundColor: COMMON.COLOR_RED,
    color: '#fff',
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});