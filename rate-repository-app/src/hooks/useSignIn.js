import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import useAuthStorage from './useAuthStorage';
import { GET_USER } from '../graphql/queries';
import { SIGNIN } from '../graphql/mutations';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGNIN);
  const { data } = useQuery(GET_USER);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({
      variables: {
        username,
        password,
      },
    });

    // console.log('useSignIn.jsx data :>> ', data);

    await authStorage.setAccessToken(data.authorize.accessToken);
    apolloClient.resetStore();
  };

  const getUser = () => {
    return data ? data.authorizedUser : null;
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return { signIn, signOut, getUser, result };
};

export default useSignIn;
