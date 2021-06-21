import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { useHistory } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'column',
  },
  topContainer: {
    flexDirection: 'row',
  },
  textContainer: {
    paddingLeft: 15,
    flexShrink: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    flexShrink: 1,
    marginBottom: 5,
  },
  description: {
    color: theme.colors.textSecondary,
    flexShrink: 1,
    marginBottom: 5,
  },
  chipContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  chip: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 3,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    resizeMode: 'stretch',
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  count: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontFamily: theme.fonts.main,
  },
  repoButtonContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    paddingVertical: 15,
  },
  repoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'm'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const RepositoryItemContainer = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.topContainer}>
        <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.textContainer}>
          <Text style={styles.title} testID="fullName">
            {item.fullName}
          </Text>
          <Text style={styles.description} testID="description">
            {item.description}
          </Text>
          <View style={styles.chipContainer}>
            <Text style={styles.chip} testID="language">
              {item.language}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.countsContainer}>
        <View style={styles.count}>
          <Text fontWeight="bold" testID="stargazersCount">
            {numFormatter(item.stargazersCount)}
          </Text>
          <Text color="textSecondary" fontWeight="bold">
            Stars
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold" testID="forksCount">
            {numFormatter(item.forksCount)}
          </Text>
          <Text color="textSecondary" fontWeight="bold">
            Forks
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold" testID="reviewCount">
            {numFormatter(item.reviewCount)}
          </Text>
          <Text color="textSecondary" fontWeight="bold">
            Reviews
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold" testID="ratingAverage">
            {numFormatter(item.ratingAverage)}
          </Text>
          <Text color="textSecondary" fontWeight="bold">
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  const history = useHistory();

  return (
    <Pressable onPress={() => history.push(`/repo/${item.id}`)}>
      <RepositoryItemContainer item={item} />
    </Pressable>
  );
};

export default RepositoryItem;
