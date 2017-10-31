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
attachment.getUserId(); // => ?Number
```

## getAlbumId
Возвращает идентификатор альбома

```js
attachment.getAlbumId(); // => ?Number
```

## getText
Возвращает текст описания фотографии

```js
attachment.getText(); // => ?String
```

## getDate
Возращает дату добавления в формате Unixtime

```js
attachment.getDate(); // => ?Number
```

## getHeight
Возращает ширину оригинала фотографии в пикселах

```js
attachment.getHeight(); // => ?Number
```

## getWidth
Возращает высоту оригинала фотографии в пикселах

```js
attachment.getWidth(); // => ?Number
```

## getSmallPhoto
Возвращает URL-адрес маленькой фотографии (130 или 75)

```js
attachment.getSmallPhoto(); // => ?String
```

## getMediumPhoto
Возвращает URL-адрес средней фотографии (807 или 604 или меньше)

```js
attachment.getMediumPhoto(); // => ?String
```

## getLargePhoto
Возвращает URL-адрес большой фотографии (2560 или 1280 или меньше)

```js
attachment.getLargePhoto(); // => ?String
```
