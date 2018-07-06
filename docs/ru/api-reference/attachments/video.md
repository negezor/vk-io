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
attachment.isRepeat; // => ?boolean
```

## isCanAdd
Проверяет может ли пользователь добавить видеозапись себе

```js
attachment.isCanAdd; // => ?boolean
```

## isCanEdit
Проверяет может ли пользователь редактировать видеозапись

```js
attachment.isCanEdit; // => ?boolean
```

## isProcessing
Проверяет, обрабатывается ли видео

```js
attachment.isProcessing; // => ?boolean
```

## isBroadcast
Проверяет, является ли видео трансляцией

```js
attachment.isBroadcast; // => ?boolean
```

## isUpcoming
Проверяет что трансляция скоро начнётся

```js
attachment.isUpcoming; // => ?boolean
```

## title
Возвращает название видеозаписи

```js
attachment.title; // => ?string
```

## description
Возвращает описание видеозаписи

```js
attachment.description; // => ?string
```

## duration
Возвращает длительность ролика в секундах

```js
attachment.duration; // => ?number
```

## date
Возвращает метку времени даты создания видеозаписи

```js
attachment.date; // => ?number
```

## addingDate
Возвращает  метку времени даты добавления видеозаписи

```js
attachment.addingDate; // => ?number
```

## viewsCount
Возвращает количество просмотров видеозаписи

```js
attachment.viewsCount; // => ?number
```

## commentsCount
Возвращает количество комментариев к видеозаписи

```js
attachment.commentsCount; // => ?number
```

## player
Возвращает URL страницы с плеером, который можно использовать для воспроизведения ролика в браузере

```js
attachment.player; // => ?string
```

## platformName
Возвращает название платформы (для видеозаписей, добавленных с внешних сайтов)

```js
attachment.platformName; // => ?string
```
