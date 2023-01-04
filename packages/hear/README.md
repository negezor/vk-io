# VK-IO Hear

<a href="https://www.npmjs.com/package/@vk-io/hear"><img src="https://img.shields.io/npm/v/@vk-io/hear.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/actions/workflow/status/negezor/vk-io/tests.yml?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/hear"><img src="https://img.shields.io/npm/dt/@vk-io/hear.svg?style=flat-square" alt="NPM downloads"></a>

> VK-IO Hear - Simple implementation of the hears ⚙️

## 📦 Installation

> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required**

- **Using `npm`** (recommended)
  ```shell
  npm i @vk-io/hear
  ```
- **Using `Yarn`**
  ```shell
  yarn add @vk-io/hear
  ```
- **Using `pnpm`**
  ```shell
  pnpm add @vk-io/hear
  ```

## Example usage

```javascript
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
