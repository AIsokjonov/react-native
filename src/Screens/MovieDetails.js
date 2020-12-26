import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const MovieDetails = ({ navigation, route }) => {
	return (
		<View>
			<Text>Movie Details Page</Text>
			<Button title="Home" onPress={() => navigation.navigate('Home')} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MovieDetails;
