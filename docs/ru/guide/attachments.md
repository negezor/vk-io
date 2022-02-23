# Attachments

Описание принципов работы с прикреплениями

## Описание типов
[Attachment API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/classes/Attachment.html)
[ExternalAttachment API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/classes/ExternalAttachment.html)

## Концепция

Есть два базовых класса для работы с прикреплениями:
- [Attachment](https://negezor.github.io/vk-io/references/vk-io/classes/Attachment.html) — основной класс, может быть прикреплением `attachment1234_1234_1234`
	- [PollAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/PollAttachment.html)
	- [WallAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/WallAttachment.html)
	- [PhotoAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/PhotoAttachment.html)
	- [AudioAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/AudioAttachment.html)
	- [StoryAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/StoryAttachment.html)
	- [VideoAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/VideoAttachment.html)
	- [MarketAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/MarketAttachment.html)
	- [GraffitiAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/GraffitiAttachment.html)
	- [DocumentAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/DocumentAttachment.html)
	- [MarketAlbumAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/MarketAlbumAttachment.html)
	- [AudioMessageAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/AudioMessageAttachment.html)
- [ExternalAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/ExternalAttachment.html) второстепенный класс, без возможности прикрепления. Обычно можно получить только с самого ВКонтакте API.
	- [GiftAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/GiftAttachment.html)
	- [LinkAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/LinkAttachment.html)
	- [StickerAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/StickerAttachment.html)
	- [WallReplyAttachment](https://negezor.github.io/vk-io/references/vk-io/classes/WallReplyAttachment.html)

```ts
const attachment = new Attachment({
	// api,

	type: 'photo',
	payload: {
		id: 1,
		owner_id: 100,
		// access_key: 'accessKey'
	}
});

// attachment.isFilled(); // => false
```

Формат прикреплений ВКонтакте очень простой, `${type}${ownerId}_${id}_${accessKey}`. В основном идёт работа с без ключ доступа (`_${accessKey}`), пример прикрепления фотографии с ID `1`, которая принадлежит пользователю с ID `100` (`photo100_1`). Несколько прикреплений передаются через запятую `photo100_1,doc100_5`.

Вы можете вручную получать такой формат, например для всех прикриплений `${attachment.type}${attachment.ownerId}_${attachment.id}`. Но это делать не нужно, так как у класса [Attachment](https://negezor.github.io/vk-io/references/vk-io/classes/Attachment.html) есть метод [toString](https://negezor.github.io/vk-io/references/vk-io/classes/Attachment.html#toString), он автоматический вёрнёт данный формат.

```ts
attachment.toString(); // photo100_1
// Или
String(attachment); // photo100_1
```

Это так же будет работать с массивами при приведении их к строке

```ts
[attachment, 'doc100_5'].toString(); // photo100_1,doc100_5
// Или
String([attachment, 'doc100_5']); // photo100_1,doc100_5
```

Помимо ручного преобразования, мы можем положиться на автоматическое приведение к строке в методах API

```ts
await api.messages.send({
	peer_id: <peer_id>,
	// Здесь будет photo100_1
	attachment

	// Ручное преобразование одного прикрепления
	// attachment: attachment.toString()
	// attachment: String(attachment)

	// Ручное преобразование массива прикреплений
	// attachment: [attachment].toString()
	// attachment: String([attachment])
});

// Можно передавать так же в массиве
await api.messages.send({
	peer_id: <peer_id>,
	// Здесь будет photo100_1,doc100_5
	attachment: [
		attachment,
		'doc100_5'
	]
});
```

::: warning Внимание
Прикрепления могут содержать не полные данные, если например вы получаете их с User Long Poll. Проверить можно через `attachment.isFilled();`
:::

## Получение прикрепления из строки

```ts
Attachment.fromString('photo100_1'); // => Attachment<photo, 100, 1>
```

## Можно ли прикрепить

```ts
attachment.canBeAttached(); // => boolean
```

## Сравнение двух прикреплений

```ts
attachment1.equals(attachment2); // => boolean
// Или
attachment1.equals('photo100_1'); // => boolean
```

## Полные ли данные содержит прикрепление

```ts
attachment.isFilled(); // => boolean
```

## Сериализация прикрепления

```ts
JSON.stringify(attachment); // => object
```
