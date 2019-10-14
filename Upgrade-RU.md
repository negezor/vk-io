# Upgrading to vk-io 4

## tl;dr
4 версия `vk-io` нацелена на более удобный опыт работы с ВКонтакте API. По этому переработана полностью работа с прикреплениями, транспорт получение новых событий (используя `Updates` совмещающий `Bots/User Long Poll` и `Callback API`), сниппеты и многое другое. При этом простые задачи остались обратно совместимыми ❤️

## Longpoll to Updates
Новый цикл получения события и транспорт в виде `middleware`

### Start polling (Long Poll)
До

```js
vk.longpoll.start();
```

После

```js
vk.updates.start();
```

### Event subscription

До

```js
vk.longpoll.on('message', (message) => {...});
```

После

```js
vk.updates.on('message', (context, next) => {});

```

### Simple bot

До

```js
vk.longpoll.on('message', (message) => {
	if (message.hasFlag('outbox')) {
		return;
	}

	const { text } = message;

	if (text === null) {
		return;
	}

	if (text.startWith('/start')) {
		return message.send('Hello!').catch(console.error);
	}
});
```

После

```js
vk.updates.hear('/start', async (context, next) => {
	await context.send('Hello!');
});
```

## Upgrade upload
На примере отправки изображения в диалог

До

```js
vk.upload.message({
	source: {
		value: './my-awesome-neko.jpg',
		options: {
			filename: 'myawesomeneko.jpg',
			contentType: 'image/jpeg'
		}
	}
})
.then((attachment) => {
	const attachment = vk.getAttachment(photo);
	const largePhotoUrl = vk.getLargePhoto(photo);

	return vk.api.messages.send({
		// ...

		message: `Large photo ${largePhotoUrl}`,
		attachment
	});
});
```

После

```js
vk.upload.messagePhoto({
	source: './my-awesome-neko.jpg'
})
.then(attachment => (
	vk.api.messages.send({
		// ...

		message: `Large photo ${attachment.largePhoto}`,
		attachment
	})
));
```

## Upgrade сollect
Теперь может работать и с сервисным токеном

До

```js
vk.collect.wall.get({
	user_id: 1
})
.on('data', (items) => {...});
```

После

```js
vk.collect.wall.get({
	user_id: 1
})
.on('data', ({ total, percent, received, items }) => {...});
```

## Upgrade errors

До

```js
const { ApiError } = require('vk-io/errors');

vk.api.messages.send()
.catch(ApiError, (error) => { // Bluebird sugar
	if (error.code === 100) { // Magic const :/
		return console.error(`Wrong parameter:`, error.params);
	}

	console.error(`ApiError №${error.code} ${error.message}`);
})
.catch(console.error)
```

После

```js
const { APIError, APIErrorCode } = require('vk-io');

vk.api.messages.send();
.catch((error) => { // Native promise
	if (error instanceof APIError) {
		if (error.code === APIErrorCode.WRONG_PARAMETER) {
			return console.error(`Wrong parameter:`, error.params);
		}

		return console.error(`APIError №${error.code} ${error.message}`);
	}

	console.error(error);
});
```
