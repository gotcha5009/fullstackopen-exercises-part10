import { useQuery, useMutation } from '@apollo/client';

import { GET_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const useMyReview = () => {
  const { data, loading, fetchMore, refetch, ...result } = useQuery(GET_USER, {
    variables: {
      includeReviews: true,
      first: 7,
    },
  });

  const [mutate] = useMutation(DELETE_REVIEW);

  const deleteReview = async (id) => {
    await mutate({ variables: { id } });
  };

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        includeReviews: true,
        first: 4,
        after: data.authorizedUser.reviews.pageInfo.endCursor,
      },
    });
  };

  return {
    reviews: data?.authorizedUser.reviews?.edges,
    fetchmore: handleFetchMore,
    deleteReview,
    refetch,
    loading,
    ...result,
  };
};

export default useMyReview;
