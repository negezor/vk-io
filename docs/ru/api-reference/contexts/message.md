# MessageContext

```js
import { MessageContext } from 'vk-io';
```

## Updates

- Событие `message`
- Возможные подтипы `new_message`, `edit_message`

> Обратите внимание

> Если вы используете свойства контекста напрямую то это может привести к проблемам несовместимости кода в дальнейшем, используйте лучше методы getter'ы

> Так как контекст реализует совместимость с несколькими способами получения данных

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

Например если вы используете [polling](../updates.md#startpolling) где получается только часть данных сообщения (отсутствуют полные данные о геолокации, пересланных сообщениях, прикреплениях)

```js
context.loadMessagePayload(); // => Promise
```

## hasAttachments

Проверяет наличие прикреплений

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
context.hasText; // => boolean
```

## hasReplyMessage

Проверяет наличие сообщения, в ответ на которое отправлено текущее

```js
context.hasReplyMessage; // => boolean
```

## hasForwards

Проверяет наличие пересланных сообщений

```js
context.hasForwards; // => boolean
```

## hasGeo

Проверяет наличие геолокации

```js
context.hasGeo; // => boolean
```

## isChat

Проверяет что сообщение пришло из чата (беседы)

```js
context.isChat; // => boolean
```

## isUser

Проверяет что сообщение пришло от пользователя

```js
context.isUser; // => boolean
```

## isGroup

Проверяет что сообщение пришло от группы

```js
context.isGroup; // => boolean
```

## isFromUser

Проверяет что сообщение пришло в диалоге с пользователем

```js
context.isFromUser; // => boolean
```

## isFromGroup

Проверяет что сообщение пришло в диалоге с группой

```js
context.isFromGroup; // => boolean
```

## isEvent

Проверяет что сообщение является событием (например приглашение пользователя)

```js
context.isEvent; // => boolean
```

## isOutbox

Проверяет что сообщение является исходящим

```js
context.isOutbox; // => boolean
```

## isInbox

Проверяет что сообщение является входящим

```js
context.isInbox; // => boolean
```

## isImportant

Проверяет что сообщение, является важным

```js
context.isImportant; // => boolean
```

## id

Возвращает идентификатор сообщения или сообщения беседы

```js
context.id; // => number
```

## conversationMessageId

Возвращает идентификатор сообщения из беседы

```js
context.conversationMessageId; // => number
```

## peerId

Возвращает идентификатор назначения

```js
context.peerId; // => number
```

## peerType

Возвращает тип идентификатора назначения

```js
context.peerType; // => string
```

## senderId

Возвращает идентификатор отправителя

```js
context.senderId; // => number
```

## senderType

Возвращает тип идентификатора отправителя

```js
context.senderType; // => string
```

## chatId

Возвращает идентификатор чата

```js
context.chatId; // => ?number
```

## createdAt

Возвращает метку времени отправки сообщения в формате Unixtime

```js
context.createdAt; // => number
```

## text

Возвращает текст сообщения

```js
context.text; // => ?string
```

## replyMessage

Возвращает сообщение, в ответ на которое отправлено текущее

```js
context.replyMessage; // => MessageReply[]
```

## forwards

Возвращает пересланные сообщение

```js
context.forwards; // => MessageForward[]
```

## geo

Возвращает геолокацию

```js
context.geo; // => Object
```

## eventType

Возвращает тип события

```js
context.eventType; // => ?string
```

## eventMemberId

Возвращает идентификатор пользователя на которого произошло событие

```js
context.eventMemberId; // => ?number
```

## eventText

Возвращает текст события

```js
context.eventText; // => ?string
```

## eventEmail

Возвращает email события

```js
context.eventEmail; // => ?string
```

## messagePayload

Возвращает значение указанное в `payload`, [подробнее](https://vk.com/dev/bots_docs_3)

```js
context.messagePayload; // => ?*
```

## getAttachments

Возвращает прикрепления

При передаче параметра вернёт все прикрепления указанного типа

```js
context.getAttachments([type]); // => Attachment[]
```

## getInviteLink

Получает ссылку для приглашения пользователя в беседу

```js
context.getInviteLink([params]); // => Promise<Object>
```

Возвращает следующие свойства

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| link     | string | Ссылка на беседу |

## editMessage

Редактирует сообщение

```js
context.editMessage(params); // => Promise
```

| Параметр | Тип    | Описание  |
|----------|--------|-----------|
| params   | Object | Параметры |

## editMessageText

Редактирует текст сообщения

```js
context.editMessageText(message); // => Promise
```

| Параметр | Тип    | Описание        |
|----------|--------|-----------------|
| message  | string | Текст сообщения |

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

## sendPhotos

Отправляет фото в текущий диалог

```js
context.sendPhotos(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | *[]    | [Источник загрузки](../upload.md#messagephoto)                         |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |


## sendDocuments

Отправляет документ в текущий диалог

```js
context.sendDocuments(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | *[]    | [Источник загрузки](../upload.md#messagedocument)                      |
| params   | Object | [Дополнительные параметры сообщения](https://vk.com/dev/messages.send) |

## sendAudioMessage

Отправляет голосовое сообщение в текущий диалог

```js
context.sendAudioMessage(source [, params]); // => Promise<number>
```

| Параметр | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| source   | *      | [Источник загрузки](../upload.md#voice)                                |
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
context.deleteMessage([ids, params]); // => Promise<number[]>
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
| source   | *      | [Источник загрузки](../upload.md#chatphoto)                 |
| params   | Object | [Дополнительные параметры загрузки](../upload.md#chatphoto) |

## deleteChatPhoto

Удаляет фотографию чата (беседы)

```js
context.deleteChatPhoto();
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

## kickUser

Исключает нового пользователя в чате

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
