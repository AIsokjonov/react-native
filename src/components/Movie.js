import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Movie = (props) => {
	const { item, navigation } = props;
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => {
				navigation.push('Details', { movieId: item.id })
			}}>
				<Image style={styles.image} source={{ uri: item.image }} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 120,
		maxWidth: 120,
		height: 150,
		maxHeight: 150,
		
	},
	image: {
		width: 120,
		height: 148,
	}
});

export default Movie;
