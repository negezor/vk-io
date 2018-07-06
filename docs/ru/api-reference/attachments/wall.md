# WallAttachment

```js
import { WallAttachment } from 'vk-io';
```

Наследует класс [Attachment](attachment.md)

## Constructor
Инициализация новой инстанции

```js
new WallAttachment(wall, vk);
```

| Параметр | Тип    | Описание                                                  |
|----------|--------|-----------------------------------------------------------|
| photo    | Object | [Объект записи на стене](https://vk.com/dev/objects/post) |
| vk       | VK     | Объект VK                                                 |

Пример использования

```js
const [wall] = await vk.api.wall.getById({
	photos: '1_456264771'
});

new WallAttachment(wall, vk);
```

## hasComments
Проверяет наличие комментариев

```js
attachment.hasComments; // => ?boolean
```

## hasAds
Проверяет, содержит ли запись отметку "реклама"

```js
attachment.hasAds; // => ?boolean
```

## hasAttachments

Проверяет наличие прикреплении

При передаче параметра проверит наличие всех прикреплений указанного типа

```js
attachment.hasAttachments([type]); // => boolean
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| type     | string | Тип прикрепления |

## hasUserReposted
Проверяет наличие репоста от текущего пользователя

```js
attachment.hasUserReposted; // => ?boolean
```

## hasUserLike
Проверяет наличие лайка от текущего пользователя

```js
attachment.hasUserLike; // => ?boolean
```

## isCanUserCommented
Проверяет может ли текущий пользователь комментировать запись

```js
attachment.isCanUserCommented; // => ?boolean
```

## isCanGroupsCommented
Проверяет могут ли сообщества комментировать запись

```js
attachment.isCanGroupsCommented; // => ?boolean
```

## isCanCommented
Проверяет можно ли комментировать запись

```js
attachment.isCanCommented; // => ?boolean
```

## isCanLike
Проверяет можно ли текущий пользователь лайкнуть запись

```js
attachment.isCanLike; // => ?boolean
```

## isCanReposted
Проверяет можно ли текущий пользователь репостнуть запись

```js
attachment.isCanReposted; // => ?boolean
```

## isCanPin

Проверяет может ли текущий пользователь закрепить запись

```js
attachment.isCanPin; // => ?boolean
```

## isCanDelete
Проверяет может ли текущий пользователь удалить запись

```js
attachment.isCanDelete; // => ?boolean
```

## isCanEdit
Проверяет может ли текущий пользователь редактировать запись

```js
attachment.isCanEdit; // => ?boolean
```

## isPinned
Проверяет, является ли запись закреплённой

```js
attachment.isPinned; // => ?boolean
```

## isFriendsOnly
Проверяет, является ли доступной только для друзей

```js
attachment.isFriendsOnly; // => ?boolean
```

## date
Возвращает метку времени даты создания записи

```js
attachment.date; // => ?number
```

## authorId
Возвращает идентификатор автора

```js
attachment.authorId; // => ?number
```

## postType
Возвращает тип поста (post, copy, reply, postpone, suggest)

```js
attachment.postType; // => ?string
```

## text
Возвращает текст поста

```js
attachment.text; // => ?string
```

## createdUserId
Возвращает идентификатор администратора, который опубликовал запись

```js
attachment.createdUserId; // => ?number
```

## replyOwnerId
Возвращает идентификатор владельца записи, в ответ на которую была оставлена текущая

```js
attachment.replyOwnerId; // => ?number
```

## replyPostId
Возвращает идентификатор записи, в ответ на которую была оставлена текущая

```js
attachment.replyPostId; // => ?number
```

## signerId
Возвращает идентификатор автора, если запись была опубликована от имени сообщества и подписана пользователем

```js
attachment.signerId; // => ?number
```

## viewsCount
Возвращает число просмотров записи

```js
attachment.viewsCount; // => ?number
```

## geo
Возвращает информация о местоположении 

```js
attachment.geo; // => ?Object
```

## likes
Возвращает информация о лайках 

```js
attachment.likes; // => ?Object
```

## likesCount
Возвращает количество лайков

```js
attachment.likesCount; // => ?number
```

## repostsCount
Возвращает количество лайков

```js
attachment.repostsCount; // => ?number
```

## postSource
Возвращает информацию о способе размещения записи

```js
attachment.postSource; // => ?Object
```

## getAttachments

Возвращает прикрепления

При передаче параметра вернёт все прикрепления указанного типа

```js
attachment.getAttachments([type]); // => Attachment[]
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| type     | string | Тип прикрепления |
