# AudioAttachment

```js
import { AudioAttachment } from 'vk-io';
```

Наследует класс [Attachment](attachment.md)

## Constructor
Инициализация новой инстанции

```js
new AudioAttachment(audio, vk);
```

| Параметр | Тип    | Описание                                               |
|----------|--------|--------------------------------------------------------|
| audio    | Object | [Объект аудиозапись](https://vk.com/dev/objects/audio) |
| vk       | VK     | Объект VK                                              |

Пример использования

```js
const [audio] = await vk.api.audio.getById({
	audios: '1_123456789'
});

new AudioAttachment(audio, vk);
```

## isHq
Проверяет, является ли запись в высоком качестве

```js
attachment.isHq; // => ?boolean
```

## artist
Возвращает исполнителя

```js
attachment.artist; // => ?string
```

## title
Возвращает название композиции

```js
attachment.title; // => ?string
```

## duration
Возвращает длительность аудиозаписи в секундах

```js
attachment.duration; // => ?number
```

## createdAt
Возвращает метку времени даты добавления аудиозаписи

```js
attachment.createdAt; // => ?number
```

## url
Возвращает ссылку на mp3

```js
attachment.url; // => ?string
```

## lyricsId
Возвращает идентификатор текста аудиозаписи (если доступно)

```js
attachment.lyricsId; // => ?number
```

## albumId
Возвращает идентификатор альбома, в котором находится аудиозапись (если присвоен)

```js
attachment.albumId; // => ?number
```

## genreId
Возвращает идентификатор жанра из [списка аудио жанров](https://vk.com/dev/objects/audio_genres)

```js
attachment.genreId; // => ?number
```
