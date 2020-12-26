import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Movie = (props) => {
	const { item } = props;
	return (
		<View>
			<Text>{item.title}</Text>
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
