import { useMutation } from '@apollo/client';

import { SIGNUP } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(SIGNUP);

  const signUp = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    await mutate({
      variables: {
        username,
        password,
      },
    });
  };

  return { signUp, result };
};

export default useSignUp;
