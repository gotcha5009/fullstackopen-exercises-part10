import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
  const { signOut, getUser } = useSignIn();

  const user = getUser();

  return (
    <View style={styles.tabs}>
      <Link to="/">
        <Text fontWeight="bold" style={styles.tab}>
          Repositories
        </Text>
      </Link>
      {!user ? (
        <Link to="/signin">
          <Text fontWeight="bold" style={styles.tab}>
            Sign in
          </Text>
        </Link>
      ) : (
        <Pressable onPress={signOut}>
          <Text fontWeight="bold" style={styles.tab}>
            Sign out
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AppBarTab;
