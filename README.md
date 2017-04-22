<p align="center"><img src="https://github.com/negezor/vk-io/raw/master/logo.png?raw=true"></p>
<p align="center">
<a href="https://travis-ci.org/negezor/vk-io"><img src="https://img.shields.io/travis/negezor/vk-io.svg?style=flat-square" alt="Build Status"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/v/vk-io.svg?style=flat-square" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vk-io"><img src="https://img.shields.io/npm/dt/vk-io.svg?style=flat-square" alt="NPM downloads"></a>
</p>

VK-IO - Это мощный [Node.js](https://nodejs.org) модуль который позволяет вам легко взаимодействовать с ВКонтакте API

## Особенности
- Полная поддержка ВКонтакте API
- Предсказуемая абстракция
- Работа с большими коллекциями данных
- Множество функций для упрощения работы
- Поддержка всех типов авторизации по логину и паролю

## Навигация
- [Авторизация](#Авторизация)
- [Вызов методов](#Вызов-методов-ВКонтакте-api)
- [Коллекции](#Работа-с-коллекциями)
- [Загрузка файлов](#Загрузка-файлов)
- [Long Poll](#Работа-с-long-poll)
- [Исключения](#Обработка-исключений)
- [Сниппеты](#Сниппеты)
- [Примеры](https://github.com/negezor/vk-io/tree/master/examples)

## Установка
Требуется Node.js 6.0.0 или новее

### NPM
Установка через стандартный менеджер пакетов NPM
```shell
npm install vk-io --save
```

### Yarn
Установка через пакетный менеджер Yarn
```shell
yarn add vk-io
```

## Инициализация
Получение класса  
```javascript
const VK = require('vk-io');
```
### Конструктор
Инициализация новой инстанции модуля

```javascript
const vk = new VK(options);
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| options  | object | [Опции VK](#Опции-vk) |

#### Опции VK
| Параметр      | Тип     | Описание                                 | По умолчанию |
|---------------|---------|------------------------------------------|--------------|
| id            | number  | Идентификатор пользователя               | null         |
| login         | string  | Email/телефон от аккаунта                | null         |
| phone         | number  | Номер телефона                           | null         |
| pass          | string  | Пароль пользователя                      | null         |
| token         | string  | Токен                                    | null         |
| app           | number  | ID приложения                            | null         |
| key           | string  | Секретный ключ прилржения                | null         |
| scope         | string  | Список разрешений                        | max scope    |
| lang          | string  | Язык на котором возвращаются данные      | null         |
| call          | string  | Режим вызова методов ВКонаткте           | api          |
| limit         | number  | Максимальное кол-во запросов в секунду   | 3            |
| timeout       | number  | Время сброса соединения на API           | 6000         |
| proxy         | string  | Установка прокси сервера                 | null         |
| callCount     | number  | Количество запросов при call - `execute` | 25           |
| authCaptcha   | number  | Количество попыток пройти капчу          | 3            |
| longpollCount | number  | Количество попыток перезапуска Long Poll | 6            |
| longpollWait  | number  | Время ожидания перезапуска Long Poll     | 6000         |
| restartError  | boolean | Перезапускать ли при ошибках запрос      | true         |
| restartCount  | number  | Количество попыток перезапуска           | 3            |
| restartWait   | number  | Время ожидания перезапуска               | 3000         |

Немного дополнительной информации

#### scope
Для того чтобы установить полный список разрешений передайте в `scope` строку `all`

#### call
По умолчанию стоит режим `api`, если установить `execute` все запросы через `vk.api.[method]` будут собираться через метод [execute](https://vk.com/dev/execute)

В `.catch()` будут возвращаться `ExecuteError` или `ApiError`, зависит от ситуации

#### callCount
Устанавливает ограничение по количеству выполняемых методов за раз при опции `call` - `execute`, максимум 25, минимум 2

#### proxy
В `proxy` передаётся строка содержащая URI формат, пример `http://proxy.com`

При наличии в строке авторизации (`http://login:pass@proxy.com`) она будет передана заголовком `Proxy-Authorization` Basic аутентификации

### setToken
Устанавливает токен

```javascript
vk.setToken(token);
```

| Параметр | Тип    | Описание |
|----------|--------|----------|
| token    | string | Токен    |

### setOptions
Устанавливает опции модулю
```javascript
vk.setOptions(options)
```

| Параметр | Тип    | Описание                                                         |
|----------|--------|------------------------------------------------------------------|
| options  | object | [Опции VK](#Опции-vk) |

## Авторизация
Есть несколько типов авторизации

> Обратите внимание

> Авторизация не заменяет токен в настройках модуля

### Автономное приложение ([Standalone](https://vk.com/dev/standalone))
Для авторизации необходимы опции `app`, `key`, `scope`, `login` или `phone`

По умолчанию `scope` содержит все разрешения
```javascript
vk.setOptions({
	app: 111,
	login: 'protagonist@valtec.com',
	pass: 'luckyVaultBoy',
	phone: '+749531116869'
});

const auth = vk.auth.standalone();

auth.run()
.then((token) => {
	console.log('User token:',token);
})
.catch((error) => {
	console.error(error);
});
```

#### standalone.getCookie
Возвращает cookie после успешной авторизации для сайта и поддомена

```javascript
auth.getCookie(); // => Object
```

```javascript
{
	'vk.com': '...',
	'login.vk.com': '...'
}
```

#### standalone.getCookieJar
Возвращает CookieJar для модуля request

```javascript
auth.getCookieJar(); // => CookieJar
```

#### standalone.setCookieJar
Устанавливает CookieJar от модуля request

```
auth.setCookieJar(jar); // => this
```

| Параметр | Тип       | Описание         |
|----------|-----------|------------------|
| jar      | CookieJar | Хранилище cookie |

### Серверная авторизация ([Client Credentials Flow](https://vk.com/dev/client_cred_flow))
Для получения сервисного ключа доступа необходимы опции `app`, `key`
```javascript
vk.setOptions({
	app: 111,
	key: 'super-secret-key'
});

vk.auth.server()
.then((token) => {
	console.log('Server token:',token);
})
.catch((error) => {
	console.error(error);
});
```

### Авторизация через официальные приложения ([Direct](https://vk.com/dev/auth_direct))
Для авторизации необходимы опции `scope`, `pass`, `login` или `phone`

#### Android
```javascript
const auth = vk.auth.android();
```

#### Windows
```javascript
const auth = vk.auth.windows();
```

#### Windows Phone
```javascript
const auth = vk.auth.windowsPhone();
```

#### iPhone
```javascript
const auth = vk.auth.iphone();
```

#### iPad
```javascript
const auth = vk.auth.ipad();
```
#### Дальнейшие действия
```javascript
auth.run()
.then((account) => {
	console.log('User:',account.user);
	console.log('Token:',account.token);
	console.log('Expires:',account.expires);

	if ('email' in account) {
		console.log('Email:',account.email);
	}
})
.catch((error) => {
	console.error(error);
});
```

## Вызов методов ВКонтакте API
Необходимо скопировать название из [списка методов](https://vk.com/dev/methods) и вставить его после `vk.api.[method]`

На примере получение записей со стены через `wall.get`
```javascript
vk.api.wall.get(params); // => Promise
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| params   | object | Параметры метода |

```javascript
vk.api.wall.get({
	user_id: 1,
	count: 5
})
.then((wall) => {
	console.log('Wall:',wall);
})
.catch((error) => {
	console.error(error);
});
```

### Альтернативный вызов методов
Если метод отсутствует в списке или необходимо вызвать строкой
```javascript
vk.api.call(method, params); // => Promise
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| method   | string | Метод API        |
| params   | object | Параметры метода |

### api.execute
Вызывает метод API [execute](https://vk.com/dev/execute)

```javascript
vk.api.execute(params); // => Promise
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| params   | object | Параметры метода |

Возвращает объект описанный ниже

```javascript
{
	response: mixed,
	errors: []
}
```

| Параметр | Тип   | Описание                     |
|----------|-------|------------------------------|
| response | mixed | Результат работы метода      |
| errors   | array | Список ошибок (ExecuteError) |

### api.isMethod
Позволяет проверить метод на наличие
```javascript
vk.api.isMethod(method); // => boolean
```

| Параметр | Тип    | Описание  |
|----------|--------|-----------|
| method   | string | Метод API |

### Вызов хранимой процедуры приложения
```javascript
vk.procedure(name, params); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| name     | string | Название процедуры  |
| params   | object | Параметры процедуры |

### Работа с цепочкой методов
Цепочки методов работают на API [execute](https://vk.com/dev/execute)

Можно передать неограниченное количество методов в цепочку

Тем самым позволяя вызывать не один метод за раз, а сразу по 25

#### executes
Вызывает один и тот же метод с массивом параметров

В случае ошибки в массиве на месте метода будет `false`
```javascript
vk.executes(method, queue); // => Promise
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| method   | string | Метод API             |
| queue    | array  | Очередь из параметров |

Например получить первую запись пользователей

```javascript
vk.executes('wall.get',[
	{owner_id: 1, count: 1},
	{owner_id: 2, count: 1},
	{owner_id: 3, count: 1},
	{owner_id: 4, count: 1},
	{owner_id: 5, count: 1},
	<...many>
]);
```

#### chain
Позволяет вызывать сразу разные методы со своей обработкой данных
```javascriptsend
const chain = vk.chain();
```

##### append
Добавляет метод в очередь

> Обратите внимание

> Если был вызван `.execute()` и вызвать `.append()` выбросится синхронное исключение

```javascript
chain.append(method, params); // => Promise
```

| Параметр | Тип    | Описание         |
|----------|--------|------------------|
| method   | string | Метод API        |
| params   | object | Параметры метода |

##### execute
Запускает выполнение цепочки методов

Если цепочка методов пуста в результат вернётся пустой массив

Возвращает все результаты из добавленных методов

```javascript
chain.execute(); // => Promise
```

Не обязательно вызывать `.execute()` для получения `Promise`, достаточно повесить обработчики на сам объект

```javascript
chain.then(handler); // => Promise

// Или

chain.catch(handler); // => Promise
```

Простой пример применения цепочки
```javascript
const chain = vk.chain();

chain.append('users.get',{
	user_id: 1
})
.then((user) => {
	console.log(user);
})
.catch((error) => {
	console.error(error);
});

chain.append('friends.get',{
	user_id: 1,
	order: 'random'
})
.then((friends) => {
	console.log(friends);
})
.catch((error) => {
	console.error(error);
});

chain.execute()
.then((results) => {
	const user = results[0];
	const friends = results[1];
})
.catch((error) => {
	console.error(error);
});
```

## Работа с коллекциями
Позволяет получить произвольное количество данных с методов в которых присутствуют параметры `offset` и `count`

Список необязательных параметров

| Параметр | Тип    | Описание                          | По умолчанию |
|----------|--------|-----------------------------------|--------------|
| offset   | number | Ручное смещение                   | 0            |
| count    | number | Сколько нужно получить данных     | Все          |
| maxCalls | number | Количество вызовов методов за раз | 25           |

В случаях если вы получаете ошибку `13` с комментарием `response size is too big` укажите меньше количество запросов параметром `maxCalls`

Первый режим работы коллекций основанный на потоках, на примере получение записей  со стены пользователя

```javascript
vk.collect.wall.get({
	user_id: 1
})
.on('data',(items) => {
	console.log('Часть записей:',items.length);
})
.on('end',() => {
	console.log('Все записи со стены получены');
})
.on('error',(error) => {
	console.error(error);
});
```
Так же можно получить все данные единоразово через интерфейс `Promise`

> Обратите внимание

> Если вы используете потоковый режим, не используйте `Promise` для того что бы узнать когда завершиться процесс получения данных, так как он будет сохранять данные для передачи в `Promise`
```javascript
vk.collect.wall.get({
	user_id: 1
})
.then((items) => {
	console.log('Все записи со стены получены:',items.length);
})
.catch((error) => {
	console.error(error);
});
```

## Загрузка файлов
Для упрощение работы в каждый метод загрузки передавайте параметры которые нужны как для получения сервера, так и для сохранения загруженного файла

Для каждого метода загрузки существует несколько общих параметров

`source` - Поддерживаемые источники файлов
- Путь к файлу
- Url
- `Buffer`
- `ReadStream`
- Объект [request](https://github.com/request/request)

Если необходимо вручную указать MIME-type и названия файла воспользуйтесь такой конструкцией, особенно касается источников с типом `Buffer` и `Url`

```javascript
source: {
	value: <source>,
	options: {
		filename: 'myfile.jpg',
		contentType: 'image/jpeg'
	}
}
```

Необязательные параметры

| Параметр  | Тип    | Описание                             | По умолчанию |
|-----------|--------|--------------------------------------|--------------|
| timeout   | number | Время ожидания для сброса соединения | 15000        |
| uploadUrl | string | Сервер для загрузки файла            | null         |

Главный аргумент в методах

| Параметр | Тип    | Описание           |
|----------|--------|--------------------|
| params   | object | Параметры загрузки |

### upload.album
Загрузка фотографий в альбом

В `source` можно передать массив в котором будет не более 5 файлов

После загрузки вернётся массив с загруженными фотографиями

```javascript
vk.upload.album(params); // => Promise
```

Пример загрузки с передачей массива

```javascript
vk.upload.album({
	album_id: 1234,
	source: [
		/* Загрузка через ReadStream */
		fs.createReadStream(__dirname+'/assets/kitten.jpg'),
		/* Загрузка с указанием MIME-type */
		{
			value: fs.createReadStream(__dirname+'/assets/withoutexpansion'),
			options: {
				filename: 'mykitten.jpg',
				contentType: 'image/jpeg'
			}
		}
	]
})
.then((photos) => {
	console.log('Загруженные фотографии:',photos);
})
.catch((error) => {
	console.error(error);
})
```

### upload.wall
Загрузка фотографий на стену

```javascript
vk.upload.wall(params); // => Promise
```

### upload.owner
Загрузка главной фотографии пользователя или сообщества

```javascript
vk.upload.owner(params); // => Promise
```

### upload.message
Загрузка изображения в личное сообщение

```javascript
vk.upload.message(params); // => Promise
```

### upload.chat
Загрузка главной фотографии для беседы

```javascript
vk.upload.chat(params); // => Promise
```

### upload.product
Загрузка фотографии для товара

```javascript
vk.upload.product(params); // => Promise
```

### upload.selection
Загрузка фотографии для подборки товаров

```javascript
vk.upload.selection(params); // => Promise
```

### upload.audio
Загрузка аудиозаписей

```javascript
vk.upload.audio(params); // => Promise
```

### upload.video
Загрузка видеозаписей

```javascript
vk.upload.video(params); // => Promise
```

### upload.doc
Загрузка документов

```javascript
vk.upload.doc(params); // => Promise
```

### upload.wallDoc
Загрузка документов для последующей отправки документа на стену или личным сообщением

```javascript
vk.upload.wallDoc(params); // => Promise
```

### upload.graffiti
Загрузка граффити

Поддерживаемые расширения `png`, `svg`

```javascript
vk.upload.graffiti(params); // => Promise
```

### upload.voice
Загрузка аудио сообщения

Поддерживаемые расширения `mp3`, `ogg`

```javascript
vk.upload.voice(params); // => Promise
```

### upload.cover
Загрузка обложки сообщества

```javascript
vk.upload.cover(params); // => Promise
```

## Работа с [Long Poll](https://vk.com/dev/using_longpoll)
Модуль предоставляет удобную обёртку для работы с Long Poll сервером

### longpoll.start
Запускает цикл получения обновлений
```javascript
vk.longpoll.start()
.then(() => {
	console.log('Long Poll запущен');
})
.catch((error) => {
	console.error(error);
});
```

### longpoll.restart
Перезапускает цикл получения обновлений с обновлённым сервером
```javascript
vk.longpoll.restart()
.then(() => {
	console.log('Long Poll цикл перезапущен');
})
.catch((error) => {
	console.error(error);
});
```

### longpoll.stop
Останавливает цикл получения данных с Long Poll
```javascript
vk.longpoll.stop()
.then(() => {
	console.log('Long Poll остановлен');
})
.catch((error) => {
	console.error(error);
});
```

### longpoll.usePts
Если установить `true` будет генерировать событие `pts` с идентификатором который нужен для метода `messages.getLongPollHistory`
```javascript
vk.longpoll.usePts(need); // => Longpoll
```

| Параметр | Тип     | Описание     |
|----------|---------|--------------|
| need     | boolean | Нужен ли pts |

### longpoll.isStarted
Возвращает состояние цикла

```javascript
vk.longpoll.isStarted(); // => boolean
```

### longpoll.on
Позволяет повешать событие, можно использовать и другие методы [EventEmitter](https://nodejs.org/api/events.html)

```javascript
vk.longpoll.on(event, handler);
```

| Параметр | Тип      | Описание          |
|----------|----------|-------------------|
| event    | string   | Событие Long Poll |
| handler  | function | Обработчик        |

### События Long Poll
#### message.flag.replace
Замена флагов сообщения

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор сообщения  |
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### message.flag.set
Установка флагов сообщения

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор сообщения  |
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### message.flag.remove
Сброс флагов сообщения

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор сообщения  |
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### message
Появилось новое сообщение

| Свойство    | Тип     | Описание                              |
|-------------|---------|---------------------------------------|
| id          | number  | Идентификатор сообщения               |
| date        | number  | Время отправки в Unix                 |
| peer        | number  | Идентификатор назначения              |
| from        | string  | Откуда отправлено (dialog,chat,group) |
| user        | number  | Идентификатор пользователя            |
| chat        | number  | Идентификатор беседы                  |
| title       | string  | Заголовок беседы                      |
| text        | string  | Текст сообщения                       |
| admin       | number  | Идентификатор администратора (группа) |
| flags       | array   | Список флагов сообщения               |
| hasEmoji    | boolean | Присутствуют ли emoji в тексте        |
| attachments | object  | Прикрепления к сообщениям             |

##### Описания объекта прикреплении

| Свойство | Тип    | Описание                      |
|----------|--------|-------------------------------|
| photo    | array  | Прикрепленные изображения     |
| doc      | array  | Прикрепленные документы       |
| video    | array  | Прикрепленные видео           |
| audio    | array  | Прикрепленные аудио           |
| wall     | array  | Прикрепленные записи со стены |
| link     | array  | Прикрепленные ссылки          |
| sticker  | object | Стикер                        |
| gift     | object | Подарок                       |
| money    | object | Деньги                        |
| geo      | object | Карта                         |

`photo`, `doc`, `video`, `audio`, `wall` - Основная структура
- `id` - Идентификатор прикрепления
- `owner` - Идентификатор пользователя

`doc` - Может содержать дополнительное поле `type`

`link` - Ссылка
- `url` - Url ссылки
- `title` - Заголовок ссылки
- `description` - Описание ссылки
- `photo` - Идентификатор изображения ссылки

`sticker` - Стикер
- `id` - Идентификатор стикера
- `product` - Идентификатор набора стикера

`gift` - Подарок
- `id` - Идентификатор подарка

`money` - Перевод денег
- `amount` - Сумма
- `currency` - Валюта

`geo` - Карта
- `id` - Идентификатор карты
- `provider` - Идентификатор картографического сервиса

##### message.send
Отправляет сообщение в текущий диалог через метод `messages.send`

```javascript
message.send(params); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| params   | object | Параметры сообщения |

```javascript
message.send(text [, params]); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| text     | string | Текст сообщения     |
| params   | object | Параметры сообщения |

##### message.sendSticker
Отправляет стикер в текущий диалог

```javascript
message.sendSticker(id); // => Promise
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| id       | number | Идентификатор стикера |

##### message.sendPhoto
Отправляет фотографию в текущий диалог

```javascript
message.sendPhoto(source [, params]); // => Promise
```

| Параметр | Тип    | Описание                 |
|----------|--------|--------------------------|
| source   | mixed  | Источник загрузки        |
| params   | object | Дополнительные параметры |

##### message.reply
Отвечает на сообщение в текущем диалоге

```javascript
message.reply(params); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| params   | object | Параметры сообщения |

```javascript
message.reply(text [, params]); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| text     | string | Текст сообщения     |
| params   | object | Параметры сообщения |

##### message.setActivity
Изменяет статус набора текста пользователем в диалоге

```javascript
message.setActivity(); // => Promise
```

##### message.hasFlag
Проверяет наличие флага
```javascript
message.hasFlag(name); // => boolean
```

| Параметр | Тип    | Описание       |
|----------|--------|----------------|
| name     | string | Название флага |

##### message.hasAttachments
Проверяет наличие прикриплений
```javascript
message.hasAttachments(); // => boolean
```

##### message.hasAttachment
Проверяет наличие прикрепления
```javascript
message.hasAttachment(name); // => boolean
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| name     | string | Название прикрепления |

##### message.hasFwd
Проверяет наличие пересылаемых сообщений
```javascript
message.hasFwd(); // => boolean
```

##### message.isDialog
Сообщение из диалога
```javascript
message.isDialog(); // => boolean
```

##### message.isChat
Сообщение из беседы
```javascript
message.isChat(); // => boolean
```

##### message.isGroup
Сообщение из сообщества
```javascript
message.isGroup(); // => boolean
```

##### message.getFwd
Разбирает пересылаемые сообщения
```javascript
message.getFwd(); // => array
```

Сообщения при разборе будут иметь примерно такую структуру

`id` - Идентификатор сообщения

`owner` - Идентификатор пользователя

`fwd` - Вложенные пересылаемые сообщения

```javascript
[
	{id: 1234, owner: 1234, fwd: [
		{id: 5678, owner: 5678, fwd: [...]}
	]},
	{id: 91234,...}
]
```

#### message.read.inbox
Прочтение всех входящих сообщений

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор сообщения  |
| peer     | number | Идентификатор назначения |

#### message.read.outbox
Прочтение всех исходящих сообщений

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор сообщения  |
| peer     | number | Идентификатор назначения |

#### user.online
Пользователь стал онлайн

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| user     | number | Идентификатор пользователя |
| platform | string | Идентификатор платформы    |

Список платформ

`standalone` - Standalone приложение или web-версия

`mobile` - Мобильная версия

`iphone` - Официальное приложение для iPhone

`ipad` - Официальное приложение для iPad

`android` - Официальное приложение для Android

`wphone` - Официальное приложение для Windows Phone

`windows` - Официальное приложение для Windows

#### user.offline
Пользователь стал оффлайн

| Свойство | Тип     | Описание                   |
|----------|---------|----------------------------|
| user     | number  | Идентификатор пользователя |
| exit     | boolean | Пользователь сам вышел     |

#### group.flag.remove
Сброс флагов диалога сообщества

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### group.flag.replace
Замена флагов диалога сообщества

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### group.flag.set
Установка флагов диалога сообщества

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| peer     | number | Идентификатор назначения |
| flags    | array  | Список флагов            |

#### chat.action
Произошли изменения в беседе

| Свойство | Тип     | Описание                            |
|----------|---------|-------------------------------------|
| chat     | number  | Идентификатор беседы                |
| self     | boolean | Изменения произведены пользователем |

#### typing.user
Пользователь начал набирать текст в диалоге

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| user     | number | Идентификатор пользователя |

#### typing.chat
Пользователь начал набирать текст в беседе

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| user     | number | Идентификатор пользователя |
| chat     | number | Идентификатор беседы       |

#### unread.count
Счётчик количества непрочитанных сообщений

| Свойство | Тип    | Описание                           |
|----------|--------|------------------------------------|
| count    | number | Количество непрочитанных сообщений |

### События беседы
События которые произошли в беседе, общие свойства

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| id       | number | Идентификатор сообщения    |
| date     | number | Время отправки в Unix      |
| peer     | number | Идентификатор назначения   |
| user     | number | Идентификатор пользователя |
| chat     | number | Идентификатор беседы       |
| title    | string | Заголовок беседы       |

##### action.send
Отправляет сообщение в текущую беседу через метод `messages.send`

```javascript
action.send(params); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| params   | object | Параметры сообщения |

```javascript
action.send(text [, params]); // => Promise
```

| Параметр | Тип    | Описание            |
|----------|--------|---------------------|
| text     | string | Текст сообщения     |
| params   | object | Параметры сообщения |

##### message.sendSticker
Отправляет стикер в текущий диалог

```javascript
message.sendSticker(id); // => Promise
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| id       | number | Идентификатор стикера |

##### message.sendPhoto
Отправляет фотографию в текущий диалог

```javascript
message.sendPhoto(source [, params]); // => Promise
```

| Параметр | Тип    | Описание                 |
|----------|--------|--------------------------|
| source   | mixed  | Источник загрузки        |
| params   | object | Дополнительные параметры |

##### message.setActivity
Изменяет статус набора текста пользователем в диалоге

```javascript
message.setActivity(); // => Promise
```

#### chat.create
Создана беседа

#### chat.rename
Беседа переименована

##### action.rename
Переименовывает беседу
```javascript
action.rename(title); // => Promise
```

| Параметр | Тип    | Описание              |
|----------|--------|-----------------------|
| title    | string | Новое название беседы |

#### chat.invite
Добавлен пользователь в беседу

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| invite   | number | Идентификатор пользователя |

##### action.kick
Исключает пользователя если есть права

Можно указать другой идентификатор пользователя

```javascript
action.kick(id); // => Promise
```

| Параметр | Тип    | Описание                          |
|----------|--------|-----------------------------------|
| id       | number | Другой идентификатор пользователя |

#### chat.kick
Пользователя исключили из беседы

| Свойство | Тип    | Описание                   |
|----------|--------|----------------------------|
| kick     | number | Идентификатор пользователя |

##### action.invite
Позволяет пригласить пользователя обратно

Можно указать другой идентификатор пользователя

```javascript
action.invite(id); // => Promise
```

| Параметр | Тип    | Описание                          |
|----------|--------|-----------------------------------|
| id       | number | Другой идентификатор пользователя |

#### chat.photo.update
Обновлена обложка беседы

| Свойство | Тип    | Описание       |
|----------|--------|----------------|
| photo    | object | Обложка беседы |

`id` - Идентификатор фотографии

`owner` - Идентификатор пользователя

##### action.remove
Удаляет обложку беседы

```javascript
action.remove(); // => Promise
```

#### chat.photo.remove
Удалена обложка беседы

### Остальные события
#### pts
Генерируется только если `vk.longpoll.usePts(true);`, необходим для метода `messages.getLongPollHistory`

| Свойство | Тип    | Описание       |
|----------|--------|----------------|
| ts       | number | Timestamp      |
| pts      | number | Poll Timestamp |

#### raw
Возвращает необработанные данные Long Poll

## Обработка исключений
Во всех примерах выше использовался данный способ обработки ошибок
```javascript
.catch((error) => {
	console.error(error);
});
```
Но в приложениях не один модуль и по этому необходимо обрабатывать исключения для каждого модуля свои, да и ошибки могут быть разные

### Обработка ApiError
Возникает когда API вернуло вместо результата работы метода, ошибку

Обработать её можно следующим образом

```javascript
const { ApiError } = require('vk-io/errors');

/* ... */

/* Будет выброшено исключения из-за отсутствия параметров */
vk.api.messages.send()
.catch(ApiError,(error) => {
	console.error(`Api error №${error.code} ${error.message}`);
});
```

Полный список свойств которые можно получить из ошибки

| Свойство    | Тип    | Описание                                                       |
|-------------|--------|----------------------------------------------------------------|
| code        | number | Код ошибки                                                     |
| message     | string | Описание ошибки                                                |
| params      | array  | Список параметров                                              |
| captchaSid  | number | Идентификатор captcha [№14](https://vk.com/dev/captcha_error)  |
| captchaImg  | number | Url изображения капчи [№14](https://vk.com/dev/captcha_error)  |
| redirectUri | string | Ссылка переадресации [№17](https://vk.com/dev/need_validation) |

### Обработка RequestError
Возникает при проблемах в соединении или ответа сервера с ошибкой (не путать с ApiError)

Обработать её можно следующим образом

```javascript
const { RequestError } = require('vk-io/errors');

/* ... */

vk.api.users.get()
.catch(RequestError,(error) => {
	console.error(`Request error ${error.message}`);
});
```

Полный список свойств которые можно получить из ошибки

| Свойство   | Тип    | Описание        |
|------------|--------|-----------------|
| message    | string | Описание ошибки |
| statusCode | number | HTTP код ошибки |

### Обработка UploadError
Возникает когда при загрузке файла произошла ошибка

Обработать её можно следующим образом

```javascript
const { UploadError } = require('vk-io/errors');

/* ... */

vk.upload.doc(...)
.catch(UploadError,(error) => {
	console.error(`Ошибка загрузки ${error.message}`);
});
```

Полный список свойств которые можно получить из ошибки

| Свойство   | Тип    | Описание        |
|------------|--------|-----------------|
| message    | string | Описание ошибки |

### Обработка AuthError
Возникает при ошибках авторизации

Обработать её можно следующим образом

```javascript
const { AuthError } = require('vk-io/errors');

/* ... */

vk.auth.standalone().run()
.catch(AuthError,(error) => {
	console.error(`Ошибка авторизации ${error.message}`);
});
```

Полный список свойств которые можно получить из ошибки

| Свойство   | Тип    | Описание        |
|------------|--------|-----------------|
| message    | string | Описание ошибки |

#### Типы ошибок авторизации
Узнать тип ошибки авторизации можно таким образом

```javascript
const { AuthError, AUTH_ERRORS } = require('vk-io/errors');

const { PAGE_BLOCKED } = AUTH_ERRORS;

/* ... */

vk.auth.standalone().run()
.catch(AuthError,(error) => {
	/* Проверка что страница заблокирована */
	if (error.code === PAGE_BLOCKED) {
		return console.log('Oops, страница заблокирована');
	}

	console.log(`Другая ошибка авторизации ${error.code}`);
});
```

Список всех констант ошибок авторизации

- `PAGE_BLOCKED` - Страница заблокирована

- `MISSING_CAPTCHA` - Отсутствует обработчик капчи

- `INVALID_PHONE_NUMBER` - Неверный номер телефона

- `AUTHORIZATION_FAILED` - Авторизация провалена

### Обработка ExecuteError
Возникает при работе с методом API [execute](https://vk.com/dev/execute)

Обработать её можно следующим образом

```javascript
const { ExecuteError } = require('vk-io/errors');

/* ... */

chain.append(...)
.catch(ExecuteError,(error) => {
	console.error(`Api ${error.method} error №${error.code} ${error.message}`);
});
```

Полный список свойств которые можно получить из ошибки

| Свойство | Тип    | Описание        |
|----------|--------|-----------------|
| message  | string | Описание ошибки |
| code     | number | Код ошибки      |
| method   | string | Метод API       |

### Отлов любой ошибки модуля
Все ошибки модуля наследуют класс `VKError`, с ним вы сможете поймать любое исключение модуля vk-io

```javascript
const { VKError } = require('vk-io/errors');

/* ... */

myBluebirdGetId()
.then((id) => {
	return vk.api.users.get({
		user_id: id
	});
})
.then(...)
.catch(VKError,(error) => {
	console.error(`Ошибка vk-io ${error.message}`);
})
.catch((error) => {
	console.error('Другая ошибка',error);
});
```
### Обработка [captcha](https://vk.com/dev/captcha_error)
Если обработчик captcha не установлен, то в `.catch` будет возвращаться ошибка `ApiError` с кодом `№14`

Если в вашем приложение нужно организовать обработку captcha не повторяя запросы вручную, можно установить универсальный обработчик

```javascript
vk.setCaptchaHandler(handler); // => VK
```

| Параметр | Тип      | Описание           |
|----------|----------|--------------------|
| handler  | function | Обработчик captcha |

```javascript
vk.setCaptchaHandler((src, sid, retry) => {
	youSuperAwesomeCaptchaHandler(src)
	.then((key) => {
		return retry(key); // => Promise
	})
	.then(() => {
		console.log('Captcha введена верно');
	})
	.catch((error) => {
		console.log('Captcha введена неверно');
	});
});
```

| Параметр | Тип      | Описание                            |
|----------|----------|-------------------------------------|
| src      | string   | Url изображения капчи               |
| sid      | number   | Идентификатор captcha               |
| retry    | function | Повторить запрос с текстом captcha  |

## Логирование
Логирование производится через модуль [debug](http://npmjs.com/package/debug)

Для того что бы получать все данные логирование модуля подставьте переменную окружения DEBUG

### Windows
```shell
set DEBUG=vk-io:*
```

### Linux/Mac
```shell
DEBUG=vk-io:*
```

Список компонентов логирования

- `main` - Главный класс VK

- `auth` - Авторизация

- `api` - Api

- `collect` - Коллекции

- `upload` - Загрузка файлов

- `longpoll` - Long Poll

## Сниппеты
### parseLink
Разбирает ссылку ВКонтакте
```javascript
vk.parseLink(link); // => Promise
```

| Параметр | Тип             | Описание |
|----------|-----------------|----------|
| link     | string / number | Ссылка   |

Возвращает объект

| Свойство | Тип    | Описание                 |
|----------|--------|--------------------------|
| id       | number | Идентификатор            |
| type     | string | Тип ссылки               |
| peer     | number | Идентификатор назначения |

Возможные значения `type`

- `user` - Пользователь

- `app` - Приложение

- `group` - Группа

- `photo` - Фотография

- `video` - Видео

- `doc` - Документ

- `album` - Альбом

- `topic` - Топик

- `wall` - Стена

- `page` - Страница

Свойство `peer` присутствует только с `photo`, `video`, `doc`, `album`, `topic`, `wall`, `page`

### Получение ссылок фотографий с объекта photo
Есть 3 метода для получения ссылки с объекта [photo](https://vk.com/dev/objects/photo)

Если метод не находит ссылку на фотографию он будет искать меньшего размера пока не найдёт существующие разрешение

#### getLargePhoto
Возвращает фотографии разрешения `2560` или `1280`

```javascript
vk.getLargePhoto(photo); // => string
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| photo    | object | Объект фотографии |

#### getMediumPhoto
Возвращает фотографии разрешения `807` или `604`

```javascript
vk.getMediumPhoto(photo); // => string
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| photo    | object | Объект фотографии |

#### getSmallPhoto
Возвращает фотографии разрешения `130` или `75`

```javascript
vk.getSmallPhoto(photo); // => string
```

| Параметр | Тип    | Описание          |
|----------|--------|-------------------|
| photo    | object | Объект фотографии |

#### Пример работы с методами
На примере получения фотографии [Павла Дурова](https://vk.com/photo1_376599151)

```javascript
vk.api.photos.getById({
	photos: '1_376599151'
})
.then((photos) => photos[0])
.then((photo) => {
	const urlLarge = vk.getLargePhoto(photo);
	const urlMedium = vk.getMediumPhoto(photo);
	const urlSmall = vk.getSmallPhoto(photo);

	console.log('Url large compare:', photo.photo_2560 === urlLarge); // => true
	console.log('Url medium compare:', photo.photo_807 === urlMedium); // => true
	console.log('Url small compare:', photo.photo_130 === urlSmall); // => true
});
```

### getAttachment
Позволяет получить прикрепления с [объектов](https://vk.com/dev/objects)
```javascript
vk.getAttachment(type, attachment); // => array / string
```

| Параметр   | Тип            | Описание            |
|------------|----------------|---------------------|
| type       | string         | Тип прикрепления    |
| attachment | array / object | Объект прикрепления |

Пример получения прикрепления документа после загрузки

```javascript
vk.upload.doc(...)
.then((doc) => {
	const attachment = vk.getAttachment('doc', doc);

	console.log(attachment); // => doc<owner_id>_<doc_id>
});
```

## Геттеры
### getToken
Возвращает токен
```javascript
vk.getToken(); // => string
```

### API_VERSION
Возвращает текущую версию API
```javascript
vk.API_VERSION; // => string
```

## Тесты
Для запуска теста нужно написать в консоль
```shell
npm test
```

## TODO
Если вам есть что предложить прошу написать мне [VK](https://vk.com/id195624402) или сделать pull request
