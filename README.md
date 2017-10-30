<p align="center"><img src="https://github.com/negezor/vk-io/raw/master/logo.png?raw=true"></p>
<p align="center">
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/v/vk-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/dt/vk-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

VK-IO - This is a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the VK API 🚀

| 📖 [Documentation](docs/) | 🤖 [Examples](examples/) |
|----------------------------|--------------------------|

## Features
- 100% coverage of the VKontakte API
- Predictable abstraction
- Working with large collections of data
- Support for all types authorization of login and password

## Installation
**[Node.js](https://nodejs.org/) 8.0.0 or newer is required**  

### Yarn
Recommended, auto assembly
```shell
yarn add vk-io
```

### NPM
```shell
npm install vk-io --save
```

## Example usage
```js
import VK from 'vk-io';

const vk = new VK();

vk.setToken(process.env.TOKEN);

async function run() {
	const response = await vk.api.wall.get({
		owner_id: 1
	});

	console.log(response);
}

run().catch(console.log); // async/await "sugar"
```
