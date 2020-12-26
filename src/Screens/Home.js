import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, View, Text } from 'react-native';
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
					return {
						id: movie.id,
						title: movie.title,
						image: movie.poster_path,
					}
				})

				setMovies(moviesLoaded);
				setLoading(false);
			})
	}

	handleChange = (e) => {
		setQuery(e.target.value);
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
		<View style={styles.container}>
			<View style={styles.searchbar}>
				<TextInput
					style={styles.input}
					placeholder="Type movie title, director etc..."
					value={query}
					onChangeText={(text) => setQuery(text)}
				/>
				<Button
					title="Search"
					onPress={handleSubmit}
				/>
			</View>
			<View style={styles.results}>
				{
					movies.map((movie, index) => (
						<View key={index}>
							<Text>{movie.title}</Text>
						</View>
					))
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		alignItems: 'center'
	},
	searchbar: {
	borderWidth: 2
	},
	input: {
		borderWidth: 1,
		borderColor: 'silver',
		width: 300,
		height: 35,
		fontSize: 20
	}
});

export default Home;
