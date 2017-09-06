'use strict';

const { inspect } = require('util');
const { VK, APIError } = require('./');

log(require('./'));

const vk = new VK;

vk.setOptions({
	token: 'c1db8e4d068873515bc5d425ca2254efcfbf4ae3bf2cf84f6b73706f786311206dda84f945579ee902d39'
});

// vk.api.call('users.get', {
// 	one: 1,
// 	two: 2,
// 	three: 3,
// 	four: 4,
// 	five: 5,
// 	six: 6,
// 	seven: 7,
// 	eit: 8,
// 	nith: 9,
// 	tan: 10
// })
// .then((data) => {
// 	console.log('Users', data);
// })
// .catch(toJSON);

setTimeout(() => {
	const error = new APIError({
		error_code: 14,
		error_msg: 'Wrong parameter missing',
		params: [],
		captcha_img: 'https://vk.com/photo1234_1234',
		captcha_sid: 123
	});

	toJSON(error);
});

function toJSON(obj) {
	log(JSON.stringify(obj));
}

function log(obj) {
	console.log(inspect(obj, { depth: null, colors: true }));
}
