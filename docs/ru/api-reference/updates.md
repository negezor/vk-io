# Updates

```js
const { updates } = vk;
```

## isStarted
Запущено ли получение обновлений

```js
updates.isStarted(); // => boolean
```

## startPolling
Запускает запрос сервера для получения обновлений

Если вам нужно использовать Bots Long Poll API для этого нужно передать свойство [pollingGroupId](./vk.md#Опции-polling-user-long-poll-api-и-bots-long-poll-api)

> Обратите внимание

> Если вы используете Webhook не получится запустить одновременно опрос

```js
updates.startPolling(); // => Promise
```

## startWebhook
Запускает webhook сервер

```js
updates.startWebhook(options, next); // => Promise
```

| Параметр | Тип      | Описание          |
|----------|----------|-------------------|
| options  | Object   | Опции             |
| next     | Function | Переброс запросов |

Опции

| Свойство | Тип    | Описание                                                            |
|----------|--------|---------------------------------------------------------------------|
| tls      | Object | [TLS Options Server](https://nodejs.org/docs/latest/api/https.html) |
| path     | string | Путь обработки запроса                                              |
| port     | number | Порт сервера                                                        |
| host     | string | Хост сервера                                                        |

Если адрес не задан, то будет использоваться `/`

```js
updates.startWebhook({
	path: '/super-secret-webhook-path'
});
```

Если запрос не будет обработан, он будет передан в этот `callback`. В случае его отсутствия будет ответ `HTTP Response 403`

```js
updates.startWebhook({...}, (req, res) => {
	// ...
});
```

## start
Запускает `Polling` или `Webhook` сервер

```js
updates.start(options); // => Promise
```

| Параметр | Тип      | Описание          |
|----------|----------|-------------------|
| options  | Object   | Опции             |

Опции

| Свойство | Тип    | Описание                                                            |
|----------|--------|---------------------------------------------------------------------|
| webhook  | Object | Опции передаваемые в [startWebhook](#startWebhook) |

Если передано свойство `webhook`, то будет запупущен сервер с `Webhook`. Иначе `Polling` с автоматическим определением `pollingGroupId`
> Для быстрого запуска, стоит передавать опцию `pollingGroupId` заранее

```js
// Webhook
updates.start({
	webhook: {
		path: '/some-secret'
	}
}); // => Promise

// Polling
updates.start(); // => Promise
```

## stop
Останавливает любое получение обновлений

```js
updates.stop(); // => Promise
```

## getWebhookCallback
Возвращает callback совместимый с `express` и стандартным `http[s].createServer()`

```js
updates.getWebhookCallback(path); // => Function
```

| Параметр | Тип    | Описание        | По умолчанию |
|----------|--------|-----------------|--------------|
| path     | string | Адрес webhook'а | null         |

Пример использования

```js
http.createServer(updates.getWebhookCallback('/webhook'));
```

```js
app.use('/webhook', updates.getWebhookCallback());
```

## getKoaWebhookMiddleware

Возвращает [middleware](https://github.com/koajs/koa#middleware) для [koa.js](https://github.com/koajs/koa)

Предполагается что вы уже разобрали тело запроса например через [koa-body](https://github.com/dlau/koa-body)

```js
updates.getKoaWebhookMiddleware(options); // => Function
```

| Параметр | Тип    | Описание     |
|----------|--------|--------------|
| options  | Object | Список опций |

Пример использования

```js
app.use(updates.getKoaWebhookMiddleware());
```

С роутером

```js
router.post('/webhook', updates.getKoaWebhookMiddleware());
```

## use
Добавляет middleware в цепочку

```js
updates.use(middleware); // => this
```

| Параметр   | Тип      | Описание    |
|------------|----------|-------------|
| middleware | Function | Middleware  |

Пример использования

```js
updates.use(async (context, next) => {
	// ...

	await next();

	// Код после обработки middleware
});
```

| Параметр | Тип                            | Описание                          |
|----------|--------------------------------|-----------------------------------|
| context  | [Context](contexts/context.md) | Контекст                          |
| next     | Function                       | Переходит к следующему middleware |

## on
Подписывает на события (type, subTypes)

```js
updates.on(events, handler);
```

| Параметр | Тип      | Описание       |
|----------|----------|----------------|
| events   | string[] | Список событий |
| handler  | Function | Middleware     |

Пример использования

```js
// Подписывается на событие с type=message
updates.on('message', async (context, next) => {...});

// OR

// Подписывается на событие с subTypes=[photo]
updates.on(['photo'], async (context, next) => {...});
```

## hear
Подписывает на событие `type=message` с поиском в `context.text`

Пример использования со строкой `context.text === '!test'`

```js
updates.hear(text, handler);
```

| Параметр | Тип      | Описание               |
|----------|----------|------------------------|
| name     | string   | Строка которую сверяет |
| handler  | Function | Middleware             |


```js
updates.hear('!test', async (context, next) => {...})
```

Пример использования с RegExp `pattern.test(context.text)`

```js
updates.hear(pattern, handler);
```

| Параметр | Тип      | Описание       |
|----------|----------|----------------|
| pattern  | RegExp   | Паттерн поиска |
| handler  | Function | Middleware     |


```js
updates.hear(/!test (.+)/i, async (context, next) => {...})
```

Результат будет доступен в `context.$match`

Пример использования с функцией `func(context.text, context)`

```js
updates.hear(func, handler);
```

| Параметр | Тип      | Описание   |
|----------|----------|------------|
| func     | Function | Функция    |
| handler  | Function | Middleware |

```js
updates.hear(
	(value, context) => {
		return value.startsWith('!test');
	},
	async (context, next) => {...}
);
```

Пример использования с объектом условий применяющихся к контексту

```js
updates.hear(obj, handler);
```

| Параметр | Тип      | Описание          |
|----------|----------|-------------------|
| obj      | Object   | Объект условий    |
| handler  | Function | Middleware        |

```js
updates.hear(
	{
		isChat: true,
		// Some for value
		text: [
			'one',
			/two/,
			text => text === 'three'
		],
		// Every for array value
		'user.permissions': ['visible.that', 'change.that'],
		// Get value from array
		'path.to.array[0]': value => isNeedValue(value),
	},
	async (context, next) => {...}
);
```

## setHearFallbackHandler

Устанавливает обработчик который вызывается если не одна команда из `hear` не подошла

```js
updates.setHearFallbackHandler(handler);
```

| Параметр | Тип      | Описание   |
|----------|----------|------------|
| handler  | Function | Middleware |

Пример использования

```js
updates.setHearFallbackHandler(async (context, next) => {
	await context.send('Такой команды нет :(');
});
```
