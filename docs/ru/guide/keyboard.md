# Keyboard

Хелпер модуль позволяющий упростить создание клавиатуры

## Описание типов

[API Reference [EN]](http://negezor.github.io/vk-io/references/vk-io/classes/keyboard.html)

## Концепт

Хелпер предоставляет [паттерн строитель](https://en.wikipedia.org/wiki/Builder_pattern). Есть два способа создания клавиатуры, но оба из них вернут инстанцию [KeyboardBuilder](https://negezor.github.io/vk-io/references/vk-io/classes/keyboardbuilder.html).

::: warning Внимание
Ограничение для клавиатуры составляет сетку:
- Для обычной клавиатуры 10x4
- Для inline клавиатуры  6x4

Широкие кнопки занимают место двух кнопок, к ним относятся `url`, `location`, `pay` и `application`
:::

### Через сборщик
Рекомендуемый способ

```ts
const builder = Keyboard.builder()
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
	}); // => KeyboardBuilder

// Отправка клавиатуры
await api.messages.send({
	// ...
	
	keyboard: builder
});
```

### Через массив

```ts
const builder = Keyboard.keyboard([
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

// Отправка клавиатуры
await api.messages.send({
	// ...

	keyboard: builder
});
```

:::warning Внимание
Полезная нагрузка имеет ограничение в 255 символов в виде JSON

Название кнпоки имеет ограничение в 40 символов
:::

## Text кнопка
Полезная нагрузка будет доступна в событии `message_new`, в свойстве `messagePayload`

```ts
builder.textButton({
	label: 'Buy a coffee',
	payload: {
		command: 'buy',
		item: 'coffee'
	},
	color: Keyboard.POSITIVE_COLOR
})
```

## URL кнопка

```ts
builder.urlButton({
	label: 'Buy a coffee',
	url: 'https://coffee.mania/buy'
});
```

## Location кнопка
Полезная нагрузка будет доступна в событии `message_new`, в свойстве `messagePayload`

```ts
builder.locationRequestButton({
	payload: {
		command: 'order_delivery'
	}
});
```

## VK Pay кнопка

```ts
builder.payButton({
	hash: {
		action: 'transfer-to-group',
		group_id: 1,
		aid: 10
	}
});
```

## VK Apps кнопка

```ts
builder.applicationButton({
	label: 'LiveWidget',
	appId: 6232540,
	ownerId: -157525928,
	// hash: ''
})
```

## Callback кнопка
Полезная нагрузка будет доступна в событии `message_event`, в свойстве `eventPayload`

```ts
builder.callbackButton({
	label: 'Buy a coffee',
	payload: {
		command: 'buy',
		item: 'coffee'
	}
});
```

## Модификаторы клавиатуры

### oneTime
Указывает, что клавиатура будет закрыта при нажатии на любую кнопку, не работает с inline

```ts
builder.oneTime();
```

### inline
Указывает, что клавиатура будет прикреплена к сообщению

```ts
builder.inline();
```

## Цвет кнопок

Цвет может отличаться от цветовой схемы пользователя

| Константа                | Действие                           | Цвет    |
|--------------------------|------------------------------------|---------|
| Keyboard.SECONDARY_COLOR | Нейтральное                        | Белый   |
| Keyboard.PRIMARY_COLOR   | Основное действие                  | Синий   |
| Keyboard.NEGATIVE_COLOR  | Опасное действие или отрицательное | Красный |
| Keyboard.POSITIVE_COLOR  | Согласиться или подтвердить        | Зелёный |
