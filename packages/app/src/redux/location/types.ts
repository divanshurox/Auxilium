export const FETCH_LOCATION = 'FETCH_LOCATION';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';

interface FetchLocationAction {
	type: typeof FETCH_LOCATION;
}

interface FetchLocationSuccessAction {
	type: typeof FETCH_LOCATION_SUCCESS;
	payload: {
		coordinates: {
			longitude: number;
			latitude: number;
		};
	};
}

interface FetchLocationFailureAction {
	type: typeof FETCH_LOCATION_FAILURE;
	payload: {
		errorMessage: string;
	};
}

export interface LocationState {
	loading: boolean;
	coordinates: {
		longitude: number;
		latitude: number;
	};
	errorMessage: string;
}

export type LocationActionTypes =
	| FetchLocationAction
	| FetchLocationSuccessAction
	| FetchLocationFailureAction;
