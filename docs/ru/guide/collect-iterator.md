# Collect Iterator

Хелпер модуль позволяющий упростить получение данных

## Описание типов

[API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/index.html#createcollectiterator)

## Концепт

Множество методов возвращают только часть данных, и для получения остальной части — нужно указывать смещение. Для этого в библиотеке есть итератор который автоматический ставит смещение.

## Пример

```ts
import { API, createCollectIterator } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const iterator = createCollectIterator({
	api,
	
	method: 'messages.getConversations',
	params: {
		// Будет получать profiles и groups
		extended: 1
	},

	// Максимальный count в методе
	countPerRequest: 200,

	// Устанавливайте опцию для методов которые не позволяет получить больше N данных, например `users.search`
	// maxCount: 1000,

	// Количество попыток вызвать снова при ошибке
	// retryLimit: 3,

	// Количество паралельных вызовов если поддерживается execute
	// parallelRequests: 25
});

for await (const chunk of iterator) {
	// chunk.received
	// chunk.percent
	// chunk.total

	// chunk.items
	// chunk.profiles
	// chunk.groups
}
```
