import React from 'react';
import { View, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';
import useRepository from '../hooks/useRepository';

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
    fontWeight: 'bold',
    fontSize: 17,
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
  separator: {
    height: 10,
  },
  reviewContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: theme.colors.primary,
    borderStyle: 'solid',
    borderWidth: 1.5,
    justifyContent: 'center',
  },
  ratingText: {
    color: theme.colors.primary,
    textAlign: 'center',
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

export const dateFormatter = (dateString) => {
  const date = new Date(dateString);
  //   console.log('dateString :>> ', dateString);
  //   console.log('date :>> ', date);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ item }) => {
  return (
    <>
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

        <Pressable onPress={() => Linking.openURL(item.url)}>
          <View style={styles.repoButtonContainer}>
            <Text style={styles.repoButtonText}>Open in Github</Text>
          </View>
        </Pressable>
      </View>
      <ItemSeparator />
    </>
  );
};

const ReviewItem = ({ review }) => {
  // Single review item
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{review.user.username}</Text>

        <Text style={styles.description}>
          {dateFormatter(review.createdAt)}
        </Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository(id);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReached = () => {
    fetchMore();
  };

  return repository ? (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo item={repository} />}
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
    />
  ) : null;
};

export default SingleRepository;
