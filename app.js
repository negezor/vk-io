'use strict';

const { inspect } = require('util');
const { VK, APIError } = require('./');

const vk = new VK;

// vk.setToken(/* Токен приложения */
// 	`01b8add201b8add201e51cde9101f50a66001b801b8add2591b66af11a917fb7df712a0`
// );

vk.setToken(/* Мой токен */
	`aa6394e1701069f31a79a6cdda2cda05017ffa9bec165d293498e54f3d8510450f0fd00cc927c2144249d`
);

vk.setOptions({
	apiMode: 'parallel'
});

function toJSON(obj) {
	log(JSON.stringify(obj));
}

function log(obj) {
	console.log(inspect(obj, { depth: null, colors: true }));
}
