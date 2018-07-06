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

## userId
Возвращает идентификатор пользователя

```js
attachment.userId; // => ?number
```

## albumId
Возвращает идентификатор альбома

```js
attachment.albumId; // => ?number
```

## text
Возвращает текст описания фотографии

```js
attachment.text; // => ?string
```

## date
Возвращает метку времени даты добавления фотографии

```js
attachment.date; // => ?number
```

## height
Возвращает ширину оригинала фотографии в пикселах

```js
attachment.getHeight; // => ?number
```

## width
Возвращает высоту оригинала фотографии в пикселах

```js
attachment.getWidth; // => ?number
```

## sizes
Возвращает размеры изображения

```js
attachment.sizes; // => ?Object[]
```

## smallPhoto
Возвращает URL-адрес маленькой фотографии (130 или 75)

```js
attachment.smallPhoto; // => ?string
```

## mediumPhoto
Возвращает URL-адрес средней фотографии (807 или 604 или меньше)

```js
attachment.mediumPhoto; // => ?string
```

## largePhoto
Возвращает URL-адрес большой фотографии (2560 или 1280 или меньше)

```js
attachment.largePhoto; // => ?string
```

## getSizes
Возвращает указанные размеры фотографий

```js
attachment.getSizes(sizeTypes); // => Object[]
```
