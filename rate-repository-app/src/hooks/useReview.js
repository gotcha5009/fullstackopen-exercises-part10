import { useQuery, useMutation, useApolloClient } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    rating = Number(rating);
    const { data } = await mutate({
      variables: {
        repositoryName,
        ownerName,
        rating,
        text,
      },
    });

    return data.createReview.repositoryId;
  };

  return { createReview, result };
};

export default useReview;
