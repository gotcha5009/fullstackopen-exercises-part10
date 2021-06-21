import { gql } from '@apollo/client';

export const SIGNIN = gql`
  mutation SIGNIN($username: String!, $password: String!) {
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

export const CREATE_REVIEW = gql`
  mutation CREATE_REVIEW(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;

export const SIGNUP = gql`
  mutation SIGNUP($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DELETE_REVIEW($id: ID!) {
    deleteReview(id: $id)
  }
`;
