import { parseJSONObject } from './json-schema';

import { toPascalCase } from '../utils/helpers';

export default function parseResponses(rawResponses, payload) {
	if (!rawResponses) {
		return [];
	}

	return Object.entries(rawResponses)
		.map(([key, value]) => (
			parseJSONObject(toPascalCase(key), value.properties.response, payload)
		));
}
