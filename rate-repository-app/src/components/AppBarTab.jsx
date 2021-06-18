import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: 10,
    color: theme.colors.appBarText,
  },
});

const AppBarTab = () => {
  return (
    <View style={styles.tabs}>
      <Link to="/">
        <Text fontWeight="bold" style={styles.tab}>
          Repositories
        </Text>
      </Link>
      <Link to="/signin">
        <Text fontWeight="bold" style={styles.tab}>
          Sign in
        </Text>
      </Link>
    </View>
  );
};

export default AppBarTab;
