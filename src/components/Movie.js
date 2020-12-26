import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const Movie = (props) => {
	const { item } = props;
	return (
		<View style={styles.container}>
			<Image style={styles.image} source={{ uri: item.image }} />
			<Text 
				style={styles.title}
			>
				{item.title}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 300,
		height: 400,
		borderWidth: 0.3,
		marginTop: 10,
		marginBottom: 10,
	},
	image: {
		width: 300,
		height: 330,
	},
	title: {
		fontSize: 18,
		marginTop: 10,
		textAlign: 'center'
	}
});

export default Movie;
