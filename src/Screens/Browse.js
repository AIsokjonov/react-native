import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import PopularMovies from '../components/PopularMovies';

const Browse = () => {
  
  return (
    <View style={styles.container}>
      <View style={styles.popular}>
        <Text style={styles.head}>Browse Page</Text>
        <PopularMovies  />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: 380,
    alignItems: 'center',
  },
  list: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popular: {
    marginTop: 10,
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
  }
});

export default Browse;