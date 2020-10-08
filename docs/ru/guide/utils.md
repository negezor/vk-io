# Utils

Базовые утилиты

## resolveResource

Позволяет получить информацию о ресурсе внутри ВКонтакте. Зачастую возникает задача получить идентификатор ресурса из ссылки/упоминания или числа. Для того что бы не писать эту логику самостоятельно можно воспользоваться `resolveResource`. Поддерживается следующие приведённые примеры:

Ссылка
- https://vk.com/id1 — `{ id: 1, type: 'user' }`
- https://vk.com/durov — `{ id: 1, type: 'user' }`
- https://vk.com/wall1_2442097 — `{ id: 2442097, ownerId: 1, type: 'wall' }`
- https://vk.com/durov?w=wall1_2442097 — `{ id: 2442097, ownerId: 1, type: 'wall' }`
- https://vk.com/club1 — `{ id: 1, type: 'group' }`
- https://vk.com/app1 — `{ id: 1, type: 'application' }`

Упоминание
- \[id1|Durov\] — `{ id: 1, type: 'user' }`
- \[club1|VKontakte API\] — `{ id: 1, type: 'group' }`

Идентификатор
- 1 — `{ id: 1, type: 'user' }`
- -1 — `{ id: 1, type: 'group' }`

Slug
- id1 — `{ id: 1, type: 'user' }`
- durov — `{ id: 1, type: 'user' }`

Ресурсы делятся на два типа:

[Целевые](https://negezor.github.io/vk-io/references/vk-io/interfaces/iresolvedtargetresource.html) — это единичные сущности.
```ts
interface IResolvedTargetResource {
	id: number;
	type: 'user' | 'group' | 'application' | 'albums' | 'videos' | 'audios';
}
```

[С владельцем](https://negezor.github.io/vk-io/references/vk-io/interfaces/iresolvedownerresource.html) — это сущности с владельцем, в основном прикрепления.

```ts
interface IResolvedOwnerResource {
	id: number;
	ownerId: number;
	type: 'photo' | 'audio' | 'video' | 'doc' | 'wall' | 'topic' | 'album';
}
```

### Использование resolveResource
[Опции функции](https://negezor.github.io/vk-io/references/vk-io/interfaces/iresolveresourceoptions.html)

::: warning Внимание
Вы вполне можете не передавать класс API, однако если будет встречено короткое имя ([slug](https://en.wikipedia.org/wiki/Clean_URL#Slug)) по типу `durov` — вы получите ошибку, так как он нужен для вызова метода [utils.resolveScreenName](https://vk.com/dev/utils.resolveScreenName).
:::

```ts
import { API, resolveResource } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const resource = await resolveResource({
	api,
	// Или
	// api: vk.api,

	// Ресурс который нужно разобрать
	resource: 'https://vk.com/id1'
});

console.log(resource); // { id: 1, type: 'user' }
```
