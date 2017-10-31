# Request

```js
import { Request } from 'vk-io';
```

## Constructor
Инициализация новой инстанции

```js
new Request(method, params);
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| method   | String | Метод             |
| params   | Object | Список параметров |

Например

```js
new Request('messages.send', {...});
```

Публичные свойства

| Свойство | Тип      | Описание                       |
|----------|----------|--------------------------------|
| method   | String   | Метод                          |
| params   | Object   | Параметры                      |
| attempts | Number   | Количество попыток перезапуска |
| promise  | Promise  | Обещание                       |
| resolve  | Function | Resolve обещания               |
| reject   | Function | Reject обещания                |

## toString
Возвращает строковое представление метода для `execute`

```js
String(request);

// OR

request.toString();
```

Пример использования

```js
const request = new Request('users.get', {
	owner_id: 1
});

console.log(String(request)); // API.users.get({"owner_id":1});
```
