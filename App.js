import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './src/Screens/Home';
import MovieDetails from './src/Screens/MovieDetails';
import Browse from './src/Screens/Browse';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Search = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Details" component={MovieDetails} />
		</Stack.Navigator>
	);
};

const Browser = () => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Browse" component={Browse} />
			<Stack.Screen name="Details" component={MovieDetails} />
		</Stack.Navigator>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Search') {
							iconName = focused ? 'search' : 'search';
						} else if (route.name === 'Browse') {
							iconName = focused ? 'home' : 'home';
						}

						return <Icon name={iconName} size={size} color={color} />;
					}
				})}
			>
				<Tab.Screen name="Search" component={Search} />
				<Tab.Screen name="Browser" component={Browser} />
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center'
	}
});

export default App;
