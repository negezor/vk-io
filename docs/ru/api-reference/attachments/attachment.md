# Attachment

```js
import { Attachment } from 'vk-io';
```

Наследуется потомками

## Constructor
Инициализация новой инстанции

```js
new Attachment(type, owner, id, accessKey);
```

Пример использования

```js
new Attachment('photo', 1, 456264771);
```

| Параметр  | Тип    | Описание                     |
|-----------|--------|------------------------------|
| type      | string | Тип прикрепления             |
| owner     | number | Идентификатор владелеца      |
| id        | number | Идентификатор прикрепления   |
| accessKey | string | Ключ доступа (необязательно) |

## fromString (static)
Разбирает прикрепление в объект

```js
Attachment.fromString(attachment); // => Attachment
```

| Параметр   | Тип    | Описание     |
|------------|--------|--------------|
| attachment | string | Прикрепление |

Пример использования

```js
Attachment.fromString('photo1_456264771'); // => Attachment
```

## isFilled
Заполнен ли объект прикрепления, используется в классах наследниках

```js
attachment.isFilled(); // => boolean
```

## getType
Возвращает тип прикрепления

```js
attachment.getType(); // => string
```

## getOwnerId
Возвращает идентификатор владельца

```js
attachment.getOwnerId(); // => number
```

## getId
Возвращает идентификатор прикрепления

```js
attachment.getId(); // => number
```

## toString
Возвращает строковое представление прикрепления

```js
String(attachment);

// OR

attachment.toString();
```

Пример использования

```js
const attachment = new Attachment('photo', 1, 456264771);

console.log(String(attachment)); // => photo1_456264771
```
