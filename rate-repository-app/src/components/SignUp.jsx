import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const initialValues = {
  username: '',
  password: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().min(1).max(30).required('Username is required.'),
  password: yup.string().min(5).max(50).required('Password is required.'),
  passwordConfirm: yup
    .mixed()
    .oneOf([yup.ref('password'), null], 'Password must match.')
    .required('Password confirmation is required.'),
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

export const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textBox}
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        style={styles.textBox}
        secureTextEntry={true}
        name="password"
        placeholder="Password"
        testID="passwordField"
      />
      <FormikTextInput
        style={styles.textBox}
        secureTextEntry={true}
        name="passwordConfirm"
        placeholder="Password confirmation"
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.loginButton}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export const SignUpContainer = ({
  initialValues,
  onSubmit,
  validationSchema,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const { signUp } = useSignUp();
  const { signIn } = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignUpContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export default SignUp;
