import React from 'react';
import { Button, StyleSheet, View, TextInput } from 'react-native';

const SearchBar = () => {
	return (
		<View>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Type movie title, author etc..."
				/>
			</View>
			<Button
				title="Search"
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		width: 300,
		height: 35,
	},
	input: {
		width: 300,
		fontSize: 22,
		textAlign: 'center',
		alignItems: 'center',
	}
})

export default SearchBar;
