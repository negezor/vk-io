# Auth

```js
const { auth } = vk;
```

Основные поддерживаемые типы по логину и паролю:

* [Direct](https://vk.com/dev/auth_direct)
* Implicit Flow
	* [Implicit Flow User](https://vk.com/dev/implicit_flow_user)
	* [implicit Flow Groups](https://vk.com/dev/implicit_flow_group)

> Обратите внимание

> При подтверждении номера телефона пользователя приоритетным будет свойство `phone`

> Если на аккаунте активирована двух факторная авторизация нужно поставить соответствующий обработчик через `vk.setTwoFactorHandler()`

> Если авторизация будет слишком частой то скорее всего будет требоваться капча, поставить её можно через обработчик `vk.setCaptchaHandler()`

## direct

Прямая авторизация по логину и паролю с указанием `app` и `key` в [опциях](vk.md#Опции-авторизации)

```js
const direct = auth.direct(); // => DirectAuth
```

Пример использования

```js
vk.setOptions({
	app: process.env.APP,
	key: process.env.KEY,
	login: process.env.LOGIN,
	password: process.env.PASSORD
});

const direct = auth.direct();

direct.run()
	.then((response) => {
		console.log('Token:', response.token);
		console.log('Expires:', response.expires);

		console.log('Email:', response.email);
		console.log('User ID:', response.user);
	});
```

Так же присутствуют заданные приложения по умолчанию для прямой авторизации

### Android
Авторизация через официальное приложение `android`

```js
const direct = auth.androidApp(); // => DirectAuth
```

### Windows
Авторизация через официальное приложение `windows`

```js
const direct = auth.windowsApp(); // => DirectAuth
```

### Windows Phone
Авторизация через официальное приложение `windows phone`

```js
const direct = auth.windowsPhoneApp(); // => DirectAuth
```

### iPhone
Авторизация через официальное приложение `iPhone`

```js
const direct = auth.iphoneApp(); // => DirectAuth
```

### iPad

Авторизация через официальное приложение `iPad`

```js
const direct = auth.ipadApp(); // => DirectAuth
```

## Implicit Flow
Авторизация для `Standalone` приложений

Существует два типа авторизации `Implicit Flow`

- Авторизация для пользователя
- Авторизация для сообществ(а)

### Implicit Flow User
Для авторизации пользователя нужно только идентификатор приложения

```js
const implicitFlow = auth.implicitFlowUser(); // => ImplicitFlowUser
```

Пример использования

```js
vk.setOptions({
	app: process.env.APP,
	login: process.env.LOGIN,
	password: process.env.PASSORD
});

const implicitFlow = auth.implicitFlowUser();

implicitFlow.run()
	.then((response) => {
		console.log('Token:', response.token);
		console.log('Expires:', response.expires);

		console.log('Email:', response.email);
		console.log('User ID:', response.user);
	});
```

### Implicit Flow Groups
Для авторизации пользователя нужно только идентификатор приложения

```js
const implicitFlow = auth.implicitFlowGroups(groups); // => ImplicitFlowGroups
```

| Параметр | Тип   | Описание     |
|----------|-------|--------------|
| groups   | Array | Список групп |

Пример использования

```js
vk.setOptions({
	app: process.env.APP,
	login: process.env.LOGIN,
	password: process.env.PASSORD
});

const implicitFlow = auth.implicitFlowGroups([groupIdOne [, ...]]);

implicitFlow.run()
	.then((tokens) => {
		for (const response of tokens) {
			console.log('Group:', response.group);
			console.log('Token:', response.token);
			console.log('Expires:', response.expires);
		}
	});
```
## Errors
Обработка ошибок авторизации

```js
import { AuthError, authErrors } from 'vk-io';
```

Список кодов ошибок в `authErrors`

| Свойство                   | Тип    | Описание                                          |
|----------------------------|--------|---------------------------------------------------|
| PAGE_BLOCKED               | string | Страница заблокирована                            |
| INVALID_PHONE_NUMBER       | string | Неправильный номер телефона                       |
| AUTHORIZATION_FAILED       | string | Авторизация провалилась                           |
| FAILED_PASSED_CAPTCHA      | string | Не удалось пройти капчу                           |
| MISSING_CAPTCHA_HANDLER    | string | Отсутствует обработчик капчи                      |
| FAILED_PASSED_TWO_FACTOR   | string | Не удалось пройти двух факторную авторизацию      |
| MISSING_TWO_FACTOR_HANDLER | string | Отсутствует обработчик двух факторной авторизации |

Пример использования

```js
auth.implicitFlowUser().run()
	.catch((error) => {
		if (error instanceof AuthError) {
			if (error.code === authErrors.PAGE_BLOCKED) {
				console.log('Страница заблокирована :c');
			}
		}
	})
```
