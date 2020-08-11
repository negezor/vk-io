# Установка

## Зависимости

### Node.js
Требуется [Node.js](https://nodejs.org) версии **12.0.0** и выше

### TypeScript
Если вы используете [TypeScript](https://www.typescriptlang.org/), требуется версия **3.9.0** и выше

## NPM
Установка модуля из пакетного менеджера [NPM](https://www.npmjs.com/)

```bash
$ npm install vk-io
```

Или

```bash
$ yarn add vk-io
```

## Импорт
### CJS
```js
const { VK } = require('vk-io');

const vk = new VK({
	token: 'токен'
});

// ...
```

### ESM
```ts
import { VK } from 'vk-io';

const vk = new VK({
	token: 'токен'
});

// ...
```
