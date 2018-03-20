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
attachment.hasComments(); // => ?boolean
```

## hasAds
Проверяет, содержит ли запись отметку "реклама"

```js
attachment.hasAds(); // => ?boolean
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
attachment.hasUserReposted(); // => ?boolean
```

## hasUserLike
Проверяет наличие лайка от текущего пользователя

```js
attachment.hasUserLike(); // => ?boolean
```

## isCanUserCommented
Проверяет может ли текущий пользователь комментировать запись

```js
attachment.isCanUserCommented(); // => ?boolean
```

## isCanGroupsCommented
Проверяет могут ли сообщества комментировать запись

```js
attachment.isCanGroupsCommented(); // => ?boolean
```

## isCanCommented
Проверяет можно ли комментировать запись

```js
attachment.isCanCommented(); // => ?boolean
```

## isCanLike
Проверяет можно ли текущий пользователь лайкнуть запись

```js
attachment.isCanLike(); // => ?boolean
```

## isCanReposted
Проверяет можно ли текущий пользователь репостнуть запись

```js
attachment.isCanReposted(); // => ?boolean
```

## isCanPin

Проверяет может ли текущий пользователь закрепить запись

```js
attachment.isCanPin(); // => ?boolean
```

## isCanDelete
Проверяет может ли текущий пользователь удалить запись

```js
attachment.isCanDelete(); // => ?boolean
```

## isCanEdit
Проверяет может ли текущий пользователь редактировать запись

```js
attachment.isCanEdit(); // => ?boolean
```

## isPinned
Проверяет, является ли запись закреплённой

```js
attachment.isPinned(); // => ?boolean
```

## isFriendsOnly
Проверяет, является ли доступной только для друзей

```js
attachment.isFriendsOnly(); // => ?boolean
```

## getTimestamp
Возвращает timestamp дату создания записи

```js
attachment.getTimestamp(); // => ?number
```

## getDate
Возвращает объект `Date` дату создания записи

```js
attachment.getDate(); // => ?Date
```

## getAuthorId
Возвращает идентификатор автора

```js
attachment.getAuthorId(); // => ?number
```

## getPostType
Возвращает тип поста (post, copy, reply, postpone, suggest)

```js
attachment.getPostType(); // => ?string
```

## getText
Возвращает текст поста

```js
attachment.getText(); // => ?string
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

## getCreatedUserId
Возвращает идентификатор администратора, который опубликовал запись

```js
attachment.getCreatedUserId(); // => ?number
```

## getReplyOwnerId
Возвращает идентификатор владельца записи, в ответ на которую была оставлена текущая

```js
attachment.getReplyOwnerId(); // => ?number
```

## getReplyPostId
Возвращает идентификатор записи, в ответ на которую была оставлена текущая

```js
attachment.getReplyPostId(); // => ?number
```

## getSignerId
Возвращает идентификатор автора, если запись была опубликована от имени сообщества и подписана пользователем

```js
attachment.getSignerId(); // => ?number
```

## getViewsCount
Возвращает число просмотров записи

```js
attachment.getViewsCount(); // => ?number
```

## getGeo
Возвращает информация о местоположении 

```js
attachment.getGeo(); // => ?Object
```

## getLikes
Возвращает информация о лайках 

```js
attachment.getLikes(); // => ?Object
```

## getLikesCount
Возвращает количество лайков

```js
attachment.getLikesCount(); // => ?number
```

## getRepostsCount
Возвращает количество лайков

```js
attachment.getRepostsCount(); // => ?number
```

## getPostSource
Возвращает информацию о способе размещения записи

```js
attachment.getPostSource(); // => ?Object
```
