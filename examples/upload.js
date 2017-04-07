'use strict';

const fs = require('fs');
const request = require('request');

const vk = new (require('vk-io'));

vk.setToken('you bot token here');

/**
 * Upload photo for wall
 */
Promise.all([
	/* File */
	vk.upload.wall({
		source: '/path/to/cat.jpg'
	}),

	/* Stream */
	vk.upload.wall({
		source: fs.createReadStream('/path/to/cat2.jpg')
	}),

	/* Buffer */
	vk.upload.wall({
		source: fs.readFileSync('/path/to/cat3.jpg')
	}),

	/* Url */
	vk.upload.wall({
		source: 'http://lorempixel.com/400/200/cats/'
	}),

	/* Module request */
	vk.upload.wall({
		source: request('http://lorempixel.com/400/200/cats/')
	})
]);

/**
 * Set Content-Type or filename like this
 */
Promise.all([
	/* File */
	vk.upload.wall({
		source: {
			value: '/path/to/cat.jpg',
			options: {
				/* Set custom filename */
				filename: 'cat.jpg'
			}
		}
	}),

	/* Stream */
	vk.upload.wall({
		source: {
			value: fs.createReadStream('/path/to/cat2.jpg'),
			options: {
				/* Set custom Content-Type */
				contentType: 'image/jpeg'
			}
		}
	}),

	/* Buffer */
	vk.upload.wall({
		source: {
			value: {
				value: fs.readFileSync('/path/to/cat3.jpg'),
				/* Required maybe */
				options: {
					/* Set custom filename and Content-Type */
					filename: 'mycat.jpeg',
					contentType: 'image/jpeg'
				}
			}
		}
	}),

	/* Url */
	vk.upload.wall({
		source: {
			value: 'http://lorempixel.com/400/200/cats/',
			/* Required */
			options: {
				filename: 'my-random-cat.jpg',
				contentType: 'image/jpg'
			}
		}
	}),

	/* Module request */
	vk.upload.wall({
		source: {
			value: request('http://lorempixel.com/400/200/cats/'),
			/* Required */
			options: {
				filename: 'my-random-cat.jpg',
				contentType: 'image/jpg'
			}
		}
	})
]);
