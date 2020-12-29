import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ImagePropTypes } from 'react-native';
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

  useEffect(() => {
    function fetchPopular() {
      setLoading(true);
      try {
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=a1279933de606b4374a2c93a1d0127a9&language=en-US&page=1')
          .then((res) => {
            const moviesLoaded = res.data.results.map((movie) => ({
              ...movie,
              image: getImage(movie.poster_path),
            }))

            setMovies(moviesLoaded);
          })
      } catch (error) {
        setError('Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchPopular();
  })

  return (
    <View style={styles.container}>
      <View style={styles.popular}>
        <Text style={styles.head}>Browse Page</Text>
        <View>
          <FlatList
            contentContainerStyle={styles.container}
            data={movies}
            horizontal={false}
            numColumns={3}
            renderItem={({ item }) => (
              <Movie item={item} navigation={props.navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
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