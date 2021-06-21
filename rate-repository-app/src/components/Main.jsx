import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MyReview from './MyReview';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
    fontFamily: theme.fonts.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/repo/:id">
          <SingleRepository />
        </Route>
        <Route path="/review">
          <CreateReview />
        </Route>
        <Route path="/my_review">
          <MyReview />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
