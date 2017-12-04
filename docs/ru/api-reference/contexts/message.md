# MessageContext

```js
import { MessageContext } from 'vk-io';
```

## Updates

- Событие `message`
- Возможные подтипы `text`, `doc`, `gift`, `link`, `wall`, `photo`, `video`, `audio`, `market`, `sticker`, `wall_reply`, `market_album`

## Constructor

Инициализация новой инстанции

```js
new MessageContext(vk, payload);
```

| Параметр | Тип    | Описание                                               |
|----------|--------|--------------------------------------------------------|
| vk       | VK     | Инстанция VK                                           |
| payload  | Object | [Объект сообщения](https://vk.com/dev/objects/message) |

Контекст сообщений, наследует [Context](context.md)

## loadMessagePayload

Перезагружает сообщения с сервера

Например если вы используете [polling](../updates.md#startpolling) где получается только часть данных сообщение (отсутствуют полные данные о геолокации, пересланных сообщениях, прикреплениях)

```js
context.loadMessagePayload(); // => Promise
```

## hasAttachments

Проверяет наличие прикреплении

При передаче параметра проверит наличие всех прикреплений указанного типа

```js
context.hasAttachments([type]); // => boolean
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| type     | string | Тип прикрепления |

## hasText

Проверяет наличие текста

```js
context.hasText(); // => boolean
```

## hasForwards

Проверяет наличие пересланных сообщений

```js
context.hasForwards(); // => boolean
```

## hasGeo

Проверяет наличие геолокации

```js
context.hasGeo(); // => boolean
```

## isDM

Проверяет что сообщение пришло из личных сообщений

```js
context.isDM(); // => boolean
```

## isChat

Проверяет что сообщение пришло из чата (беседы)

```js
context.isChat(); // => boolean
```

## isGroup

Проверяет что сообщение пришло из группы

```js
context.isGroup(); // => boolean
```

## isEvent

Проверяет что сообщение, является событием (например приглашение пользователя)

```js
context.isEvent(); // => boolean
```

## isOutbox

Проверяет что сообщение, является исходящим

```js
context.isOutbox(); // => boolean
```


## isInbox

Проверяет что сообщение, является входящим

```js
context.isInbox(); // => boolean
```

## isDeleted

Проверяет что сообщение, является удалённым

```js
context.isDeleted(); // => boolean
```

## isRead

Проверяет что сообщение, является прочитанным

```js
context.isRead(); // => boolean
```

## isImportant

Проверяет что сообщение, является важным

```js
context.isImportant(); // => boolean
```

## getId

Возвращает идентификатор сообщения

```js
context.getId(); // => number
```

## getUserId

Возвращает идентификатор пользователя

```js
context.getUserId(); // => number
```

## getChatId

Возвращает идентификатор чата

```js
context.getChatId(); // => ?number
```

## getPeerId

Возвращает идентификатор назначения

```js
context.getPeerId(); // => number
```

## getTimestamp

Возвращает метку времени отправки сообщения в формате Unixtime

```js
context.getTimestamp(); // => number
```

## getDate

Возвращает объект даты времени отправки сообщения

```js
context.getDate(); // => Date
```

## getText

Возвращает текст сообщения

```js
context.getText(); // => ?string
```

## getFrom

Возвращает откуда пришло сообщение

```js
context.getFrom(); // => Object
```

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор назначения |
| type     | string | Тип откуда отправлено    |

## getGeo

Возвращает геолокацию

```js
context.getGeo(); // => Object
```

## getAttachments

Возвращает прикрепления

При передаче параметра вернёт все прикрепления указанного типа

```js
context.getAttachments([type]); // => Attachment[]
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| type     | string | Тип прикрепления |

## getEventId

Возвращает идентификатор события

```js
context.getEventId(); // => ?number
```

## getEventType

Возвращает тип события

```js
context.getEventType(); // => ?string
```

## getEventText

Возвращает текст события

```js
context.getEventText(); // => ?string
```

## getInviteLink

Получает ссылку для приглашения пользователя в беседу

```js
context.getInviteLink([params]); // => Promise<Object>
```

Возвращает следующие свойства

| Свойство | Тип    | Описание         |
|----------|--------|------------------|
| link     | string | Ссылка на беседу |

## edit

Редактирует сообщение

```js
context.edit(params); // => Promise
```

| Параметр | Тип    | Описание  |
|----------|--------|-----------|
| params   | Object | Параметры |

## send

Отправляет сообщение в текущий диалог

```js
context.send(text [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| text     | string | Текст сообщения                                                        |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |

```js
context.send(params); // => Promise<number>
```

| Параметр | Тип    | Описание                                                |
|----------|--------|---------------------------------------------------------|
| params   | Object | [Параметры сообщения](https://vk.com/dev/messages.send) |

## reply

Пересылает текущее сообщение с ответом

```js
context.reply(text [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| text     | string | Текст сообщения                                                        |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |

```js
context.reply(params); // => Promise<number>
```

| Параметр | Тип    | Описание                                                |
|----------|--------|---------------------------------------------------------|
| params   | Object | [Параметры сообщения](https://vk.com/dev/messages.send) |

## sendSticker

Отправляет стикер в текущий диалог

```js
context.sendSticker(id); // => Promise<number>
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| id       | number | Идентификатор стикера |

## sendPhoto

Отправляет фото в текущий диалог

```js
context.sendPhoto(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | mixed  | [Источник загрузки](../upload.md#messagephoto)                         |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |


## sendDocument

Отправляет документ в текущий диалог

```js
context.sendDocument(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | mixed  | [Источник загрузки](../upload.md#messagedocument)                      |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |

## sendVoice

Отправляет голосовое сообщение в текущий диалог

```js
context.sendVoice(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | mixed  | [Источник загрузки](../upload.md#voice)                                |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |

## setActivity

Изменяет статус на набор текста в диалоге

```js
context.setActivity(); // => Promise<boolean>
```

## markAsImportant

Помечает сообщение(я) как важное или наоборот

```js
context.markAsImportant([ids, params]); // => Promise<number[]>
```

| Параметр | Тип      | Описание                                                                |
|----------|----------|-------------------------------------------------------------------------|
| ids      | number[] | Идентификаторы сообщений (по умолчанию текущее)                         |
| params   | Object   | [Дополнительные параметры](https://vk.com/dev/messages.markAsImportant) |

## deleteMessage

Удаляет сообщение(я)

```js
context.markAsImportant([ids, params]); // => Promise<number[]>
```

| Параметр | Тип      | Описание                                                       |
|----------|----------|----------------------------------------------------------------|
| ids      | number[] | Идентификаторы сообщений  (по умолчанию текущее)               |
| params   | Object   | [Дополнительные параметры](https://vk.com/dev/messages.delete) |

## restoreMessage

Восстанавливает текущее сообщение

```js
context.restoreMessage(); // => Promise<boolean>
```

## joinChatByInviteLink

Позволяет присоединиться к чату по ссылке-приглашению

```js
context.joinChatByInviteLink(link [, params]); // => Promise<Object>
```

| Параметр | Тип    | Описание                                                                     |
|----------|--------|------------------------------------------------------------------------------|
| link     | string | Ссылка на беседу                                                             |
| params   | Object | [Дополнительные параметры](https://vk.com/dev/messages.joinChatByInviteLink) |

## renameChat

Переименовывает чат (беседу)

```js
context.renameChat(title); // => Promise<boolean>
```

| Параметр | Тип    | Описание                     |
|----------|--------|------------------------------|
| title    | string | Новое название чата (беседы) |

## newChatPhoto

Загружает новую фотографию чата (беседы)

```js
context.newChatPhoto(source [, params]); // => Promise<Object>
```

| Параметр | Тип    | Описание                                                    |
|----------|--------|-------------------------------------------------------------|
| source   | mixed  | [Источник загрузки](../upload.md#chatphoto)                 |
| params   | Object | [Дополнительные параметры загрузки](../upload.md#chatphoto) |

## removeChatPhoto

Удаляет фотографию чата (беседы)

```js
context.removeChatPhoto();
```

## inviteUser

Приглашает нового пользователя в чат

По умолчанию идентификатор события

```js
context.inviteUser([id]); // => Promise<boolean>
```

| Параметр | Тип    | Описание                   |
|----------|--------|----------------------------|
| id       | number | Идентификатор пользователя |

## inviteUser

Приглашает нового пользователя в чат

По умолчанию идентификатор события

```js
context.kickUser([id]); // => Promise<boolean>
```

| Параметр | Тип    | Описание                   |
|----------|--------|----------------------------|
| id       | number | Идентификатор пользователя |

## pinMessage

Закрепляет сообщение

```js
context.pinMessage(); // => Promise<boolean>
```

## unpinMessage

Открепляет сообщение

```js
context.unpinMessage(); // => Promise<boolean>
```
