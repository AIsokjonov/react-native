import React from 'react';
import { View, StyleSheet } from 'react-native';

import Home from './src/Screens/Home';

const App = () => {
	return (
		<View style={styles.container}>
			<Home />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
});

export default App;
