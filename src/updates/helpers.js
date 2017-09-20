'use strict';

const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;

/**
 * Decodes HTML entities
 *
 * @param {string} text
 *
 * @return {string}
 */
export const unescapeHTML = (text) => (
	text
	.replace(lt, '<')
	.replace(qt, '>')
	.replace(br, '\n')
	.replace(amp, '&')
	.replace(quot, '"')
);
