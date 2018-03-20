# DocumentAttachment

```js
import { DocumentAttachment } from 'vk-io';
```

Наследует класс [Attachment](attachment.md)

## Constructor
Инициализация новой инстанции

```js
new DocumentAttachment(document, vk);
```

| Параметр | Тип    | Описание                                          |
|----------|--------|---------------------------------------------------|
| photo    | Object | [Объект документ](https://vk.com/dev/objects/doc) |
| vk       | VK     | Объект VK                                         |

Пример использования

```js
const [document] = await vk.api.audio.getById({
	audios: '1_123456789'
});

new DocumentAttachment(document, vk);
```

## isText
Проверяет, является ли документ текстовым

```js
attachment.isText(); // => ?boolean
```

## isArchive
Проверяет, является ли документ архивом

```js
attachment.isArchive(); // => ?boolean
```

## isGif
Проверяет, является ли документ gif файлом

```js
attachment.isGif(); // => ?boolean
```

## isImage
Проверяет, является ли документ изображением

```js
attachment.isImage(); // => ?boolean
```

## isGraffiti
Проверяет, является ли документ граффити

```js
attachment.isGraffiti(); // => ?boolean
```

## isAudio
Проверяет, является ли документ аудиозаписью

```js
attachment.isAudio(); // => ?boolean
```

## isVoice
Проверяет, является ли документ голосовой записью

```js
attachment.isVoice(); // => ?boolean
```

## isVideo
Проверяет, является ли документ видеозаписью

```js
attachment.isVideo(); // => ?boolean
```

## isBook
Проверяет, является ли документ электронной книгой

```js
attachment.isBook(); // => ?boolean
```

## getTitle
Возвращает название документа

```js
attachment.getTitle(); // => ?string
```

## getTimestamp
Возвращает timestamp даты добавления документа

```js
attachment.getTimestamp();
```

## getDate
Возвращает объект `Date` даты добавления документа

```js
attachment.getDate(); // => ?number
```

## getTypeId
Возвращает идентификатор типа документа

```js
attachment.getTypeId(); // => ?number
```

## getTypeName
Возвращает название типа документа

```js
attachment.getTypeName(); // => ?string
```

## getSize
Возвращает размер документа в байтах

```js
attachment.getSize(); // => ?number
```

## getExtension
Возвращает расширение документа

```js
attachment.getExtension(); // => ?string
```

## getUrl
Возвращает адрес документа

```js
attachment.getUrl(); // => ?string
```

## getPreview
Возвращает превью документа

```js
attachment.getPreview(); // => ?Object
```
