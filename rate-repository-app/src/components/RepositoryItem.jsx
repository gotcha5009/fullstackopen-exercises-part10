import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Card, Chip } from 'react-native-paper';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    resizeMode: 'stretch',
  },
  leftStyle: {
    paddingRight: 50,
  },
  chipContainer: {
    flexDirection: 'row',
    paddingLeft: 80,
  },
  chip: {
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
  },
  chipTextStyle: {
    color: 'white',
  },
  countsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  count: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'k'; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'm'; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

const RepositoryItem = ({ item }) => (
  <View>
    <Card>
      <Card.Title
        title={item.fullName}
        subtitle={item.description}
        style={styles.title}
        left={(props) => (
          <Image
            {...props}
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        )}
        leftStyle={styles.leftStyle}
      />
      <Card.Content style={styles.chipContainer}>
        <Chip style={styles.chip} textStyle={styles.chipTextStyle}>
          {item.language}
        </Chip>
      </Card.Content>
      <View style={styles.countsContainer}>
        <View style={styles.count}>
          <Text fontWeight="bold">{numFormatter(item.stargazersCount)}</Text>
          <Text color="textSecondary" fontWeight="bold">
            Stars
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold">{numFormatter(item.forksCount)}</Text>
          <Text color="textSecondary" fontWeight="bold">
            Forks
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold">{numFormatter(item.reviewCount)}</Text>
          <Text color="textSecondary" fontWeight="bold">
            Reviews
          </Text>
        </View>
        <View style={styles.count}>
          <Text fontWeight="bold">{numFormatter(item.ratingAverage)}</Text>
          <Text color="textSecondary" fontWeight="bold">
            Rating
          </Text>
        </View>
      </View>
      {/* <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text> */}
    </Card>
  </View>
);

export default RepositoryItem;
