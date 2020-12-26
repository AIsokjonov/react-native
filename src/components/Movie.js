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
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 120,
		marginTop: 2,
		marginBottom: 2,
		flexDirection: 'column',
		borderWidth: 1,
	},
	image: {
		width: 100,
		height: 120,
	},
	title: {
		fontSize: 18,
		marginTop: 10,
		textAlign: 'center'
	}
});

export default Movie;
