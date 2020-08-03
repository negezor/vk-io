const { VK } = require('vk-io');
const fetch = require('node-fetch');

const fs = require('fs');

const vk = new VK({
	token: process.env.TOKEN
});

/**
 * Sets custom uploadUrl or timeout
 */
vk.upload.photoAlbum({
	source: {
		// uploadUrl: '<custom upload url>',
		// timeout: 60e3,
		values: [
			// Examples of parameters below
			{
				value: '<value>'
			}
		]
	}
});

/**
 * Uploads photo for wall
 *
 * Auto filename and contentType
 */
Promise.all([
	/* File path */
	vk.upload.wallPhoto({
		source: {
			value: './path/to/cat1.jpg'
		}
	}),

	/* File stream */
	vk.upload.wallPhoto({
		source: {
			value: fs.createReadStream('./path/to/cat2.jpg')
		}
	}),

	/* Buffer */
	vk.upload.wallPhoto({
		source: {
			value: fs.readFileSync('./path/to/cat3.jpg')
		}
	}),

	/* URL */
	vk.upload.wallPhoto({
		source: {
			value: 'http://lorempixel.com/400/200/cats/'
		}
	}),

	/* URL Buffer */
	fetch('http://lorempixel.com/400/200/cats/')
		.then(response => response.buffer())
		.then(buffer => (
			vk.upload.wallPhoto({
				source: {
					value: buffer
				}
			})
		)),

	/* URL Stream */
	fetch('http://lorempixel.com/400/200/cats/')
		.then(response => (
			vk.upload.wallPhoto({
				source: {
					value: response.body,
					contentLength: response.headers.get('content-length')
				}
			})
		))
]);

/**
 * Uploads photo for wall with contentType and filename
 */
Promise.all([
	/* File path */
	vk.upload.wallPhoto({
		// jpeg at dat file
		source: {
			values: {
				value: './path/to/cat1.dat',
				contentType: 'image/jpeg',
				filename: 'cat1.jpg'
			}
		}
	}),

	/* File stream */
	vk.upload.wallPhoto({
		// png at file without extensions
		source: {
			values: {
				value: fs.createReadStream('./path/to/cat2'),
				contentType: 'image/png',
				filename: 'cat2.png'
			}
		}
	})

	// ...etc
]);

/**
 * Uploads multiple files (current only photoAlbum)
 */
vk.upload.photoAlbum({
	source: {
		timeout: 1e3 * 60,
		values: [
			{
				value: './path/to/cat1.jpg'
			},

			{
				value: 'http://lorempixel.com/400/200/cats/'
			},

			{
				value: fs.createReadStream('./path/to/cat2.jpg')
			},

			{
				value: fs.createReadStream('./path/to/cat2.jpg'),
				filename: 'cat2.jpg'
			},

			{
				value: './path/to/cat5.dat',
				contentType: 'image/jpeg',
				filename: 'cat5.jpg'
			}
		]
	}
});
