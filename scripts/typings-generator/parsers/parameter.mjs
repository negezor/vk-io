import { parseJSONObject } from './json-schema';

export function parseParameter(rawParameter) {
	return parseJSONObject(rawParameter.name, rawParameter);
}

export default function parseParameters(rawParameters) {
	if (!Array.isArray(rawParameters)) {
		return [];
	}

	return rawParameters.map(parseParameter);
}
