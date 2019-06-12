const { parseJSONObject } = require('./json-schema');

function parseParameter(rawParameter, payload) {
	return parseJSONObject(rawParameter.name, rawParameter, {
		arrayUnion: true,
		...payload
	});
}

function parseParameters(rawParameters, payload) {
	if (!Array.isArray(rawParameters)) {
		return [];
	}

	return rawParameters.map(rawParameter => (
		parseParameter(rawParameter, payload)
	));
}

module.exports = {
	parseParameter,
	parseParameters
};
