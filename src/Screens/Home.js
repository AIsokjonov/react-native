import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, SafeAreaView, Text, FlatList, StatusBar } from 'react-native';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import Movie from '../components/Movie';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function fetchMovies() {
		setLoading(true);
		axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=${query}`)
			.then((response) => {
				if (!response.data.results) {
					setLoading(false);
					setError('Something went wrong');
				}

				const moviesLoaded = response.data.results.map((movie) => {
					const thumbnail = movie.poster_path
						? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
	          : "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";

					return {
						id: movie.id,
						title: movie.title,
						image: thumbnail,
					}
				})

				setMovies(moviesLoaded);
				setLoading(false);
			})
	}

	handleChange = (text) => {
		setQuery(text);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!query) {
			setError('You must type something');
			return;
		}

		await fetchMovies();
	}

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar handleChange={handleChange} handleSubmit={handleSubmit} query={query} />
			<View>
				<FlatList
					data={movies}
					renderItem={({ item }) => <Movie item={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: StatusBar.currentHeight || 0,
		marginBottom: 150,
	},
	input: {
		borderWidth: 1,
		borderColor: 'silver',
		width: 300,
		height: 35,
		fontSize: 20
	},
});

export default Home;
