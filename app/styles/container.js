import { StyleSheet } from 'react-native';
import * as COMMON from './common';

export default StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
  box: {
    padding: 20,
    backgroundColor: '#fff',
  },
  boxCenter: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  h1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24
  },
  h2: {
    color: COMMON.COLOR_DARK,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: COMMON.COLOR_DARK
  }
});