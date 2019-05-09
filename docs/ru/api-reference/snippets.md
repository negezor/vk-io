# Snippets

```js
const { snippets } = vk;
```

## resolveResource
Обрабатывает ссылку/прикрепление/ID (сообщества или пользователя)

```js
snippets.resolveResource(resource); // Promise<Object>
```

| Параметр | Тип    | Описание      |
|----------|--------|---------------|
| resource | string | Адрес ресурса |

Обработка ссылки

```js
snippets.resolveResource('https://vk.com/durov'); // Promise<Object>
```

```js
snippets.resolveResource('durov'); // Promise<Object>
```

| Свойство | Тип    | Описание                                           |
|----------|--------|----------------------------------------------------|
| id       | number | Идентификатор (пользователя/сообщества/приложение) |
| type     | string | Тип ресурса (user/group/application)               |

```js
snippets.resolveResource(1); // Promise<Object>
```

```js
snippets.resolveResource(-1); // Promise<Object>
```

| Свойство | Тип    | Описание                                |
|----------|--------|-----------------------------------------|
| id       | number | Идентификатор (пользователя/сообщества) |
| type     | string | Тип ресурса (user/group)                |

```js
snippets.resolveResource('https://vk.com/durov?z=photo1_456264771/album1_0/rev'); // Promise<Object>
```

```js
snippets.resolveResource('photo1_456264771'); // Promise<Object>
```

| Свойство | Тип    | Описание                                       |
|----------|--------|------------------------------------------------|
| id       | number | Идентификатор прикрепления                     |
| owner    | number | Идентификатор владельца                        |
| type     | string | Тип прикрепления (photo, video, audio, ...etc) |
