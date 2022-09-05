<p align="center"><img src="https://raw.githubusercontent.com/negezor/vk-io/master/docs/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/v/vk-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/negezor/vk-io/VK-IO CI?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/dt/vk-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

> **VK-IO** - This is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the VK API 🚀

| 📖 [Documentation](https://negezor.github.io/vk-io/) | 🤖 [Examples](docs/examples/) |
| ---------------------------------------------------- | ----------------------------- |

## Features

1. **Complete.** `100%` coverage of the VK API
2. **Simple.** Predictable abstraction of VK API. 1 to 1 mapping of API method
   ```javascript
   vk.api.users.get({...})
   ```
3. **Reliable.** The library is written in **TypeScript** and covered by tests.
4. **Powerful.** Supports following additional features:
   - **Proxy** support via Custom Agents;
   - Automatic **request parallelization** for processing massive amounts of requests to API;
   - User [Authorization](./packages/authorization/README.md) (even with login and password);
   - [Ecosystem for bot development](#useful-modules-that-may-be-useful-to-you).

## 📦 Installation

> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required**

- **Using `npm`** (recommended)
  ```shell
  npm i vk-io
  ```
- **Using `Yarn`**
  ```shell
  yarn add vk-io
  ```
- **Using `pnpm`**
  ```shell
  pnpm add vk-io
  ```

## Example usage

```javascript
import { VK } from 'vk-io';

const vk = new VK({
	token: process.env.TOKEN
});

async function run() {
	const response = await vk.api.wall.get({
		owner_id: 1
	});

	console.log(response);
}

run().catch(console.log);
```

## Community

### Useful modules that may be useful to you

- [@vk-io/authorization](https://github.com/negezor/vk-io/tree/master/packages/authorization): Authorization by login & password, and etc...
- [@vk-io/streaming](https://github.com/negezor/vk-io/tree/master/packages/streaming): Receiving data with Streaming API
- [@vk-io/session](https://github.com/negezor/vk-io/tree/master/packages/session): Simple implementation of the sessions
- [@vk-io/scenes](https://github.com/negezor/vk-io/tree/master/packages/scenes): Simple implementation of middleware-based scene management
- [@vk-io/hear](https://github.com/negezor/vk-io/tree/master/packages/hear): Simple implementation of the hears
- [vk-io-question](https://github.com/fakemancat/vk-io-question): Simple promise-based prompt
- [vk-io-pages](https://github.com/MrZillaGold/vk-io-pages): Dynamic pages pagination module
- [henta](https://github.com/u14-team/henta): Simple VK bot engine
- [vk-io-redis-storage](https://github.com/xtcry/vk-io-redis-storage): Simple storage add-on for [@vk-io/session](packages/session)

> If you want to add your module in the list, create a [new issue](https://github.com/negezor/vk-io/issues/new) in the repository.
