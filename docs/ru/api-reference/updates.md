# Updates

```js
const { updates } = vk;
```

## isStarted
Запущено ли получение обновлений

```js
updates.isStarted(); // => Boolean
```

## startPolling
Запускает запрос сервера для получения обновлений

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

| Параметр | Тип      | Описание    |
|----------|----------|-------------|
| options  | Object   | Опции       |
| next     | Function | Обработчик  |

Если адрес не задан, то будет использоваться `/`

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
| path     | String | Адрес webhook'а | null         |

Пример использования

```js
http.createServer(updates.getWebhookCallback('/webhook'));
```

```js
app.use('/webhook', updates.getWebhookCallback());
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
| events   | String[] | Список событий |
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
| name     | String   | Строка которую сверяет |
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
