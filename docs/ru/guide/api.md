# API

Базовый модуль [запросов](https://vk.com/dev/api_requests), позволяет вызывать [методы API](https://vk.com/dev/methods).

## Описание типов
[API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/classes/api.html)

## Инициализация
[Опции конструктора](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html)

```ts
import { API } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});
```

## Концепт

Класс предоставляет алиасы для методов API ВКонтакте. Достаточно скопировать интересующий вас метод из документации и вызвать подобным образом:

```ts
const users = await api.users.get({
	user_ids: 1
});

console.log(users) // [{ id: 1, first_name: 'Павел', last_name: 'Дуров' }]
```

Что произошло? Дело в том что `api.users` это прокси объект, который возвращает вам анонимную функцию в которой объединяет название группы и свойство которое вы указали. Как если бы вы написали так:

```ts
const users = await api.call('users.get', {
	user_ids: 1
});

console.log(users) // [{ id: 1, first_name: 'Павел', last_name: 'Дуров' }]
```

::: warning Внимание
Вы вполне можете вызвать метод `api.users.blablabla()`, но единственное что вам это даст — это ошибку о том что метод не найден, так что будьте осторожнее.
:::

## Execute

Метод принимает обязательный параметр `code`, остальные переданные параметры будут доступны через объект `Args` внутри `code`. 

В отличии от остальных методов, [execute](https://negezor.github.io/vk-io/references/vk-io/classes/api.html#execute) возвращает данные в формате:
```ts
export interface IExecuteResponse<T> {
	response: T;
	errors: ExecuteError[];
}
```

### Хранимые процедуры

Вызов хранимых процедур вашего приложения осуществляется с помощью метода [procedure](https://negezor.github.io/vk-io/references/vk-io/classes/api.html#procedure)

```ts
await api.procedure('important', {
	// Аргументы будут доступны в Args
});

// Как если бы мы вызвали
// await api.call('execute.important', {});
```

## Ограничения запросов

По умолчанию библиотека ограничивает количество запросов до `3` в секунду, этот лимит соотвествует пользовательским страницам и сервисным токенам.

Для групповых токенов лимит составляет `20`, установить его можно через опцию [apiLimit](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apilimit):

```ts
import { API } from 'vk-io';

const api = new API({
	token: process.env.TOKEN,

	apiLimit: 20
});
```

## Режимы работы
Библиотека предоставляет множество режимов работы под разные ситуации. Установить режим работы можно через опцию [apiMode](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apimode) в конструкторе.

```ts
import { API } from 'vk-io';

const api = new API({
	token: process.env.TOKEN,

	apiMode: 'sequential'
});
```

### sequential
> Режим работы по умолчанию

Вызывает все методы последовательно, 1 метод — 1 запрос

### parallel

объединяет методы в [execute](https://vk.com/dev/execute), позволяет вызывать до `25` методов включительно. Максимальное количество методов в `execute` контролируется опцией [apiExecuteCount](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apiexecutecount), [1..25] методов — 1 запрос

### parallel_selected

Схож по работе с [parallel](#parallel), за исключением того, что в [execute](https://vk.com/dev/execute) будут попадать методы из опции [apiExecuteMethods](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apiexecutemethods), а остальные через [sequential](#sequential).

## Режим запросов

Вы можете контролировать, с какой периодичностью будут вызываться запросы. Установить режим работы можно через опцию [apiRequestMode](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apirequestmode) в конструкторе.

```ts
import { API } from 'vk-io';

const api = new API({
	token: process.env.TOKEN,

	apiRequestMode: 'sequential'
});
```

### sequential
> Режим работы по умолчанию

Вызывает методы последовательно с выдержкой равной `1 секунда / apiMode`.

### burst

Параллельно отправляет методы на API во весь доступный лимит с опции [apiLimit](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#apilimit).

::: warning Внимание
С данным режимом API ВКонтакте может работать нестабильно и вы будете получать EAI_AGAIN ошибку.
:::

## Использование прокси

Для того, чтобы использовать прокси, достаточно передать опцию [agent](https://negezor.github.io/vk-io/references/vk-io/interfaces/iapioptions.html#agent) в конструктор. Это должен быть [HTTPS Agent](https://nodejs.org/api/https.html#https_class_https_agent). На примере модуля [https-proxy-agent](https://npm.im/https-proxy-agent).

```ts
import { API } from 'vk-io';

import HttpsProxyAgent from 'https-proxy-agent';

const agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
// const agent = new HttpsProxyAgent('https://168.63.76.32:3128');

const api = new API({
	token: process.env.TOKEN,

	agent
});
```

## Обработка капчи

::: warning Внимание
Изображение по ссылке должно быть загружено только один раз, иначе это сгенерирует новый ключ капчи
:::

```ts
import { API, CallbackService } from 'vk-io';

const callbackService = new CallbackService();

const api = new API({
	token: process.env.TOKEN,

	callbackService
});

callbackService.onCaptcha(async (payload, retry) => {
	
	const key = await myAwesomeCaptchaHandler(payload.src);

	try {
		await retry(key);

		console.log('Капча успешно решена');
	} catch (error) {
		console.log('Капча не решена');
	}
});
```

## Использование APIRequest
Вам может понадобится контролировать запрос на всех стадиях, или иметь удобную оболочку для создания [execute](https://vk.com/dev/execute) методов.

[API Reference](https://negezor.github.io/vk-io/references/vk-io/classes/apirequest.html)

### Ручной вызов API
```ts
import { API, APIRequest } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const request = new APIRequest({
	api,

	method: 'users.get',
	params: {
		user_ids: 1
	}
});

const response = await api.make();

// На каждую инстацию APIRequest создаётся Promise, доступен через свойства
// request.resolve();
// request.reject();
// await request.promise;
```

### Получение execute метода

```ts
import { API, APIRequest } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const request = new APIRequest({
	api,

	method: 'users.get',
	params: {
		user_ids: 1
	}
});

const method = String(request); // API.users.get({"user_ids":1})
```
