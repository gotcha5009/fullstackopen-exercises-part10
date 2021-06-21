import React from 'react';
import { View, StyleSheet, FlatList, Alert, Pressable } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useMyReview from '../hooks/useMyReview';
import { dateFormatter } from './SingleRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
  },
  reviewContainer: {
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
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  actionButton: (color) => ({
    margin: 5,
    flex: 1,
    padding: 15,
    borderRadius: 5,
    backgroundColor: color ? color : theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  actionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, handleDelete }) => {
  // Single review item
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{review.repository.fullName}</Text>

          <Text style={styles.description}>
            {dateFormatter(review.createdAt)}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Link
          to={`/repo/${review.repository.id}`}
          style={styles.actionButton()}
        >
          <Text style={styles.actionText}>View repository</Text>
        </Link>
        <Pressable
          onPress={() => handleDelete(review.id)}
          style={styles.actionButton('red')}
        >
          <Text style={styles.actionText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReview = () => {
  const { reviews, fetchmore, refetch, deleteReview } = useMyReview();

  const onEndReached = () => {
    fetchmore();
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          style: 'destructive',
          onPress: async () => {
            await deleteReview(id);
            refetch();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const reviewNodes = reviews ? reviews.map((edge) => edge.node) : [];

  return reviews ? (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => (
        <ReviewItem review={item} handleDelete={handleDelete} />
      )}
      keyExtractor={(item) => item.id}
    />
  ) : null;
};

export default MyReview;
