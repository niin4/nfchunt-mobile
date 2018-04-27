import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import NavigationTab from '../NavigationTab';
import { HomeTab } from '../NavigationTab';
import styles from './styles';

export default function NavigationBar({
  links,
  nav
}) {
  return (
    <View style={styles.bar}>
      {links ? links.map((link) =>
        <NavigationTab key={link.label} label={link.label} onPress={() => nav.navigate(link.dest)} />
      ) : null}
      <HomeTab onPress={() => nav.navigate('Home')} />
    </View>
  )
};






