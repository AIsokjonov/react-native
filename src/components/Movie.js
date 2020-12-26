import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

const Movie = (props) => {
	const { item, navigation } = props;
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => {
				navigation.push('Details', { movie: item })
			}}>
				<Image style={styles.image} source={{ uri: item.image }} />
				<Text style={styles.title}>{item.title}</Text>
			</TouchableOpacity>
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
