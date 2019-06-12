const { parseJSONObject } = require('./json-schema');

const { toPascalCase } = require('../utils/helpers');

module.exports = function parseResponses(rawResponses, payload) {
	if (!rawResponses) {
		return [];
	}

	return Object.entries(rawResponses)
		.map(([key, value]) => (
			parseJSONObject(toPascalCase(key), value.properties.response, payload)
		));
};
