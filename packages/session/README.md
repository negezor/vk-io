# VK-IO Session
<a href="https://www.npmjs.com/package/@vk-io/session"><img src="https://img.shields.io/npm/v/@vk-io/session.svg?style=flat-square" alt="NPM version"></a>
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/session"><img src="https://img.shields.io/npm/dt/@vk-io/session.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>

VK-IO Session - Simple implementation of the sessions ⚙️

## Installation
> **[Node.js](https://nodejs.org/) 8.0.0 or newer is required**  

### Yarn
Recommended
```
yarn add @vk-io/session
```

### NPM
```
npm i @vk-io/session
```

## Example usage
```js
import { VK } from 'vk-io';

import { SessionManager } from '@vk-io/session';

const vk = new VK({
	token: process.env.TOKEN
});

const sessionManager = new SessionManager();

vk.updates.on('message', sessionManager.middleware);

vk.updates.hear('/counter', async (context) => {
	const { session } = context;

	if (!session.counter) {
		session.counter = 0;
	}

	session.counter += 1;

	await context.send(`You turned to the bot (${session.counter}) times`);
});

vk.updates.start().catch(console.error);
```
