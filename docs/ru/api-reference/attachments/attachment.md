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
| type      | String | Тип прикрепления             |
| owner     | Number | Идентификатор владелеца      |
| id        | Number | Идентификатор прикрепления   |
| accessKey | String | Ключ доступа (необязательно) |

## fromString (static)
Разбирает прикрепление в объект

```js
Attachment.fromString(attachment); // => Attachment
```

| Параметр   | Тип    | Описание     |
|------------|--------|--------------|
| attachment | String | Прикрепление |

Пример использования

```js
Attachment.fromString('photo1_456264771'); // => Attachment
```

## isFilled
Заполнен ли объект прикрепления, используется в классах наследниках

```js
attachment.isFilled(); // Boolean
```

## getType
Возвращает тип прикрепления

```js
attachment.getType(); // String
```

## getOwnerId
Возвращает идентификатор владельца

```js
attachment.getOwnerId(); // Number
```

## getId
Возвращает идентификатор прикрепления

```js
attachment.getId(); // Number
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
