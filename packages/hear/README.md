# VK-IO Hear
<a href="https://www.npmjs.com/package/@vk-io/hear"><img src="https://img.shields.io/npm/v/@vk-io/hear.svg?style=flat-square" alt="NPM version"></a>
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/hear"><img src="https://img.shields.io/npm/dt/@vk-io/hear.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>

VK-IO Hear - Simple implementation of the hears ⚙️

## Installation
> **[Node.js](https://nodejs.org/) 12.0.0 or newer is required**  

### Yarn
Recommended
```
yarn add @vk-io/hear
```

### NPM
```
npm i @vk-io/hear
```

## Example usage
```js
import { VK, MessageContext } from 'vk-io';

import { HearManager } from '@vk-io/hear';

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager<MessageContext>();

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear(/^hello$/, async (context) => {
	await context.send('Hello!');
});

vk.updates.start().catch(console.error);
```
