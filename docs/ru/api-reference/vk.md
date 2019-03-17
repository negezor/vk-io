# VK

```js
import VK from 'vk-io';

// OR

import { VK } from 'vk-io';
```

## Constructor
Инициализация новой инстанции
```js
new VK([options]);
```

Например
```js
new VK({
	appId: 1707
});
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| options  | Object | [Опции](#options) |

## setOptions
Устанавливает опции

```js
vk.setOptions(options); // => this
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| options  | Object | [Опции](#options) |

## Options
### Общие опции

| Опция    | Тип    | Описание                                                                 | По умолчанию |
|----------|--------|--------------------------------------------------------------------------|--------------|
| token    | string | Токен                                                                    | null         |
| language | string | Язык возвращаемых данных                                                 | null         |
| agent    | Agent  | [HTTPS агент](https://nodejs.org/api/https.html#https_class_https_agent) | https.Agent  |

Доступные языки возвращаемых данных
- `ru` - русский
- `ua` - украинский
- `be` - белорусский
- `en` - английский
- `es` - испанский
- `fi` - финский
- `de` - немецкий
- `it` - итальянский

### Опции авторизации

| Опция     | Тип    | Описание                  | По умолчанию |
|-----------|--------|---------------------------|--------------|
| appId     | number | Идентификатор приложения  | null         |
| appSecret | string | Секретный ключ приложения | null         |
| login     | string | Логин (email)             | null         |
| phone     | string | Телефон                   | null         |
| password  | string | Пароль                    | null         |
| authScope | string | Доступ приложения         | all          |

### Опции запросов к API

| Опция             | Тип      | Описание                                                                  | По умолчанию                                                            |
|-------------------|----------|---------------------------------------------------------------------------|-------------------------------------------------------------------------|
| apiMode           | string   | Режим работы API                                                          | sequential                                                              |
| apiWait           | number   | Время ожидания следующей попытки запроса после ошибки                     | 3000                                                                    |
| apiLimit          | number   | Количество запрос к API в секунду                                         | 3                                                                       |
| apiBaseUrl        | string   | Базовый URL для API                                                       | https://api.vk.com/method                                               |
| apiAttempts       | number   | Количество попыток повтора запроса после ошибки                           | 3                                                                       |
| apiTimeout        | number   | Время ожидания запроса                                                    | 10000                                                                   |
| apiHeaders        | Object   | Заголовки отправляемые вместе с запросом                                  | {'User-Agent':\`vk-io/${version} (+https://github.com/negezor/vk-io)\`} |
| apiExecuteCount   | number   | Количество параллельных запросов при apiMode=(parallel/parallel_selected) | 25                                                                      |
| apiExecuteMethods | string[] | Методы которые будут собираться в execute при apiMode=parallel_selected   | ['messages.send']                                                       |

Доступные режимы работы API
- `sequential` - Все запросы идут последовательно
- `parallel` - Все запросы собираются пачкой по `apiExecuteCount` в метод `execute`
- `parallel_selected` - Выбранные методы собираются пачкой по `apiExecuteCount` в метод `execute`, остальные методы последовательно

### Опции загрузки

| Опция         | Тип    | Описание                        | По умолчанию |
|---------------|--------|---------------------------------|--------------|
| uploadTimeout | number | Время ожидания запроса загрузки | 20000        |

### Опции polling ([User Long Poll API](https://vk.com/dev/using_longpoll) и [Bots Long Poll API](https://vk.com/dev/bots_longpoll))

| Опция           | Тип    | Описание                                                  | По умолчанию |
|-----------------|--------|-----------------------------------------------------------|--------------|
| pollingWait     | number | Время ожидания следующей попытки запроса после ошибки     | 3000         |
| pollingGroupId  | number | ID группы для [polling](https://vk.com/dev/bots_longpoll) | null         |
| pollingAttempts | number | Количество попыток повтора запроса после ошибки           | 3            |

### Опции webhook ([Callback API](https://vk.com/dev/callback_api))

| Опция               | Тип    | Описание                              | По умолчанию |
|---------------------|--------|---------------------------------------|--------------|
| webhookPath         | string | Путь для обратного вызова Webhook     | null         |
| webhookSecret       | string | Секретный ключ для проверки запросов  | null         |
| webhookConfirmation | string | Строка подтверждения сервера          | null         |

### Опции коллекций

| Опция           | Тип    | Описание                                        | По умолчанию |
|-----------------|--------|-------------------------------------------------|--------------|
| collectAttempts | number | Количество попыток повтора запроса после ошибки | 3            |

## token
Устанавливает токен

```js
vk.token = token;
```

| Параметр | Тип    | Описание |
|----------|--------|----------|
| token    | string | Токен    |

Возвращает токен

```js
vk.token; // ?string
```

### captchaHandler
Устанавливает обработчик капчи

```js
vk.captchaHandler = handler;
```

| Параметр | Тип      | Описание         |
|----------|----------|------------------|
| handler  | Function | Обработчик капчи |

```js
vk.captchaHandler = (payload, retry) => {...};
```

| Параметр | Тип      | Описание                       |
|----------|----------|--------------------------------|
| payload  | Object   | Полезная нагрузка              |
| retry    | Function | Повторяет запрос с кодом капчи |

Список возможных доступных свойств в `payload`

| Свойство | Тип      | Описание                 |
|----------|----------|--------------------------|
| sid      | number   | Идентификатор капчи      |
| src      | string   | URL на изображение капчи |
| request  | ?Request | Объект запроса           |

Пример использования

```js
vk.captchaHandler = async ({ src }, retry) => {
	const key = await myAwesomeCaptchaHandler(src);

	try {
		await retry(key);

		console.log('Капча успешно решена');
	} catch (error) {
		console.log('Капча неверная');
	}
};
```

## twoFactorHandler
Устанавливает обработчик двухфакторной защиты

```js
vk.twoFactorHandler = handler;
```

| Параметр | Тип      | Описание                         |
|----------|----------|----------------------------------|
| handler  | Function | Обработчик двух факторной защиты |

```js
vk.twoFactorHandler = (payload, retry) => {...};
```

| Параметр | Тип      | Описание                                       |
|----------|----------|------------------------------------------------|
| payload  | Object   | Полезная нагрузка                              |
| retry    | Function | Повторяет запрос с кодом двух факторной защиты |

Пример использования

```js
vk.twoFactorHandler = async (payload, retry) => {
	const code = await getTwoFactorCode();

	try {
		await retry(code);

		console.log('Двухфакторная авторизация пройдена');
	} catch (error) {
		console.log('Двухфакторная авторизация провалилась');
	}
};
```
