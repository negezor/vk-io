# Updates

Базовый модуль получения событий из [User Long Poll](https://vk.com/dev/using_longpoll), [Bots Long Poll](https://vk.com/dev/bots_longpoll) и [Callback API](https://vk.com/dev/callback_api).

## Описание типов
[API Reference [EN]](http://negezor.github.io/vk-io/references/vk-io/classes/updates.html)

## Инициализация
[Опции конструктора](http://negezor.github.io/vk-io/references/vk-io/interfaces/iupdatesoptions.html)

```ts
import { API, Upload, Updates } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const upload = new Upload({
	api
});

const updates = new Updates({
	api,

	upload
});
```

## Концепт

Класс является обобщением всех трёх способов получения событий в одном интерфейсе. События приходят в унифицированных контекстах, у каждого контекста есть основной тип события и его подтипы. За счёт этого вы можете указать основной тип события и вы будете получать все его подтипы. Или можно указать только подтип.

```ts
// События по типу
updates.on('message', (context) => {
	// context.type // message
	// context.subTypes // ['message_new']
});

// События по подтипу
updates.on('message_new', (context) => {
	// context.type // message
	// context.subTypes // ['message_new']
});
```

### Middleware

Сперва может показатся что класс является инстанцией [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter), но это не так. Модуль использует цепочку [middleware](https://en.wikipedia.org/wiki/Middleware). Это позволяет более элегантно обрабатывать события, а именно:

- [Обработка ошибок](https://github.com/negezor/vk-io/blob/master/docs/examples/advanced/middleware-error-fallback.js)
- Фильтрация событий
- [Модификация контекста](https://github.com/negezor/vk-io/blob/master/docs/examples/advanced/context-modification.js)
- Вызывать какие-то действие после работы главных обработчиков

Простой пример с модификацией контекста:
```ts
updates.on('message', (context, next) => {
	context.myProp = 1;

	return next();
});

updates.on('message', (context, next) => {
	console.log('My prop', context.myProp); // 1
});
```

Основным методом для работы с цепочкой является [.use()](https://negezor.github.io/vk-io/references/vk-io/classes/updates.html#use), именно через него проходят все установленные события, по этому стоит внимательно относится в действиях внутри него.

Пример неправильной работы:

```ts
updates.use((context, next) => {
	if (!context.isOutbox) {
		return;
	}

	return next();
});

// Больше никогда не вызовется, так как у этого контекста нет свойства `isOutbox`
updates.on('like', () => {...});
```

Исправить это достаточно просто, можно использовать сразу метод [.on()](https://negezor.github.io/vk-io/references/vk-io/classes/updates.html#on) или напрямую вызывать [context.is()](https://negezor.github.io/vk-io/references/vk-io/classes/context.html#is)

```ts
updates.use((context, next) => {
	if (context.is(['message']) && !context.isOutbox) {
		return;
	}

	return next();
});

// Теперь контекст дойдёт до этого middleware
updates.on('like', () => {...});
```

С использованием [.on()](https://negezor.github.io/vk-io/references/vk-io/classes/updates.html#on)

```ts
updates.on('message', (context, next) => {
	if (!context.isOutbox) {
		return;
	}

	return next();
});

// Теперь контекст дойдёт до этого middleware
updates.on('like', () => {...});
```

::: warning Внимание
Важно что бы middleware возвращал [Promise](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise), если обработка событий будет дальше передана по цепочке, так как без этого невозможно будет отследить правильно ошибки/дождатся окончательного завершения запроса для других middleware.
:::

## Список событий

Библиотека полностью соотвествует офицальныи названиям событий для групп, посмотреть их можно [здесь](https://vk.com/dev/groups_events).

## Webhook (Callback API)

В настройках группы нужно выставить версию Callback API выше `5.130` и включить нужные события

> Предназначен для групп

> Имеет полный набор данных

### Запуск встроеного сервера

```ts
updates.start({
	webhook: {
		// ...
		path: '/super-secret-webhook-path'
	}
});
```

### Использование express middleware

```ts
app.post('/super-secret-webhook-path', updates.getWebhookCallback());
```

### Использование koa middleware
Предполагается что вы уже разобрали тело запроса например через [koa-body](https://github.com/dlau/koa-body)

```ts
router.post('/super-secret-webhook-path', updates.getKoaWebhookMiddleware())
```

### Использование нативного веб сервера

```ts
http.createServer(updates.getWebhookCallback('/super-secret-webhook-path'));
```

## Polling (Bots Long Poll)

В настройках группы нужно выставить версию Bots Long Poll API выше `5.130` и включить нужные события

> Предназначен для групп

> Имеет полный набор данных

:::tip Совет
По умолчанию произойдёт автоматическое определение `pollingGroupId` для запуска Bots Long Poll, для избежания дополнительного запроса стоит передавать его заранее.
:::

```ts
updates.start();
```

## Polling (User Long Poll)

В отличии от Bots Long Poll и Callback API данные приходят частично, это стоит учитывать. Нужно перезагружать события или прикрипления для получения полного объекта, по умолчанию с них доступны только ID.

> Предназначен для страниц пользователей

> Имеет частичный набор данных

```ts
updates.startPolling();
```

## Ручная передача событий 

Если по каким-то причинам вам не подошли предыдущие автоматические способы получения событий, вы можете их передавать библиотеке вручную с помощью [updates.handleWebhookUpdate()](https://negezor.github.io/vk-io/references/vk-io/classes/updates.html#handlewebhookupdate) или [updates.handlePollingUpdate()](https://negezor.github.io/vk-io/references/vk-io/classes/updates.html#handlepollingupdate)
