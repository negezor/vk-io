import { defineUserConfig } from 'vuepress'

import { defaultTheme } from '@vuepress/theme-default';

import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';

export default defineUserConfig({
	title: 'VK-IO',

	description: 'Modern VK API SDK for Node.js',

	base: '/vk-io/',

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
		}]
	],

	theme: defaultTheme({
		logo: '/logo.svg',
		repo: 'negezor/vk-io',
		docsDir: '',
		lastUpdated: true,
		contributors: false,
		navbar: [
			{
				text: 'Guide [RU]',
				link: '/ru/guide/introduction',
			},
			{
				text: 'Community',
				children: [
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
					text: 'Основы',
					collapsible: false,
					children: [
						'/ru/guide/introduction',
						'/ru/guide/installation',
						'/ru/guide/modules',
						'/ru/guide/api',
						'/ru/guide/upload',
						'/ru/guide/updates',
						'/ru/guide/keyboard',
						'/ru/guide/collect',
						'/ru/guide/attachments',
						'/ru/guide/contexts',
						'/ru/guide/utils'
					]
				},
				{
					text: 'Миграции',
					collapsible: false,
					children: [
						'/ru/guide/migration-to-v4'
					]
				}
			]
		},
		locales: {
			'/': {
				selectLanguageName: 'English',
				editLinkText: 'Edit',
			},
			'/ru/': {
				selectLanguageName: 'Русский',
				editLinkText: 'Редактировать',
				lastUpdatedText: 'Последнее обновление'
			}
		}
	}),

	locales: {
		'/': {
			lang: 'en-US',
			title: 'VK-IO',
			description: 'Modern VK API SDK for Node.js'
		},
		'/ru/': {
			lang: 'ru-RU',
			title: 'VK-IO',
			description: 'Современный VK API SDK для Node.js'
		}
	},

	plugins: [
		backToTopPlugin(),
		mediumZoomPlugin()
	]
});
