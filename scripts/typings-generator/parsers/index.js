const { parseJSONSchema, parseJSONObject } = require('./json-schema');

const { parseParameter, parseParameters } = require('./parameter');
const parseResponses = require('./response');

module.exports = {
	parseJSONSchema,
	parseJSONObject,

	parseParameter,
	parseParameters,
	parseResponses
};
