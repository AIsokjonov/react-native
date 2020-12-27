import React from 'react';
import {
	StatusBar,
	SafeAreaView,
	StyleSheet,
	View,
	Text,
	Button,
	Image,
	ScrollView
} from 'react-native';

const MovieDetails = ({ navigation, route }) => {
	const { movie } = route.params;
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Image style={styles.img} source={{ uri: movie.image }} />
				<Text style={styles.title}>{movie.title}</Text>
				<Text style={styles.overview}>{movie.overview}</Text>
				<Text>
					<View><Text style={styles.rating}>Rating: {movie.vote_average}</Text></View>
					<View><Text style={styles.release_date}>Release Date: {movie.release_date}</Text></View>
				</Text>
				<Button
					title="Home"
					onPress={() => navigation.navigate('Home')}
				/>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginTop: StatusBar.currentHeight || 0,
	},
	img: {
		width: 350,
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
	}
});

export default MovieDetails;