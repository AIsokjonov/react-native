import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import axios from 'axios';

import Movie from '../components/Movie';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const IMG_ENDPOINT = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
  if (!path) {
    return DEFAULT_IMG;
  }
  return `${IMG_ENDPOINT}/${path}`;
}

const Browse = (props) => {

  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    fetchMovies()
  }, []);

  async function fetchMovies() {
    setLoading(true);
    try {
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=a1279933de606b4374a2c93a1d0127a9&language=en-US&page=${offset}`)
        .then((res) => {
          const loadedMovies = res.data.results.map((movie) => ({
            ...movie,
            image: getImage(movie.poster_path),
          }))

          setMovies(loadedMovies);
          setOffset(offset + 1);
        })
    } catch (error) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.popular}>
        <FlatList
          contentContainerStyle={styles.container}
          data={movies}
          horizontal={false}
          numColumns={3}
          renderItem={({ item }) => (
            <Movie item={item} navigation={props.navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchMovies}
          onEndReachedThreshold={0}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    alignItems: 'center',
    marginBottom: 10,
  },
  list: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  popular: {
    marginTop: 10,
  }
});

export default Browse;