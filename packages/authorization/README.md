# VK-IO Authorization

<a href="https://www.npmjs.com/package/@vk-io/authorization"><img src="https://img.shields.io/npm/v/@vk-io/authorization.svg?style=flat-square" alt="NPM version"></a>
<a href="https://github.com/negezor/vk-io/actions/workflows/tests.yml"><img src="https://img.shields.io/github/workflow/status/negezor/vk-io/VK-IO CI?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/@vk-io/authorization"><img src="https://img.shields.io/npm/dt/@vk-io/authorization.svg?style=flat-square" alt="NPM downloads"></a>

> VK-IO Authorization API - Separated module for authorization by login & password, and etc... ⚙️

## 📦 Installation

> **[Node.js](https://nodejs.org/) 12.20.0 or newer is required**

- **Using `Yarn`** (recommended)
  ```shell
  yarn add @vk-io/authorization
  ```
- **Using `npm`**
  ```shell
  npm i @vk-io/authorization
  ```
- **Using `pnpm`**
  ```shell
  pnpm add @vk-io/authorization
  ```

## Example usage

```javascript
import { CallbackService } from 'vk-io';
import { DirectAuthorization, officialAppCredentials } from '@vk-io/authorization';

const callbackService = new CallbackService();

const direct = new DirectAuthorization({
	callbackService: callbackService,

	scope: 'all',

	// Direct authorization is only available for official applications
	...officialAppCredentials.android, // { clientId: string; clientSecret: string; }

	// Or manually provide app credentials
	// clientId: process.env.CLIENT_ID,
	// clientSecret: process.env.CLIENT_SECRET,

	login: process.env.LOGIN,
	password: process.env.PASSWORD
});

async function run() {
	const response = await direct.run();

	console.log('Token:', response.token);
	console.log('Expires:', response.expires);

	console.log('Email:', response.email);
	console.log('User ID:', response.userId);
}

run().catch(console.error);
```

## Additional info

The module also supports `ImplicitFlowUser`, `ImplicitFlowGroup` and `AccountVerification`
