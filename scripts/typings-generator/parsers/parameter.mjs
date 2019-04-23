import { parseJSONObject } from './json-schema';

export function parseParameter(rawParameter, payload) {
	return parseJSONObject(rawParameter.name, rawParameter, {
		arrayUnion: true,
		...payload
	});
}

export default function parseParameters(rawParameters, payload) {
	if (!Array.isArray(rawParameters)) {
		return [];
	}

	return rawParameters.map(rawParameter => (
		parseParameter(rawParameter, payload)
	));
}
