import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight / 2,
    paddingLeft: Constants.statusBarHeight / 2,
    backgroundColor: theme.colors.appBarBackground,
    // ...
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab />
      </ScrollView>
    </View>
  );
};

export default AppBar;
