# VideoAttachment

```js
import { VideoAttachment } from 'vk-io';
```

Наследует класс [Attachment](attachment.md)

## Constructor
Инициализация новой инстанции

```js
new VideoAttachment(video, vk);
```

| Параметр | Тип    | Описание                                               |
|----------|--------|--------------------------------------------------------|
| photo    | Object | [Объект видеозаписи](https://vk.com/dev/objects/video) |
| vk       | VK     | Объект VK                                              |

Пример использования

```js
const [video] = await vk.api.video.get({
	photos: '1_456264771'
});

new VideoAttachment(video, vk);
```

## isRepeat
Проверяет, является ли видео зацикленным

```js
attachment.isRepeat(); // => ?boolean
```

## isCanAdd
Проверяет может ли пользователь добавить видеозапись себе

```js
attachment.isCanAdd(); // => ?boolean
```

## isCanEdit
Проверяет может ли пользователь редактировать видеозапись

```js
attachment.isCanEdit(); // => ?boolean
```

## isProcessing
Проверяет, обрабатывается ли видео

```js
attachment.isProcessing(); // => ?boolean
```

## isBroadcast
Проверяет, является ли видео трансляцией

```js
attachment.isBroadcast(); // => ?boolean
```

## isUpcoming
Проверяет что трансляция скоро начнётся

```js
attachment.isUpcoming(); // => ?boolean
```

## getTitle
Возвращает название видеозаписи

```js
attachment.getTitle(); // => ?string
```

## getDescription
Возвращает описание видеозаписи

```js
attachment.getDescription(); // => ?string
```

## getDuration
Возвращает длительность ролика в секундах

```js
attachment.getDuration(); // => ?number
```

## getTimestamp
Возвращает timestamp дату создания видеозаписи

```js
attachment.getTimestamp(); // => ?number
```

## getDate
Возвращает объект `Date` дату создания видеозаписи

```js
attachment.getDate(); // => ?Date
```

## getAddingTimestamp
Возвращает timestamp даты добавления видеозаписи

```js
attachment.getAddingTimestamp(); // => ?number
```

## getAddingDate
Возвращает объект `Date` даты добавления видеозаписи

```js
attachment.getAddingDate(); // => ?Date
```

## getViewsCount
Возвращает количество просмотров видеозаписи

```js
attachment.getViewsCount(); // => ?number
```

## getCommentsCount
Возвращает количество комментариев к видеозаписи

```js
attachment.getCommentsCount(); // => ?number
```

## getPlayer
Возвращает URL страницы с плеером, который можно использовать для воспроизведения ролика в браузере

```js
attachment.getPlayer(); // => ?string
```

## getPlatformName
Возвращает название платформы (для видеозаписей, добавленных с внешних сайтов)

```js
attachment.getPlatformName(); // => ?string
```
