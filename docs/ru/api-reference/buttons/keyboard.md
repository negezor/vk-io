# Keyboard

```js
import { Keyboard } from 'vk-io';
```

## builder (static)

Возвращает сборщик клавиатуры

```js
Keyboard.builder(); // => KeyboardBuilder
```

Пример использования

```js
const builder = Keyboard.builder();

builder
	.textButton({
		label: 'Go back',
		payload: {
			command: 'back'
		}
	})
	.row()
	.textButton({
		label: 'Buy a tea',
		payload: {
			command: 'buy',
			item: 'tea'
		},
		color: Keyboard.POSITIVE_COLOR
	})
	.textButton({
		label: 'Buy a coffee',
		payload: {
			command: 'buy',
			item: 'coffee'
		},
		color: Keyboard.POSITIVE_COLOR
	})
	.row()
	.textButton({
		label: 'Cancel',
		payload: {
			command: 'cancel'
		},
		color: Keyboard.NEGATIVE_COLOR
	})
	.row(); // => KeyboardBuilder
```


## keyboard (static)

Генерирует клавиатуру из массива предоставленных данных

Ограничения на количество кнопок составляет 10x4

```js
Keyboard.keyboard(rows, options); // => KeyboardBuilder
```

| Параметр | Тип     | Описание      |
|----------|---------|---------------|
| rows     | Array[] | Список кнопок |

```js
Keyboard.keyboard([...rows], options); // => KeyboardBuilder
```

| Параметр | Тип      | Описание |
|----------|----------|----------|
| rows     | Button[] | Кнопки   |

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
]); // => KeyboardBuilder
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

| Свойство | Тип            | Описание                                                               |
|----------|----------------|------------------------------------------------------------------------|
| hash     | Object, string | Параметры платежа VK Pay и идентификатор приложения в параметре  `aid` |

Пример использования

```js
Keyboard.payButton({
	hash: 'action=transfer-to-group&group_id=181108510&aid=10'
});

// Or

Keyboard.payButton({
	hash: {
		action: 'transfer-to-group',
		group_id: 181108510,
		aid: 10
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
| hash     | string | Хэш для навигации в приложении, будет передан в строке параметров запуска после символа #                 |

Пример использования

```js
Keyboard.applicationButton({
	label: 'LiveWidget',
	appId: 6232540,
	ownerId: -157525928
});
```

## SECONDARY_COLOR (static)

Белая кнопка, указывает на вторичное действие

```js
Keyboard.SECONDARY_COLOR; // => string
```

## PRIMARY_COLOR (static)

Синяя кнопка, обозначает основное действие

```js
Keyboard.PRIMARY_COLOR; // => string
```

## NEGATIVE_COLOR (static)

Красная кнопка, указывает на опасное или отрицательное действие (отклонить, удалить и т.д.)

```js
Keyboard.NEGATIVE_COLOR; // => string
```

## POSITIVE_COLOR (static)

Зеленая кнопка, указывает на согласие, подтверждение и т.д.

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

## inline

Указывает, что клавиатура будет прикреплена к сообщению

```js
keyboard.inline(enabled); // => this
```

| Параметр | Тип     | Описание     | По умолчанию |
|----------|---------|--------------|--------------|
| enabled  | boolean | Опции кнопки | true         |

Пример использования

```js
const keyboard = Keyboard
	.keyboard([...])
	.inline();
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
