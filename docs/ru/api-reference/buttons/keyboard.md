# Keyboard

```js
import { Keyboard } from 'vk-io';
```

## keyboard (static)

Генерирует клавиатуру из массива предоставленных данных

Ограничения на количество кнопок составляет 10x4

```js
Keyboard.keyboard(rows, options); // => Keyboard
```

| Параметр | Тип     | Описание      |
|----------|---------|---------------|
| rows     | Array[] | Список кнопок |
| options  | Object  | Опции        |

```js
Keyboard.keyboard([...rows], options); // => Keyboard
```

| Параметр | Тип      | Описание |
|----------|----------|----------|
| rows     | Button[] | Кнопки   |
| options  | Object   | Опции    |

Пример использования

```js
Keyboard.keyboard([
	// Одна кнопка
	[
		Keyboard.textButton({
			label: 'Go back',
			payload: {
				command: 'back'
			}
		})
	],
	// Строка из 2 и более кнопок
	[
		Keyboard.textButton({
			label: 'Buy a tea',
			payload: {
				command: 'buy',
				item: 'tea'
			},
			color: Keyboard.POSITIVE_COLOR
		}),
		Keyboard.textButton({
			label: 'Buy a coffee',
			payload: {
				command: 'buy',
				item: 'coffee'
			},
			color: Keyboard.POSITIVE_COLOR
		})
	],
	// Альтернативный вариант для одной кнопки
	Keyboard.textButton({
		label: 'Cancel',
		payload: {
			command: 'cancel'
		},
		color: Keyboard.NEGATIVE_COLOR
	})
]); // => Keyboard
```

## textButton (static)

Генерирует текстовую кнопку

```js
Keyboard.textButton(options); // => TextButton
```

| Параметр | Тип    | Описание     |
|----------|--------|--------------|
| options  | Object | Опции кнопки |

Список свойств

| Свойство | Тип    | Описание                                         |
|----------|--------|--------------------------------------------------|
| label    | string | Текст кнопки (максимум 40 символов)              |
| payload  | *      | Полезная нагрузка в JSON (максимум 255 символов) |
| color    | string | Цвет кнопки                                      |

Пример использования

```js
Keyboard.textButton({
	label: 'Test button',
	payload: {
		test: 1
	},
	color: Keyboard.POSITIVE_COLOR
});
```

## locationRequestButton (static)

Генерирует кнопку запроса местоположения

```js
Keyboard.locationRequestButton(options); // => LocationRequestButton
```

| Параметр | Тип    | Описание     |
|----------|--------|--------------|
| options  | Object | Опции кнопки |

Список свойств

| Свойство | Тип    | Описание                                         |
|----------|--------|--------------------------------------------------|
| payload  | *      | Полезная нагрузка в JSON (максимум 255 символов) |

Пример использования

```js
Keyboard.locationRequestButton({
	payload: {
		test: 1
	}
});
```

## payButton (static)

Генерирует кнопку платежа через VK Pay

```js
Keyboard.payButton(options); // => VKPayButton
```

| Параметр | Тип    | Описание     |
|----------|--------|--------------|
| options  | Object | Опции кнопки |

Список свойств

| Свойство | Тип    | Описание                                                               |
|----------|--------|------------------------------------------------------------------------|
| hash     | string | Параметры платежа VK Pay и идентификатор приложения в параметре  `aid` |
| payload  | *      | Полезная нагрузка в JSON (максимум 255 символов)                       |

Пример использования

```js
Keyboard.payButton({
	hash: 'action=transfer-to-group&group_id=181108510&aid=10',
	payload: {
		test: 1
	}
});
```

## applicationButton (static)

Генерирует кнопку открытия приложения в VK Apps

```js
Keyboard.applicationButton(options); // => VKApplicationButton
```

| Параметр | Тип    | Описание     |
|----------|--------|--------------|
| options  | Object | Опции кнопки |

Список свойств

| Свойство | Тип    | Описание                                                                                                  |
|----------|--------|-----------------------------------------------------------------------------------------------------------|
| label    | string | Текст кнопки                                                                                              |
| appId    | number | Идентификатор вызываемого приложения с типом VK Apps                                                      |
| ownerId  | number | Идентификатор сообщества, в котором установлено приложение, если требуется открыть в контексте сообщества |
| payload  | *      | Полезная нагрузка в JSON (максимум 255 символов)                                                          |

Пример использования

```js
Keyboard.applicationButton({
	label: 'LiveWidget',
	appId: 6232540,
	ownerId: -157525928,
	payload: {
		test: 1
	}
});
```

## DEFAULT_COLOR (static)

Возвращает цвет по умолчанию (#FFFFFF)

```js
Keyboard.DEFAULT_COLOR; // => string
```

## PRIMARY_COLOR (static)

Возвращает синий цвет, обозначает основное действие (#5181B8)

```js
Keyboard.PRIMARY_COLOR; // => string
```

## NEGATIVE_COLOR (static)

Возвращает красный цвет, опасное действие, или отрицательное действие (отклонить, удалить и тд). (#E64646)

```js
Keyboard.NEGATIVE_COLOR; // => string
```

## POSITIVE_COLOR (static)

Возвращает зелёный цвет, согласиться, подтвердить. (#4BB34B)

```js
Keyboard.POSITIVE_COLOR; // => string
```

## oneTime

Указывает, что клавиатура будет закрыта при нажатии на любую кнопку

```js
keyboard.oneTime(enabled); // => this
```

| Параметр | Тип     | Описание     | По умолчанию |
|----------|---------|--------------|--------------|
| enabled  | boolean | Опции кнопки | true         |

Пример использования

```js
const keyboard = Keyboard
	.keyboard([...])
	.oneTime();
```

## toString
Возвращает строковое представление клавиатуры

```js
String(keyboard);

// OR

keyboard.toString();
```

Пример использования

```js
vk.api.messages.send({
	// ...
	keyboard: Keyboard.keyboard([...])
});
```
