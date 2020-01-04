import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import env from '../../env';
import { storeAuthData } from '../helpers/auth';

const authenticate = async (): Promise<void> => {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;
	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	} else if (finalStatus !== 'granted') {
		Alert.alert(
			'We require push notification permissions to provide our services.'
		);
	}
	const pushToken = await Notifications.getExpoPushTokenAsync();

	try {
		const response = await fetch(`${env.apiUrl}auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pushToken })
		});

		const { user } = await response.json();
		if (response.ok) storeAuthData(user);
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { authenticate };
