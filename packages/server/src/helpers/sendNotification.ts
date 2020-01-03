import fetch from 'node-fetch';
import { EmergencyType } from '../models';

export const sendNotification = async (
	pushToken: string,
	emergency: EmergencyType
) => {
	const response = await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			host: 'exp.host',
			Accept: 'application/json',
			'Accept-Encoding': 'gzip, deflate',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			to: pushToken,
			sound: 'default',
			body: 'There may be an emergency at/around your current location.',
			subtitle: `A user in this vicinity has requested help`,
			data: emergency
		})
	});
	const data = response.json();
	return data;
};
