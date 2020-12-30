import React, { useState, useEffect } from 'react';
import {
	StatusBar,
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Image,
	ScrollView,
	ActivityIndicator
} from 'react-native';
import axios from 'axios';

import Recommendation from '../components/Recommendation';

const DEFAULT_IMG = "https://media.gettyimages.com/photos/old-film-perforated-celluloid-picture-id155278297?s=2048x2048";
const IMG_ENDPOINT = `https://image.tmdb.org/t/p/w500/`;

function getImage(path) {
	if (!path) {
		return DEFAULT_IMG;
	}
	return `${IMG_ENDPOINT}/${path}`;
};

const MovieDetails = ({ navigation, route }) => {
	const { movieId } = route.params;
	const [movie, setMovie] = useState({});
	const [recommendations, setRecommendations] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		function fetchMovie() {
			setLoading(true);
			try {
				axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=a1279933de606b4374a2c93a1d0127a9&language=en-US`)
					.then(({ data: response }) => {

						const movieLoaded = {
							id: response.id,
							title: response.title,
							overview: response.overview,
							image: getImage(response.poster_path),
							rating: response.vote_average,
							release_date: response.release_date
						}
						setMovie(movieLoaded);
					})
			}
			catch (error) {
				setError('Something went wrong');
			} finally {
				setLoading(false);
			}
		}

		async function fetchRecommendations() {
			setLoading(true);

			try {
				const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=a1279933de606b4374a2c93a1d0127a9&language=en-US&page=1`)

				const recommendationsLoaded = res.data.results.map((recommendation) => ({
					...recommendation,
					image: getImage(recommendation.poster_path),
				}));
				setRecommendations(recommendationsLoaded);
			} catch (error) {
				setError('Something went wrong');
			} finally {
				setLoading(false);
			}
		}

		fetchMovie();
		fetchRecommendations();
	}, []);

	if (error) {
		return (
			<View>
				<Text>{error}</Text>
			</View>
		)
	} else if(loading) {
		return (
			<View style={styles.container}>
				<ActivityIndicator />
			</View>
		)
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView>
					<Image style={styles.img} source={{ uri: movie.image }} />
					<Text style={styles.title}>{movie.title}</Text>
					<Text style={styles.overview}>{movie.overview}</Text>
					<Text>
						<View><Text style={styles.rating}>Rating: {movie.rating}</Text></View>
						<View><Text style={styles.release_date}>Release Date: {movie.release_date}</Text></View>
					</Text>
					{
						recommendations.length === 0 ? (
							<View></View>
						) : (
								<View style={styles.recs}>
									<Text style={styles.rec_head}>Recommendations</Text>
									<View style={styles.recommendation}>
										{
											recommendations.map((item) => (
												<Recommendation key={item.id.toString()} item={item} navigation={navigation} />
											))
										}
									</View>
								</View>
							)
					}
				</ScrollView>
			</SafeAreaView>
		)
	}
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: StatusBar.currentHeight || 0,
	},
	img: {
		width: 360,
		height: 500,
	},
	title: {
		marginTop: 20,
		fontSize: 20,
		fontWeight: 'bold'
	},
	overview: {
		marginTop: 20,
		marginBottom: 20,
		width: 350,
	},
	rating: {
		fontWeight: 'bold',
		paddingRight: 40
	},
	release_date: {
		fontWeight: 'bold',
	},
	recs: {
		marginTop: 20,
		width: 360,
	},
	recommendation: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 1,
	},
	rec_head: {
		fontSize: 22,
		fontWeight: 'bold'
	}
});

export default MovieDetails;
