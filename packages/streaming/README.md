# VK-IO Streaming
<a href="https://www.npmjs.com/package/@vk-io/streaming"><img src="https://img.shields.io/npm/v/@vk-io/streaming.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/negezor/vk-io/VK-IO CI?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/streaming"><img src="https://img.shields.io/npm/dt/@vk-io/streaming.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>

VK-IO Streaming API - Separated module for receiving data with Streaming API ⚙️

## Installation
> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required** 

### Yarn
Recommended
```
yarn add @vk-io/streaming
```

### NPM
```
npm i @vk-io/streaming
```

## Example usage
```js
import { VK } from 'vk-io';

import { StreamingAPI } from '@vk-io/streaming';

const vk = new VK({
	token: process.env.TOKEN
});

const streaming = new StreamingAPI({
	api: vk.api,
	updates: vk.updates
});

vk.updates.on('publication', (context) => {
	console.log('Streaming context', context);
});

async function run() {
	await streaming.startWebSocket();

	await streaming.addRule({
		tag: 'halloween',
		value: 'тыква'
	});
}

run().catch(console.error);
```
