# Collect

```js
const { collect } = vk;
```

Позволяет получать большие коллекции данных с методов в которых присутствуют разбитие через параметры `count` и `offset`, например

```js
const collectStream = collect.wall.get({
	owner_id: 1
});

collectStream.on('error', console.error);

collectStream.on('data', ({ total, percent, received, items }) => {
	// Information
	console.log('Total:', total);
	console.log('Percent:', percent);
	console.log('Received:', received);

	console.log('Items:', items);
});

collectStream.on('end', () => {
	console.log('Data received');
});
```

Более подробно расписано в справке [CollectStream](collect-stream.md)

## chain
Создаёт новую цепочку для сбора методов и их выполнения через `execute`

```js
collect.chain(); // => Chain
```

## executes
Множественный вызов одного метода с массивом параметров через `execute`

```js
collect.executes(method, params); // => Promise<Array>
```

| Параметр | Тип      | Описание  |
|----------|----------|-----------|
| method   | String   | Метод     |
| params   | Object[] | Параметры |

Пример использования

```js
vk.collect.executes('users.get', [
	{ user_id: 1 },
	{ user_id: 2 },
	{ user_id: 3 },
	// Many
]);
```
