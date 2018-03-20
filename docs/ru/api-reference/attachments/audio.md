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
| photo    | Object | [Объект аудиозапись](https://vk.com/dev/objects/audio) |
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
attachment.isHq(); // => ?boolean
```

## getArtist
Возвращает исполнителя

```js
attachment.getArtist(); // => ?string
```

## getTitle
Возвращает название композиции

```js
attachment.getTitle(); // => ?string
```

## getDuration
Возвращает длительность аудиозаписи в секундах

```js
attachment.getDuration(); // => ?number
```

## getTimestamp
Возвращает timestamp даты добавления аудиозаписи

```js
attachment.getTimestamp(); // => ?number
```

## getDate
Возвращает объект `Date` даты добавления аудиозаписи

```js
attachment.getDate(); // => ?Date
```

## getUrl
Возвращает ссылку на mp3

```js
attachment.getUrl(); // => ?string
```

## getLyricsId
Возвращает идентификатор текста аудиозаписи (если доступно)

```js
attachment.getLyricsId(); // => ?number
```

## getAlbumId
Возвращает идентификатор альбома, в котором находится аудиозапись (если присвоен)

```js
attachment.getAlbumId(); // => ?number
```

## getGenreId
Возвращает идентификатор жанра из [списка аудио жанров](https://vk.com/dev/objects/audio_genres)

```js
attachment.getGenreId(); // => ?number
```
