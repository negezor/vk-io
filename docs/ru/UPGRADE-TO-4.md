# Обновление до v4

VK-IO v4 — это следующее мажорное обновление. Ниже приведён список критических изменений, который поможет вам обновиться.

## TL;DR

- Были произведены серьёзные изменения в типизации библиотеки
- Библиотека теперь полностью следует [immutable](https://ru.wikipedia.org/wiki/%D0%9D%D0%B5%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D1%8F%D0%B5%D0%BC%D1%8B%D0%B9_%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82) принципу.
- Каждые компонент теперь не зависит от основной инстанции `VK`
- Убраны лишние компоненты в пользу простых функций (например `resolveResource()` или `createCollectIterator()`)

<details>
<summary>Если ещё короче</summary>

![cheems meme](https://user-images.githubusercontent.com/9392723/89174354-6d7cd480-d5d1-11ea-8336-9ad40152b812.png)
</details>

## Breaking Сhanges
### Поддержка Node.js 12 и выше
Библиотека поддерживает теперь только Node.js 12 и выше.

### VK
- Удалён геттер/сеттер `vk.token`
- Удалён метод `vk.setOptions()`
- Удалён сеттер `vk.captchaHandler`, используйте метод `vk.callbackService.onCaptcha()`
- Удалён сеттер `vk.twoFactorHandler`, используйте метод `vk.callbackService.onTwoFactor()`
- Удалён модуль `vk.auth`, используйте вместо этого пакет [@vk-io/authorization](https://github.com/negezor/vk-io/tree/master/packages/authorization)
- Удалён модуль `vk.streaming`, используйте вместо этого пакет [@vk-io/streaming](https://github.com/negezor/vk-io/tree/master/packages/streaming)
- Удалён экспорт по умолчанию, используйте именованный
```diff
- import VK from 'vk-io';
+ import { VK } from 'vk-io';
```
- Удалён `vk.snippets.resolveResource()`, вместо модуля добавлена функция `resolveResource()`
Принимает опции вида:
```ts
interface IResolveResourceOptions {
	resource: string | number;
	api?: API;
}
```
Например
```ts
import { resolveResource } from 'vk-io';

const result = await resolveResource({
	// Объект API
	api,

	resource: 'https://vk.com/durov'
});
```
- Удалён `vk.collect`, модуль разбит на мелкие классы и функции
- - **collect.chain()** - используйте класс `new Chain()`
```ts
import { Chain } from 'vk-io';

const chain = new Chain({
	// Объект API
	api
});
```
- - **collect.executes()** - используйте функцию `executes()`
Принимает опции вида:
```ts
interface IExecutesOptions {
	api: API;

	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	queue: Record<string, any>[];
}
```
Например
```ts
import { executes } from 'vk-io';

const result = await executes({
	// Объект API
	api,
	
	method: 'users.get',
	queue: [
		{ user_id: 1 },
		{ user_id: 2 },
		{ user_id: 3 },
		// ...
	]
});
```
- - **collect.*.*()** - используйте функцию `createCollectIterator()`
Принимает опции вида:
```ts
interface ICollectIteratorOptions {
	api: API;

	method: string;
	params: Record<string, any> & {
		count?: number;
		offset?: number;
	};

	maxCount?: number;
	countPerRequest: number;

	retryLimit?: number;
	parallelRequests?: number;
}
```
Например
```ts
import { createCollectIterator } from 'vk-io';

const iterator = createCollectIterator({
	// Объект API
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

### API
- Переименование опции **apiAttempts** в **apiRetryLimit**
- Удалён геттер `vk.api.API_VERSION`
- Enum `APIErrorCode` теперь автоматический генерируется из [схемы](https://github.com/VKCOM/vk-api-schema)
- Объкты схемы теперь экспортируются в своих namespace `Params`, `Objects` и `Responses`
- Удалена автоматическая верификация аккаунта, используйте `@vk-io/authorization` класс `AccountVerification`
- Удалена автоматическая установка `random_id` в `api.messages.send()`, используйте вместо этого функцию `getRandomId()`
```ts
import { getRandomId } from 'vk-io';

const result = await api.messages.send({
	peer_id: 1234,
	random_id: getRandomId(),

	text: 'Hello!'
});
```

### APIRequest
- Конструктор теперь принимает опции вида:
```ts
interface IAPIRequestOptions {
	api: API;

	method: string;
	params: Record<string, any>;
}
```
- Удалён алиас `Request`, используйте `APIRequest`

### Attachment & ExternalAttachment
- Конструктор теперь принимает опции вида:
```ts
interface ISharedAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;
}

interface IAttachmentOptions<P, Type extends string = string> {
	api: API;

	type: Type;
	payload: Partial<ISharedAttachmentPayload> & P;
}
```

### DocumentAttachment
- Удалён геттер `document.typeName`

### Context
- Конструктор теперь принимает опции вида:
```ts
interface IContextOptions<
	P,
	S,
	Type extends string = string,
	SubType extends string = string
> {
	api: API;
	upload: Upload;

	type: Type;
	subTypes: SubType[];

	payload: P;
	state?: S;

	source: UpdateSource;
	updateType: string | number;

	groupId?: number;
}
```
- Метод `context.is()` принимает теперь массив типов

### MessageContext
- Метод `context.send()` теперь возвращает инстанцию `MessageContext`
- Геттер `context.replyMessage` теперь возвращает `MessageContext` вместо `MessageReply`
- Геттер `context.forwards` теперь возвращает массив `MessageContext` вместо `MessageForward`
- Удалён метод `context.getInviteLink()`
- Удалён метод `context.markAsImportant()`
- Удалён метод `context.renameChat()`
- Удалён метод `context.newChatPhoto()`
- Удалён метод `context.deleteChatPhoto()`
- Удалён метод `context.inviteUser()`
- Удалён метод `context.kickUser()`
- Удалён метод `context.pinMessage()`
- Удалён метод `context.unpinMessage()`
- Удалён метод `context.editMessageText()`
- Удалён метод `context.sendSticker()`, используйте `context.send({ sticker_id: 123 })`

### CommentActionContext
- Переименован в `CommentContext`

### CommentContext
- Удалён геттер `context.userId`, используйте `context.fromId`
- Удалён геттер `context.removerUserId`, используйте `context.deleterUserId`


### MessageAllowContext
- Переименован в `MessageSubscriptionContext`

### MessageSubscriptionContext
- Тип `message_subscribers` переименован в `message_subscription`

### Keyboard
- Удалена константа `Keyboard.DEFAULT_COLOR`, используйте `Keyboard.SECONDARY_COLOR`

### Updates
- Все контексты теперь используют `undefined` вместо `null` для удобной деструктуризации, например:
```ts
updates.on('message_new', async (context) => {
	const { text = 'default text' } = context;

	if (text === 'default text') {
		return context.send('Вы ничего не написали');
	}
	
	await context.send('Hello!');
});
```
- Удалён метод `updates.hear()` и `updates.setHearFallbackHandler()`, используйте вместо этого пакет [@vk-io/hear](https://github.com/negezor/vk-io/tree/master/packages/hear)
- Теперь используются [официальные именования событий](https://vk.com/dev/groups_events)
Например
```ts
updates.on('message_new', async (context) => {
	await context.send('Hello!');
});
```
- Удален второй аргумент у `updates.startWebhook()`, вместо этого передавайте функцию в свойство `next`
```ts
updates.startWebhook({
	// ...
	next(req, res) {
		// ...
	}
})
```

- Переименование опции **pollingAttempts** в **pollingRetryLimit**

### Upload
- Методы `upload.storiesPhoto()` и `upload.storiesVideo()` теперь возвращают `StoryAttachment`
- Удалён метод `upload.graffiti()`, используйте вместо него `upload.documentGraffiti()` или `upload.messageGraffiti()` 
- Изменился формат `source`, теперь он принимает только два интерфейса:
```ts
upload.messagePhoto({
	source: {
		value: 'https://picsum.photos/200/300/?image=1',

		// filename: 'image.jpeg',
		// contentType: 'image/jpeg'

		// contentLength?: number;
	}
})
```
Или
```ts
upload.messagePhoto({
	source: {
		// uploadUrl?: string;
		// timeout?: number;
		
		// Свойство values может быть массивом если загрузка в альбом
		values: {
			value: 'https://picsum.photos/200/300/?image=1',

			// filename: 'image.jpeg',
			// contentType: 'image/jpeg

			// contentLength?: number;
		}
	}
})
```
- У элемента в `source` появилось свойство `contentLength`, позволяет указать размер загружаемого файла
> Если вы используете поток который не предоставляет информации о размере в байтах, вам следует указать свойство `contentLength`, так как иначе файл не будет загружен.
> Это особенно актуально для метода `upload.video()`

### Callback Service
- Используйте метод `callbackService.onCaptcha()` вместо сеттера `callbackService.captchaHandler`
- Используйте метод `callbackService.onTwoFactor()` вместо сеттера `callbackService.twoFactorHandler`

### Удалённые экспорты
- Удалён экспорт `attachmentTypes`, используйте `AttachmentType`
- Удалён экспорт `defaultExtensions`, используйте `DefaultExtension`
- Удалён экспорт `defaultContentTypes`, используйте `DefaultContentType`
- Удалён экспорт `captchaTypes`, используйте `CaptchaType`
- Удалён экспорт `messageSources`, используйте `MessageSource`
- Удалён экспорт `resourceTypes`, используйте `ResourceType`
- Удалён экспорт `updatesSources`, используйте `UpdateSource`
- Удалён экспорт `apiErrors`, используйте `APIErrorCode`
- Удалён экспорт `uploadErrors`, используйте `UploadErrorCode`
- Удалён экспорт `updatesErrors`, используйте `UpdatesErrorCode`
- Удалён экспорт `snippetsErrors`, используйте `ResourceErrorCode`
- Удалён экспорт `sharedErrors`, используйте `SharedErrorCode`
