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
| payload  | mixed  | Полезная нагрузка в JSON (максимум 255 символов) |
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
keyboard.oneTime(); // => this
```

Пример использования

```js
const kyeboard = Keyboard
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
