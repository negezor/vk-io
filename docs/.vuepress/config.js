module.exports = {
	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#title
	 */
	title: 'VK-IO',

	/**
	 * Ref：https://v1.vuepress.vuejs.org/config/#description
	 */
	description: 'Modern VK API SDK for Node.js',

	base: '/vk-io/',

	/**
	 * Extra tags to be injected to the page HTML `<head>`
	 *
	 * ref：https://v1.vuepress.vuejs.org/config/#head
	 */
	head: [
		['meta', {
			name: 'theme-color',
			content: '#44668D'
		}],
		['meta', {
			name: 'apple-mobile-web-app-capable',
			content: 'yes'
		}],
		['meta', {
			name: 'apple-mobile-web-app-status-bar-style',
			content: 'black'
		}],
		// ['link', {
		// 	rel: 'stylesheet',
		// 	href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/fontawesome.min.css',
		// 	integrity: 'sha512-8jdwayz5n8F2cnW26l9vpV6+yGOcRAqz6HTu+DQ3FtVIAts2gTdlFZOGpYhvBMXkWEgxPN3Y22UWyZXuDowNLA==',
		// 	crossorigin: 'anonymous'
		// }]
	],

	/**
	 * Theme configuration, here is the default theme configuration for VuePress.
	 *
	 * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
	 */
	themeConfig: {
		logo: '/logo.svg',
		repo: 'negezor/vk-io',
		editLinks: false,
		docsDir: '',
		editLinkText: '',
		lastUpdated: true,
		nav: [
			{
				text: 'Guide [RU]',
				link: '/ru/guide/introduction',
			},
			{
				text: 'Community [RU]',
				items: [
					{
						text: 'Telegram [RU]',
						link: 'https://t.me/vkio_ru',
					}
				]
			},
			{
				text: 'References',
				link: '/references/'
			},
			{
				text: 'Examples',
				link: 'https://github.com/negezor/vk-io/tree/master/docs/examples',
			},
		],
		sidebar: {
			'/ru/guide/': [
				{
					title: 'Основы',
					collapsable: false,
					children: [
						'/ru/guide/introduction',
						'/ru/guide/installation',
						'/ru/guide/modules',
						'/ru/guide/api',
						'/ru/guide/updates',
						'/ru/guide/keyboard',
						'/ru/guide/utils'
					]
				},
				{
					title: 'Миграции',
					collapsable: false,
					children: [
						'/ru/guide/migration-to-v4'
					]
				}
			]
		},
		locales: {
			'/': {
				label: 'English',
			},
			'/ru/': {
				label: 'Русский'
			}
		}
	},

	cache: false,

	locales: {
		'/': {
			lang: 'en-US',
			title: 'VK-IO',
			description: 'Modern VK API SDK for Node.js'
		},
		'/ru/': {
			lang: 'ru-RU',
			label: 'Русский',
			title: 'VK-IO',
			description: 'Modern VK API SDK for Node.js'
		}
	},

	/**
	 * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
	 */
	plugins: [
		'@vuepress/plugin-back-to-top',
		'@vuepress/plugin-medium-zoom',
	]
}
