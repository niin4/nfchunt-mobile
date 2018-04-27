import { StyleSheet } from 'react-native';
import * as COMMON from '../../styles/common';

export default StyleSheet.create({
  tabContainer: {
    height: 50,
    justifyContent: 'flex-end',
  },
  tabText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    padding: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: COMMON.COLOR_RED,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: COMMON.COLOR_RED,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
});