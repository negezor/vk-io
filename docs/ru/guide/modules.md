# Модули

Библиотека разбита на модули, мы можете использовать их по отдельности, главное передать необходимые зависимости.

## API

Базовый модуль [запросов](https://vk.com/dev/api_requests), позволяет вызывать методы API.

```ts
import { VK } from 'vk-io';

const vk = new VK({
	token: process.env.TOKEN
});

const users = await vk.api.users.get({
	user_ids: 1
});
```

[Более подробно](./api)

## Upload

Базовый модуль для [загрузки](https://vk.com/dev/upload_files), позволяет:
- Загружать файлы на стену (фото/документ)
- Загружать фото в альбом
- Загружать файлы в личные сообщения (фото/документ/граффити/голосовое сообщение)
- Загружать видео/истории/аудио/документы
- Устанавливать обложку сообщества
- Устанавливать главное фото сообщества/пользователя/беседы/товара/опроса

```ts
import { VK } from 'vk-io';

const vk = new VK({
	token: process.env.TOKEN
});

const attachment = await vk.upload.messagePhoto({
	peer_id: ...,
	source: {	
		value: './cat.jpeg'
	}
});
```

[Более подробно](./upload)

## Updates

Базовый модуль для получения обновлений, поддерживает:
- [Callback API](https://vk.com/dev/callback_api)
- [Bots Long Poll](https://vk.com/dev/bots_longpoll)
- [User Long Poll](https://vk.com/dev/using_longpoll)

```ts
import { VK } from 'vk-io';

const vk = new VK({
	token: process.env.TOKEN
});

vk.updates.on('message_new', async (context) => {
	if (context.text === 'Привет') {
		await context.send('Привет!');
	}
});

await vk.updates.start();
```

[Более подробно](./updates)

## Collect

Базовый модуль для работы с коллекциями, позволяет:
- Вызывать множество однотипных методов через [execute](http://vk.com/dev/execute)
- Цепочка вызовов с контролируемым результатом запроса через [execute](http://vk.com/dev/execute)
- Итератор сбора данных с методов которые поддерживают limit/offset

[Более подробно](./collect)

## Utils

[Базовые утилиты](./utils)
