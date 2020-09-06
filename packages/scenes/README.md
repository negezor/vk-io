# VK-IO Scenes
<a href="https://www.npmjs.com/package/@vk-io/scenes"><img src="https://img.shields.io/npm/v/@vk-io/scenes.svg?style=flat-square" alt="NPM version"></a>
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/scenes"><img src="https://img.shields.io/npm/dt/@vk-io/scenes.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>

VK-IO Scenes - Simple implementation of middleware-based scene management 🎬

## Installation
> **[Node.js](https://nodejs.org/) 12.0.0 or newer is required**  

### Yarn
Recommended
```
yarn add @vk-io/scenes
```

### NPM
```
npm i @vk-io/scenes
```

## Example usage
```js
import { VK } from 'vk-io';

// Session implementation can be any
import { SessionManager } from '@vk-io/session';
import { SceneManager, StepScene } from '@vk-io/scenes';

const vk = new VK({
	token: process.env.TOKEN
});

const sessionManager = new SessionManager();
const sceneManager = new SceneManager();

vk.updates.on('message_new', sessionManager.middleware);

vk.updates.on('message_new', sceneManager.middleware);
vk.updates.on('message_new', sceneManager.middlewareIntercept); // Default scene entry handler

vk.updates.on('message_new', (context, next) => {
	if (context.text === '/signup') {
		return context.scene.enter('signup');
	}

	return next();
});

sceneManager.addScenes([
	new StepScene('signup', [
		(context) => {
			if (context.scene.step.firstTime || !context.text) {
				return context.send('What\'s your name?');
			}

			context.scene.state.firstName = context.text;

			return context.scene.step.next();
		},
		(context) => {
			if (context.scene.step.firstTime || !context.text) {
				return context.send('How old are you?');
			}

			context.scene.state.age = Number(context.text);

			return context.scene.step.next();
		},
		async (context) => {
			const { firstName, age } = context.scene.state;

			await context.send(`👤 ${firstName} ${age} ages`);

			return context.scene.step.next(); // Automatic exit, since this is the last scene
		}
	])
]);

vk.updates.start().catch(console.error);
```
