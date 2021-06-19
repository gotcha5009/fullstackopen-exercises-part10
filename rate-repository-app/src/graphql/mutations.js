import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation SignIn($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      user {
        id
        username
      }
      accessToken
      expiresAt
    }
  }
`;
