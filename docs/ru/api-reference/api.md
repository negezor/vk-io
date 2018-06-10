# API

```js
const { api } = vk;
```

API предоставляет удобный интерфейс для взаимодействия без прямого вызова `api.call` с помощью алиасов `api.<method>`

Достаточно скопировать названия метода и вызвать, пример использования

```js
api.wall.get();
```

## baseUrl
Позволяет установить базовый URL для API (по умолчанию `https://api.vk.com/method/`)

```js
api.baseUrl = 'https://my-custom-api.com/method/';
```

```js
api.baseUrl; // https://my-custom-api.com/method/
```

## call
Выполняет метод, используется как альтернативный вызов методов

> Обратите внимание

> Вместо прямого вызова `api.call` стоит использовать алиасы

```js
api.call(method, params); // => Promise<Mixed>
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| method   | string | Метод             |
| params   | Object | Список параметров |

```js
api.call('messages.send', {...});

// VS alias

api.messages.send({...});
```

В случае отсутствия алиаса или нужды прямой передачи метода, тогда подходит идеально

## callWithRequest
Вызов метода через объект `Request`

```js
api.callWithRequest(request); // => Promise<mixed>
```

| Параметр | Тип                   | Описание       |
|----------|-----------------------|----------------|
| request  | [Request](request.md) | Объект запроса |

## procedure
Выполняет процедуру сохраненную в приложении

```js
api.procedure(name, params); // => Promise<Mixed>
```

| Параметр | Тип    | Описание           |
|----------|--------|--------------------|
| name     | string | Название процедуры |
| params   | Object | Список параметров  |

## isMethod
Проверяет, является ли строка методом

```js
api.isMethod(method); // => boolean
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| method   | string | Строка для проверки |
