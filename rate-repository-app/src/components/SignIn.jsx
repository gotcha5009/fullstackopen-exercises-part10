import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.'),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  textBox: {
    fontFamily: theme.fonts.main,
    borderColor: theme.colors.textSecondary,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    color: 'white',
    marginVertical: 5,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textBox}
        name="username"
        placeholder="Username"
      />
      <FormikTextInput
        style={styles.textBox}
        secureTextEntry={true}
        name="password"
        placeholder="Password"
      />
      <Pressable onPress={onSubmit}>
        <Text style={styles.loginButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
