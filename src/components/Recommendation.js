import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Recommendation = (props) => {
	const { item, navigation } = props;
	return (
		<View style={styles.recommendation}>
			<TouchableOpacity onPress={() => {
				navigation.push('Details', { movieId: item.id })
			}}>
				<Image style={styles.image} source={{ uri: item.image }} />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
  rec_head: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10,
	},
	recommendation: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		margin: 1,
	},
	image: {
		width: 117,
		height: 150,
	}
})

export default Recommendation;