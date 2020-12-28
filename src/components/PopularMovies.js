import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

import Movie from './Movie';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const IMG_ENDPOINT = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
  if (!path) {
    return DEFAULT_IMG;
  }
  return `${IMG_ENDPOINT}/${path}`;
}

const PopularMovies = (props) => {

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
    <View>
      <FlatList
        contentContainerStyle={styles.container}
        data={movies}
        horizontal={false}
        numColumns={3}
        renderItem={({ item }) => (
          <Movie item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  // rec_head: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  // recommendation: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   margin: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  // image: {
  //   width: 115,
  //   height: 150,
  // }
})

export default PopularMovies;