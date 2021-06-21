import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useHistory } from 'react-router';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useReview from '../hooks/useReview';

const initialValues = {
  repositoryName: '',
  ownerName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required.'),
  ownerName: yup.string().required('Repository owner name is required.'),
  rating: yup
    .number()
    .min(0)
    .max(100)
    .integer('The rating score must be a whole number')
    .required('Rating is required.'),
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

export const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        style={styles.textBox}
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        style={styles.textBox}
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput
        style={styles.textBox}
        name="rating"
        placeholder="Rating between 0 and 100"
      />
      <FormikTextInput
        style={styles.textBox}
        name="text"
        placeholder="Review"
        multiline
      />
      <Pressable onPress={onSubmit} testID="submitButton">
        <Text style={styles.loginButton}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export const CreateReviewContainer = ({
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
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const { createReview } = useReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;

    try {
      const repoId = await createReview({
        repositoryName,
        ownerName,
        rating,
        text,
      });
      history.push(`/repo/${repoId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <CreateReviewContainer
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    />
  );
};

export default CreateReview;
