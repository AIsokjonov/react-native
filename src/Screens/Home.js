import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	FlatList,
	StatusBar
} from 'react-native';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import Movie from '../components/Movie';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const IMG_ENDPOINT = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
	if (!path) {
		return DEFAULT_IMG;
	}
	return `${IMG_ENDPOINT}/${path}`;
};

const Home = (props) => {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	async function fetchMovies() {
		setLoading(true);
		
		try {
			const response = await axios.get(
				`https://api.themoviedb.org/3/search/movie?api_key=a1279933de606b4374a2c93a1d0127a9&query=${query}`,
			);

			const movieLoaded = response.data.results.map((movie) => ({
				...movie,
				image: getImage(movie.poster_path),
			}))
			setMovies(movieLoaded);
		} catch(error) {
			setError('Something went wrong');
		} finally {
			setLoading(false);
		}
	}

	const handleChange = (text) => {
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
			<SearchBar
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				query={query}
			/>
			<FlatList
				contentContainerStyle={styles.list}
				data={movies}
				renderItem={({ item }) => (
					<Movie item={item} navigation={props.navigation} />
				)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: StatusBar.currentHeight || 0,
		marginBottom: 20,
		justifyContent: 'center'
	},
	list: {
		marginTop: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
	}
});

export default Home;