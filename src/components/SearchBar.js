import React from 'react';
import { Button, StyleSheet, View, TextInput, StatusBar } from 'react-native';

const SearchBar = (props) => {
	handleChange = (text) => {
		props.handleChange(text);
	};

	async function handleSubmit(event) {
		props.handleSubmit(event);
	}

	return (
		<View style={styles.searchbar}>
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder="Type movie title, author etc..."
					value={props.query}
					onChangeText={handleChange}
				/>
			</View>
			<Button
				title="Search"
				onPress={handleSubmit}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	searchbar: {
		borderWidth: 1,
		marginTop: StatusBar.currentHeight || 0,
		flexDirection: 'row'
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 0.3,
	},
	input: {
		width: 280,
		fontSize: 18,
		justifyContent: 'center',
	}
});

export default SearchBar;