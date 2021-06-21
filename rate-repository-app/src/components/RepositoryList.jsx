import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  sortBy,
  setSortBy,
  keyword,
  setKeyword,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      ListHeaderComponent={
        <RepositoryListHeader
          sortBy={sortBy}
          setSortBy={setSortBy}
          keyword={keyword}
          setKeyword={setKeyword}
        />
      }
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('default');
  const [keyword, setKeyword] = useState('');
  const { repositories, fetchMore } = useRepositories(sortBy, keyword);

  const onEndReach = () => {
    fetchMore();
  };

  // console.log('repositories :>> ', repositories);

  return (
    <RepositoryListContainer
      repositories={repositories}
      sortBy={sortBy}
      setSortBy={setSortBy}
      keyword={keyword}
      setKeyword={setKeyword}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
