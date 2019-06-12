import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import mapStyle from './mapStyle';
import MapMarker from './MapMarker';

const { width, height } = Dimensions.get('window');

interface NearbyMapProps {
	coordinates: EmergencyCoordinates;
	emergencies: Emergency[];
}

const renderMarkers = (emergencies: Emergency[] = []) => {
	if (!emergencies) return null;
	return emergencies.map((emergency: Emergency, index: number) => {
		const [longitude, latitude] = emergency.location.coordinates;
		return (
			<Marker key={index} coordinate={{ longitude, latitude }}>
				<MapMarker size={16} />
			</Marker>
		);
	});
};

const NearbyMap = (props: NearbyMapProps) => {
	const {
		coordinates: { longitude, latitude },
		emergencies = []
	} = props;

	const [region, setRegion] = React.useState<Region | undefined>(undefined);

	const onRegionChange = (region: Region) => {
		setRegion(region);
	};

	return (
		<MapView
			style={styles.map}
			customMapStyle={mapStyle}
			provider='google'
			showsUserLocation
			initialRegion={{
				longitude,
				latitude,
				longitudeDelta: 0.00353,
				latitudeDelta: 0.00568
			}}
			onRegionChange={onRegionChange}
			{...{ region }}
			pitchEnabled={false}
			rotateEnabled={false}
			scrollEnabled={false}
			zoomEnabled={false}
		>
			{renderMarkers(emergencies)}
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		height: height / 2,
		width: 0.9 * width,
		borderRadius: 6
	}
});

export default NearbyMap;