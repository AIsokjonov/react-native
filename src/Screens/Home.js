import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import SearchBar from '../components/SearchBar';

const Home = () => {
	return (
		<View style={styles.container}>
			<SearchBar />
			<Text>Home Page</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 100,
		alignItems: 'center'
	}
});

export default Home;
