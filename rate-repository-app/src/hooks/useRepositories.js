import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy, searchKeyword) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    ...(sortBy === 'default'
      ? {
          variables: {
            orderBy: 'CREATED_AT',
            sortBy: 'DESC',
            first: 8,

            searchKeyword,
          },
        }
      : {
          variables: {
            orderBy: 'RATING_AVERAGE',
            sortBy,
            first: 8,

            searchKeyword,
          },
        }),
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      ...(sortBy === 'default'
        ? {
            variables: {
              orderBy: 'CREATED_AT',
              sortBy: 'DESC',
              first: 2,

              searchKeyword,
              after: data.repositories.pageInfo.endCursor,
            },
          }
        : {
            variables: {
              orderBy: 'RATING_AVERAGE',
              sortBy,
              first: 2,

              searchKeyword,
              after: data.repositories.pageInfo.endCursor,
            },
          }),
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
