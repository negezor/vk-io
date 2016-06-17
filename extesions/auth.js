'use strict';

/* Список разрешений (полный) */
exports._authScope = [
	'notify',
	'friends',
	'photos',
	'audio',
	'video',
	'docs',
	'notes',
	'pages',
	'left_menu',
	'status',
	'offers',
	'questions',
	'wall',
	'groups',
	'messages',
	'email',
	'notifications',
	'stats',
	'ads',
	'market',
	'offline'
];

exports.auth = function(){
	return new this.promise((resolve,reject) => {
		var
		set = this.settings,
		jar = this.request.jar(),
		request = this.request.defaults({
			method: 'POST',
			followAllRedirects: true,
			jar: jar,
			timeout: 6000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36'
			}
		});

		var response = (resp) => {
			var token = require('querystring').parse(resp.request.uri.hash)['#access_token'];

			set.token = token;

			resolve(token);
		};

		var aceptAccess = ($) => {
			var script = $('script[type="text/javascript"][language="javascript"]').text();
			var grantAccess = script.match(/location\.href = \"(.*)\";/)[1].replace('&cancel=1','');

			return request({
				uri: grantAccess,
				method: 'POST',
				resolveWithFullResponse: true
			})
			.then(response)
			.catch(() => {
				aceptAccess($);
			});
		};

		var formCompile = ($) => {
			var $form = $('form[action][method="POST"]');
			var $inputs = $form.find('input[name]');

			var qs = {};

			$inputs.each(function(){
				var $elem = $(this);

				qs[$elem.attr('name')] = $elem.attr('value');
			});

			qs.email = set.email;
			qs.pass = set.pass;

			request({
				uri: $form.attr('action'),
				method: 'POST',
				qs: qs,
				transform: (page) => {
					return this.cheerio.load(page);
				}
			})
			.then(aceptAccess)
			.catch(() => {
				formCompile($);
			});
		};

		request({
			uri: 'https://oauth.vk.com/authorize',
			method: 'GET',
			qs: {
				client_id: set.app,
				redirect_uri: 'https://oauth.vk.com/blank.html',
				scope: this._authScope.join(','),
				v: set.version,
				response_type: 'token',
				display: 'page'
			},
			transform: (page) => {
				return this.cheerio.load(page);
			}
		})
		.then(formCompile)
		.catch(reject);
	});
};
