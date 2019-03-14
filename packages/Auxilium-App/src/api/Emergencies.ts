import { Alert } from 'react-native';
import { Constants } from 'expo';
import env from '../../env';

export interface Coordinates {
	longitude: number;
	latitude: number;
}

export interface Emergency {
	deviceId: string;
	coordinates: Coordinates;
}

const getNearbyEmergencies = async (
	coordinates: Coordinates
): Promise<Emergency[] | void> => {
	try {
		const response = await fetch(`${env.apiUrl}emergencies/get`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ coordinates })
		});
		const { emergencies } = await response.json();
		return emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const getUserHistory = async () => {
	try {
		const response = await fetch(
			`${env.apiUrl}emergencies/history?deviceId=${Constants.deviceId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { emergencies } = await response.json();
		return emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { getNearbyEmergencies, getUserHistory };
