import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ sortBy, setSortBy, keyword, setKeyword }) => {
  const [typing, setTyping] = useState(0);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search keyword..."
        value={keyword}
        onChangeText={(value) => {
          if (typing) {
            clearTimeout(typing);
          }
          setTyping(() => {
            setKeyword(value);
          }, 500);
        }}
      />
      <ItemSeparator />
      <Picker
        selectedValue={sortBy}
        onValueChange={(value) => setSortBy(value)}
        prompt={'Sort repositories by...'}
      >
        <Picker.Item label="Latest repositories" value="default" />
        <Picker.Item label="Highest rated repositories" value="DESC" />
        <Picker.Item label="Lowest rated repositories" value="ASC" />
      </Picker>
    </View>
  );
};

export default RepositoryListHeader;
