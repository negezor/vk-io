# PhotoAttachment

```js
import { PhotoAttachment } from 'vk-io';
```

Наследует класс [Attachment](attachment.md)

## Constructor
Инициализация новой инстанции

```js
new PhotoAttachment(photo, vk);
```

| Параметр | Тип    | Описание                                              |
|----------|--------|-------------------------------------------------------|
| photo    | Object | [Объект фотографии](https://vk.com/dev/objects/photo) |
| vk       | VK     | Объект VK                                             |

Пример использования

```js
const [photo] = await vk.api.photos.getById({
	photos: '1_456264771'
});

new PhotoAttachment(photo, vk);
```

## getUserId
Возвращает идентификатор пользователя

```js
attachment.getUserId(); // => ?number
```

## getAlbumId
Возвращает идентификатор альбома

```js
attachment.getAlbumId(); // => ?number
```

## getText
Возвращает текст описания фотографии

```js
attachment.getText(); // => ?string
```

## getTimestamp
Возвращает timestamp даты добавления фотографии

```js
attachment.getTimestamp(); // => ?number
```

## getDate
Возвращает объект `Date` даты добавления фотографии

```js
attachment.getDate(); // => ?Date
```

## getHeight
Возвращает ширину оригинала фотографии в пикселах

```js
attachment.getHeight(); // => ?number
```

## getWidth
Возвращает высоту оригинала фотографии в пикселах

```js
attachment.getWidth(); // => ?number
```

## getSmallPhoto
Возвращает URL-адрес маленькой фотографии (130 или 75)

```js
attachment.getSmallPhoto(); // => ?string
```

## getMediumPhoto
Возвращает URL-адрес средней фотографии (807 или 604 или меньше)

```js
attachment.getMediumPhoto(); // => ?string
```

## getLargePhoto
Возвращает URL-адрес большой фотографии (2560 или 1280 или меньше)

```js
attachment.getLargePhoto(); // => ?string
```
