# VK-IO Stateless Prompt 
<a href="https://www.npmjs.com/package/@vk-io/stateless-prompt"><img src="https://img.shields.io/npm/v/@vk-io/stateless-prompt.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/negezor/vk-io/VK-IO CI?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/stateless-prompt"><img src="https://img.shields.io/npm/dt/@vk-io/stateless-prompt.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>

VK-IO Stateless Prompt - Simple implementation of middleware-based stateless prompt

## How it works

The basic concept is to send your message with a special text at the end. Then the user replies to the message, the bot checks message for a special text at the end of a reply message. If the message contains a special text, it calls a handler with a user message. If it doesn't contain a special text, then it skips. This is all!

![Example](https://user-images.githubusercontent.com/9392723/134985949-e5cf1758-0469-428e-85ed-12229e36e58b.png)

## Installation
> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required** 

### Yarn
Recommended
```
yarn add @vk-io/stateless-prompt
```

### NPM
```
npm i @vk-io/stateless-prompt
```

## Example usage
```js
import { VK } from 'vk-io';

import { StatelessPromptManager } from '@vk-io/stateless-prompt';

const vk = new VK({
	token: process.env.TOKEN
});

const namePrompt = new StatelessPromptManager({
	slug: 'name',
	handler: (context, next) => {
		if (!context.text) {
			return context.send('Please reply your name with text to previous message');
		}

		return context.send(`Your name is ${context.text}`);
	}
});

vk.updates.on('message_new', namePrompt.middlewareIntercept);

vk.updates.on('message_new', (context, next) => {
	if (context.text === '/signup') {
		return context.send('What\'s your name? Please reply to this message. ' + namePrompt.suffix);
	}

	return next();
});

vk.updates.start().catch(console.error);
```
