import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useHistory, Link } from 'react-router-native';

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
  const history = useHistory();
  const { signOut, getUser } = useSignIn();

  const handleSignOut = async () => {
    await signOut();
    history.push('/');
  };
  const user = getUser();

  return (
    <View style={styles.tabs}>
      <Link to="/">
        <Text fontWeight="bold" style={styles.tab}>
          Repositories
        </Text>
      </Link>
      {!user ? (
        <>
          <Link to="/signin">
            <Text fontWeight="bold" style={styles.tab}>
              Sign in
            </Text>
          </Link>
          <Link to="/signup">
            <Text fontWeight="bold" style={styles.tab}>
              Sign up
            </Text>
          </Link>
        </>
      ) : (
        <>
          <Link to="/review">
            <Text fontWeight="bold" style={styles.tab}>
              Create a review
            </Text>
          </Link>
          <Link to="/my_review">
            <Text fontWeight="bold" style={styles.tab}>
              My reviews
            </Text>
          </Link>
          <Pressable onPress={handleSignOut}>
            <Text fontWeight="bold" style={styles.tab}>
              Sign out
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default AppBarTab;
