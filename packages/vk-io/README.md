<p align="center"><img src="https://raw.githubusercontent.com/negezor/vk-io/master/docs/logo.svg?sanitize=true"></p>
<p align="center">
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/v/vk-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/dt/vk-io.svg?style=flat-square" alt="NPM downloads"></a>
<a href="https://www.codacy.com/app/negezor/vk-io"><img src="https://img.shields.io/codacy/grade/25ee36d46e6e498981a74f8b0653aacc.svg?style=flat-square" alt="Code quality"></a>
</p>

VK-IO - This is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the VK API 🚀

| 📖 [Documentation](https://github.com/negezor/vk-io/tree/master/docs) | 🤖 [Examples](https://github.com/negezor/vk-io/tree/master/docs/examples) |
|---------------------------|---------------------------|

## Features
- 100% coverage of the VKontakte API
- Predictable abstraction
- Works with large collections of data
- Support for all types of authorization, including via login and password
- Typings

## Installation
> **[Node.js](https://nodejs.org/) 8.0.0 or newer is required**  

### Yarn
Recommended
```
yarn add vk-io
```

### NPM
```
npm i vk-io
```

## Example usage
```js
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

* [@vk-io/authorization](../authorization): Authorization by login & password, and etc... 
* [@vk-io/streaming](../streaming): Receiving data with Streaming API
* [@vk-io/session](../session): Simple implementation of the sessions
* [@vk-io/scenes](../scenes): Simple implementation of middleware-based scene management

> If you want to add your module in the list, create a [new issue](https://github.com/negezor/vk-io/issues/new) in the repository.
