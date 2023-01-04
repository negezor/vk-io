# VK-IO Session
<a href="https://www.npmjs.com/package/@vk-io/session"><img src="https://img.shields.io/npm/v/@vk-io/session.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/actions/workflow/status/negezor/vk-io/tests.yml?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/session"><img src="https://img.shields.io/npm/dt/@vk-io/session.svg?style=flat-square" alt="NPM downloads"></a>

> VK-IO Session - Simple implementation of the sessions ⚙️

## 📦 Installation

> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required**

- **Using `npm`** (recommended)
  ```shell
  npm i @vk-io/session
  ```
- **Using `Yarn`**
  ```shell
  yarn add @vk-io/session
  ```
- **Using `pnpm`**
  ```shell
  pnpm add @vk-io/session
  ```

## Example usage
```javascript
import { VK } from 'vk-io';

import { SessionManager } from '@vk-io/session';

const vk = new VK({
	token: process.env.TOKEN
});

const sessionManager = new SessionManager();

vk.updates.on('message_new', sessionManager.middleware);

vk.updates.on('message_new', async (context, next) => {
	if (context.text !== '/counter') {
		return next();
	}
	
	const { session } = context;

	if (!session.counter) {
		session.counter = 0;
	}

	session.counter += 1;

	await context.send(`You turned to the bot (${session.counter}) times`);
});

vk.updates.start().catch(console.error);
```

## Community
### Useful modules that may be useful to you

* [vk-io-redis-storage](https://github.com/xtcry/vk-io-redis-storage): Simple storage add-on for [@vk-io/session](packages/session)

> If you want to add your module in the list, create a [new issue](https://github.com/negezor/vk-io/issues/new) in the repository.
