import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { AuthHelpers } from './Main/helpers';

export default class Loading extends React.Component<NavigationScreenProps> {
	async componentDidMount() {
		const { navigation } = this.props;
		const loggedIn = await AuthHelpers.checkAuthStatus();
		console.log(loggedIn);
		navigation.navigate(loggedIn ? 'Main' : 'Onboarding');
	}

	render() {
		return <View style={{ flex: 1 }} />;
	}
}
