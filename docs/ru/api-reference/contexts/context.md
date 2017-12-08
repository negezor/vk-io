# Context

```js
import { Context } from 'vk-io';
```

## Constructor
Инициализация новой инстанции

```js
new Context(vk);
```

| Параметр | Тип | Описание     |
|----------|-----|--------------|
| vk       | VK  | Инстанция VK |

Наследуется потомками

Публичные свойства для всех потомков

| Свойство | Тип      | Описание                                                            |
|----------|----------|---------------------------------------------------------------------|
| vk       | VK       | Инстанция VK                                                        |
| type     | string   | Тип контекста                                                       |
| subTypes | string[] | Подтипы контекста                                                   |
| state    | Object   | Рекомендуемое пространство для расширения контекста                 |
| payload  | Object   | Полезная нагрузка (не используйте напрямую во избежания конфликтов) |

## is

Проверяет содержит ли контекст указанный тип или подтип

```js
context.is(type); // => boolean
```

| Параметр | Тип    | Описание |
|----------|--------|----------|
| type     | string | Тип      |

```js
context.is(types); // => boolean
```

| Параметр | Тип      | Описание |
|----------|----------|----------|
| types    | string[] | Типы     |

Пример использования

```js
// context.type = 'message'
// context.subTypes = ['wall']

context.is('message'); // => true
context.is('wall'); // => true

context.is('comment'); // => false

// OR

// context.type = 'message'
// context.subTypes = ['video', 'wall']

context.is(['message']); // true
context.is(['photo', 'wall']); // true

context.is(['text', 'doc']); // false
```
