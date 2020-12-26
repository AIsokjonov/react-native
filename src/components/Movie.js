import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Movie = ( props ) => {
	return (
		<View>
			<Image style={styles.image} source={{uri: props.movie.image}} />
			<View>
				<Text>{props.movie.name}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 150,
	}
});

export default Movie;
