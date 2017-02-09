[![Logo vk-io](https://github.com/negezor/vk-io/blob/master/logo.png?raw=true)](https://www.npmjs.com/package/vk-io)

# VK-IO
> Включает в себя авторизацию, загрузку файлов, longpoll, stream и утилиты

Мощный инструмент для работы с VK API.

[![Build Status](https://travis-ci.org/negezor/vk-io.svg?branch=master)](https://travis-ci.org/negezor/vk-io)
[![NPM version](https://img.shields.io/npm/v/vk-io.svg)](https://www.npmjs.com/package/vk-io)
[![NPM downloads](https://img.shields.io/npm/dt/vk-io.svg)](https://www.npmjs.com/package/vk-io)

## Инициализация / Начало работы
### Установка модуля
```shell
npm install vk-io --save
```
### Инициализация одного экземпляра
```javascript
'use strict';

const vk = new (require('vk-io'));
```
В конструктор так можно сразу передать настройки
```javascript
const VK = require('vk-io');

const group = new VK({
	token: 'token-group'
});
const user = new VK({
	id: 1,
	token: 'token-user'
});
```
### Конфигурация модуля
Сниппет простой установки токена
```javascript
vk.setToken(<Токен>);
```
Настройки которые можно передать в объект
```javascript
vk.setting(<object>);
```
Описание возможных параметров настроек
##### id
Тип: `number`

Идентификатор  пользователя ВКонтакте (временно не используется)

##### app
Тип: `number` или `string`

Идентификатор приложения `standalone`

##### key
Тип: `string`

Секретный ключ приложения

##### pass
Тип: `string`

Пароль пользователя

##### login
Тип: `string`

Логин пользователя, может содержать `email` или `номер телефона`

##### phone
Тип: `string` или `number`

Номер телефона, необходим для валидации авторизации если запросится телефон

Пример записи: `79241111111`, в начале так же может присутствовать `+`

Может использоваться вместо `login`

##### debug
Тип: `boolean`

По умолчанию: `true`

Позволяет логировать действия модуля

##### proxy
Тип: `string`

По умолчанию: `null`

Прокси, формат записи http://example.com/

##### restartError
Тип: `number`

По умолчанию: `true`

Перезапускать метод при ошибках соединения

##### restartCount
Тип: `boolean`

По умолчанию: `3`

Количество попыток перезапуска

##### timeout
Тип: `number`

По умолчанию: `6`

Время ожидания для сброса соединения в секундах

##### limit
Тип: `number`

По умолчанию: `3`

Лимит запросов в секунду

### Авторизация через standalone
Для авторизации `standalone` нужно установить `app`, `pass`, `login` или `phone`

Пример авторизации, по умолчанию scope содержит все разрешения

Авторизация не заменяет токен в настройках модуля, учтите это
```javascript
vk.setting({
	app: 111,
	login: 'protagonist@valtec.com',
	pass: 'luckyVaultBoy',
	phone: '+749531116869'
});

const auth = vk.standaloneAuth();

auth.run()
.then((token) => {
	console.log('Token:',token);
})
.catch((error) => {
	console.error(error);
});
```

Список разрешений можно установить двумя способами
```javascript
vk.setting({
	scope: <array|string>
});

/* Или */

auth.setScope(<array|string>);
```

Также есть возможность установить свой `CookieJar`
```javascript
auth.setCookieJar(<CookieJar>)
```

Из объектов auth можно извлечь дополнительные данные
```javascript
auth.getCookieJar(); // -> CookieJar - Хранилище cookie
auth.getScope(); // -> array - Список разрешений
```

### Серверная авторизация
Токен получается для использования в серверных метода, пример
```javascript
const server = new (require('vk-io'));

server.setting({
	app: '<app>',
	key: '<secret key app>'
});

server.appAuth()
.then((accessToken) => {
	server.setToken(accessToken);

	const userCheckToken = '<token to check>';

	return server.api.secure.checkToken({
		token: userCheckToken
	});
})
.then(console.log)
.catch(console.error);
```

### Авторизация через официальные приложения
Для авторизации необходимо установить только `pass`, `login` или `phone`

Получение объекта Auth официальных приложений
##### Android
```javascript
const auth = vk.androidAuth();
```
##### Windows
```javascript
const auth = vk.windowsAuth();
```
##### Windows Phone
```javascript
const auth = vk.windowsPhoneAuth();
```
##### iPhone
```javascript
const auth = vk.iphoneAuth();
```
##### iPad
```javascript
const auth = vk.ipadAuth();
```
#### Пример дальнейших действий
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
### Выполнение методов VK API
Необходимо скопировать название из [списка методов](https://vk.com/dev/methods)

На примере получение записей со стены через `wall.get`,
```javascript
vk.api.wall.get({
	user_id: 1,
	count: 5
})
.then(wall => wall.items)
.then((items) => {
	console.log(items);
})
.catch((error) => {
	console.error(error);
});
```

Работа с установленными процедурами приложения
```javascript
vk.execute(<Название процедуры>,<Параметры>); // -> promise
```

Если необходимо вызвать много одних и тех же методов рекомендуется использовать `.chain()` или `.executes()`

Для множественного вызова одного метода с разными параметрами есть снипет работающий на`.chain()`
```javascript
vk.executes(<method>,<queue>);

/* Пример  */
vk.executes('friends.add',[
	{user_id: 1},
	{user_id: 2},
	{user_id: 3},
	{user_id: 4},
	{user_id: 5},
	<...many>
]);
```

#### Цепочки методов
Цепочки методов помогают получить много данных с разных методов или просто вызвать их

Можно передать неограниченное количество методов в цепочку

Цепочка будет делится по 25 методов в один execute и возвращать результат

Учтите если был вызван `.execute()` и вызвать `.append()` выбросится синхронное исключение

Пример работы с простой цепочкой
```javascript
const chain = vk.chain();

chain.append('users.get');

chain.append('friends.get',{
	order: 'random'
})
.then((friends) => {
	console.log(friends);
});

chain.execute()
.then((data) => {
	var users = data[0];
	var friends = data[1];

	console.log(users,friends);
});
```
Данные можно получить двумя способами, первый способ просто поставить `.then()` на возвращаемый promise
```javascript
chain.append('users.get')
.then(...)
```
Или же можно получить данные со всех результатов, они будут возвращены в порядке в котором вызваны
```javascript
chain.execute()
.then((results) => {
	console.log(results);
});
```
Если цепочка методов будет пуста, в результат вернётся пустой массив
```javascript
vk.chain().execute()
.then((results) => {
	console.log(results.length === 0); // -> true
})
```
Присутствует простой сниппет для быстрого получение `promise` без обращения к `.execute()`

Простое сокращение `.execute().then(fn)` или `.execute().catch(fn)`
```javascript
chain.then(...);

/* Или же */

chain.catch(...);
```

### Работа с потоками
Потоки только для методов в которых есть параметр `offset`

Позволяет получить все данные или только указанное кол-во в `count`

Например получить все записи со стены пользователя
```javascript
vk.stream.wall.get({
	user_id: 1
})
.then((items) => {
	console.log('Записей на стене:',items.length);

	/* Обрабатываете данные */
})
.catch((error) => {
	console.error(error);
});
```
### Загрузка файлов
##### file
Тип: `Stream`, `string` или `array` в некоторых случаях

Обязательный параметр для загрузки

В `array` может содержать только `Stream` или `string`

В `string` может быть путь к файлу или url на файл

В метод так же можно передавать парметры которые должны быть после загрузки для сохранения

##### timeout
Тип: `number`

По умолчанию: `15`

Необязательный параметр, время ожидания для сброса соединения в секундах

#### Методы для загрузки с описанием

##### album
Загрузка фотографий в альбом

Обязательный параметр `album_id`

В `file` может быть передан массив, не более 5 файлов

##### wall
Загрузка изображения на стену

##### owner
Загрузка фотографии на главную профиля или сообщества

Дополнительный параметр `crop` указываете `x,y,w` квадратной миниатюры, [подробнее](https://vk.com/dev/upload_files?f=3.%20Загрузка%20главной%20фотографии%20пользователя%20или%20сообщества)

##### message
Загрузка изображения в личное сообщение

##### chat
Загрузка фотографии для чата

Дополнительный параметр `crop` указываете объект квадратной миниатюры

`width` - Ширина фотографии после обрезки в px.

`x` - Координата x для обрезки фотографии (верхний правый угол)

`y` - Координата y для обрезки фотографии (верхний правый угол).

##### product
Загрузка фотографии для товара

Дополнительный параметр `crop` указываете объект квадратной миниатюры

`width` - Ширина фотографии после обрезки в px.

`x` - Координата x для обрезки фотографии (верхний правый угол)

`y` - Координата y для обрезки фотографии (верхний правый угол).

##### selection
Загрузка фотографии для подборки товаров

##### audio
Загрузка аудиозаписей

##### video
Загрузка видеозаписи

##### doc
Загрузка документа

##### graffiti
Загрузка граффити, доступные расширения `png`,`svg`

Наследует doc

##### voice
Загрузка аудиосообщения, доступные расширения `mp3`,`ogg`

Наследует doc

#### Пример загрузки файлов в doc
Загрузка в документы
```javascript
/* Request */
vk.upload.doc({
	file: request('https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png')
});

/* URL */
vk.upload.doc({
	file: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
});

/* Stream */
vk.upload.doc({
	file: fs.createReadStream(__dirname+'/assets/uploadDoc.gif')
});

/* Путь к файлу */
vk.upload.doc({
	file: __dirname+'/assets/uploadDoc.gif'
});
```
### Работа с longpoll
Открытие соединения
```javascript
vk.longpoll()
.then(() => {
	console.log('Longpoll запущен!');
})
.catch((error) => {
	console.error(error);
});
```
Закрытие соединения
```javascript
vk.longpollClose();
```
Подпись на события происходит через `EventEmitter`

Пример прослушивания новых сообщений
```javascript
vk.on('message',(message) => {
	console.log('Новое сообщение:',message.text);
});
```

#### Список событий longpoll
> События действий чата, наследуют message

##### chat.create
Был создан чат

`title` - название чата

##### chat.rename
Чат был переименован

`title` - новое название чата

`rename(title)` - метод для переименование чата, в качестве аргумента новое название чата

```javascript
message.rename(<Название чата>);
```

##### chat.invite
В чат был добавлен новый участник или вернулся который вышел

`invite` - идентификатор пользователя которого пригласили

`kick()` - метод для исключения пользователя,

Работает если пользователь пригласил или пользователь администратор чата

Необязательный параметр позволяет указать идентификатор другого пользователя
```javascript
message.kick(); // -> promise

message.kick(<Идентификатор>);
```

##### chat.kick
В чате исключили пользователя или он вышел

`kick` - идентификатор пользователя которого исключили

`invite()` - метод для приглашения пользователя,

Работает если только пользователя исключили

Необязательный параметр позволяет указать идентификатор другого пользователя

```javascript
message.invite() // -> promise

message.invite(<Идентификатор>);
```

##### chat.photo.update
В чате обновили изображение

`photo` - информация о изображение

`remove()` - метод для удаления изображения чата
```javascript
message.remove() // -> promise
```

##### chat.photo.remove
В чате удалили изображение

#### Основные события

##### message
Пришло новое сообщение

Не игнорирует сообщение или события отправленные самим пользователем

`id` - идентификатор сообщения

`date` - когда пришло сообщение в timestamp

`peer` - peer_id, отрицательное для сообщества

`user` - пользователь отправивший сообщение, для сообщества null

`chat` - идентификатор чата

`text` - текст сообщения в случае отсутствия null

`flags` - флаги сообщения, [подробнее](https://vk.com/dev/using_longpoll_2?f=4.%2BФлаги%2Bсообщений)

`hasEmoji` - присутствуют ли emoji в тексте

`title` - название чата, по умолчанию null

`send()` - метод отправки сообщения в текущий диалог (обёртка для messages.send), примеры

```javascript
message.send('Hello, world!');

message.send('Hello, world!',{
	attachment: 'photo195624402_408795472'
});

message.send({
	message: 'Hello, world!'
});
```

`hasFlag()` - проверяет на наличие флага сообщения, пример

```javascript
if (message.hasFlag('friends')) {
	console.log('Написал мой друг ^^');
} else {
	console.log('Я не знаю этого человека :/');
}
```

`hasAttachments()` - проверяет наличие любых прикриплений

`hasAttachment(name)` - проверяет наличие указанного прикрипления

`hasFwd()` - проверяет наличие пересылаемых сообщений

`getFwd()` - возвращает пересылаемые сообщений
```javascript
message.getFwd()
.then((fwd) => {
	console.log(fwd); // [ {id: 1234, owner: 1234, fwd: [...]} [,{id: 4567...}] ]
});
```

`isDialog()` - сообщение написано в личку

`isChat()` - сообщение написано в чате

`isGroup()` - сообщения написано в сообществе

`attachments` - прикрипления, подробнее ниже

======

`geo` - карта, содержит:
- `id` - идентификатор карты
- `provider` - идентификатор сервиса карты

`photo` - содержит массив с прикриплениями изображений

`video` - содержит массив с прикриплениями видео

`audio` - содержит массив с прикриплениями аудиозаписями

`doc` - содержит массив с прикриплениями документов

- `type` - тип прикрипления (graffiti,audiomsg)

`wall` - содержит массив с прикриплениями постов

`link` - содержит массив с прикриплениями ссылок
- `url` - URL ссылки
- `title` - название ссылки
- `description` - описание ссылки
- `photo` - объект `{id: 1234, owner: 5678}` или null

`sticker` - стикер
- `id` - идентификатор стикера
- `product` - идентификатор набора

`gift` - подарок
- `id` - идентификатор подарка

##### message.flags.set
Установка флагов сообщения

`id` - идентификатор сообщения

`flags` - список флагов

##### message.flags.remove
Сброс флагов сообщения

`id` - идентификатор сообщения

`flags` - список флагов

##### message.read.inbox
Прочтение всех входящих сообщений

`peer` - идентификатор начала непрочитанных сообщений

`local` - идентификатор остановки чтения

##### message.read.outbox
Прочтение всех исходящих сообщений

`peer` - идентификатор начала непрочитанных сообщений

`local` - идентификатор остановки чтения

##### user.online
Друг стал онлайн

`user` - идентификатор пользователя

`platform` - платформа с которой пользователь стал онлайн, список платформ ниже

- `standalone` - веб сайт или другое standalone приложение
- `mobile` - мобильная версия ВКонтакте
- `ipad` - офицальное приложение iPad
- `iphone` - офицальное приложение iPhone
- `android` - офицальное приложение Android
- `windows` - офицальное приложение Windows
- `wphone` - офицальное приложение Windows Phone

##### user.offline
Друг стал оффлайн

`user` - идентификатор пользователя

`exit` - вышел ли пользователь используя кнопку выхода или таймаут

##### group.flags.remove
Удаления флагов для сообщения сообщества

`peer` - идентификатор чата/собеседника

`flags` - флаги сообщения

##### group.flags.set
Установка флагов для сообщения сообщества

`peer` - идентификатор чата/собеседника

`flags` - флаги сообщения

##### chat.action
Один из параметров беседы был изменён

`chat` - идентификатор чата

`self` - вызваны ли изменения самим пользователем

##### typing.user
Пользователь начал набирать текст в диалоге

`user` - идентификатор пользователя

##### typing.chat
Пользователь начал набирать текст в чате

`user` - идентификатор пользователя

`chat` - идентификатор чата

##### unread.count
Новый счетчик непрочитанных в левом меню меню

`count` - счётчик непрочитанных диалогов

##### notify.set
Изменились настройки оповещений

`peer` - идентификатор чата/диалога

`sound` - включены или выключены звуковые оповещения

`until` - выключение оповещений на необходимый срок, (-1: навсегда, 0: включены, other: timestamp, когда нужно включить)

### Обработка исключений
#### Captcha / Капча
Установка обработчика капчи, возвращает функция для повтора запроса.

`1 аргумент` - ссылка на капчу

`2 аргумент` - обработчик для повторной отправки с полученой капчей

`3 аргумент` - идентификатор капчи

Пример обработки капчи
```javascript
vk.setCaptchaHandler((src,again,sid) => {
	youSuperAwesomeCaptchaHandler(src)
	.then((code) => {
		again(code)
		.then(() => {
			console.log('Капча введена верно!');
		})
		.catch(() => {
			console.error('Капча введена не верно!');
		});
	});
});
```
#### Исключения в методах VK API
Бывает ввели неверный параметр или сервер дал ошибку, например выдаст ошибку ApiError и как её обработать
```javascript
vk.api.messages.send()
.catch((error) => {
	if (vk.isApiError(error)) {
		console.error('Ошибка API Error:',error);
	}
});
```
Так же возможна проблема при отправке или получение овтета
```javascript
vk.api.messages.send()
.catch((error) => {
	if (vk.isRequestError(error)) {
		console.error('Ошибка Request Error:',error);
	}
});
```
Есть возможность проверить является ли ошибка класса VkIo
```javascript
vk.isError(error); // -> boolean
```
А благодаря bluebird promise можно организовать нужные обработчики
```javascript
vk.api.messages.send()
.catch(vk.ApiError,(error) => {
	console.error('Ошибка API Error:',error);
})
.catch(vk.RequestError,(error) => {
	console.error('Ошибка Request Error:',error);
})
.catch(Error,(error) => {
	console.error('Другая ошибка:',error);
});
```
#### Исключения в авторизации
Проверить является ли ошибка класса авторизации
```javascript
vk.isAuthError(error); // -> boolean
```
А так же catch
```javascript
auth.run()
.catch(vk.AuthError,(error) => {
	console.error('Ошибка авторизации:',error);
})
.catch(Error,(error) => {
	console.error('Другая ошибка:',error);
});
```
### Логгер
В модуле присутствует простой логер, для его замены нужно

Логгер должен поддерживать методы
- `log` - Стандартный лог
- `error` - Сообщения об ошибках
- `warn` - Предупреждения модуля
- `info` - Информация модуля
- `debug` - Данные для дебага
```javascript
vk.setLogger(<logger>);
```
### Сниппеты
#### Парсинг ссылок вк
Принимает один параметр `string` или `number`

Возможные значения `type`
* `user` - Пользователь
* `group` - Группа
* `application` - Приложение

С остальными типами присутствует свойство peer

* `photo` - Фотография
* `video` - Видео
* `doc` - Документ
* `album` - Альбом
* `topic` - Топик
* `wall` - Стена
* `page` - Страница
```javascript
vk.parseLink(<Ссылка>)
.then((link) => {
	console.log('Тип: '+link.type,'Id:',link.id,(link.peer || ''));
})
.catch((error) => {
	console.error(error);
});
```
#### Получение ссылок на фотографию объекта photo
Есть 3 метода для получение ссылки с объекта [photo](https://vk.com/dev/objects/photo)

Если метод не находит ссылку на фотографию он будет искать более меньшего размера пока не найдёт существующие разрешение

`getLargePhoto` - Возвращает фотографии разрешения `2560` или `1280`

`getMediumPhoto` - Возвращает фотографии разрешения `807` или `604`

`getSmallPhoto` - Возвращает фотографии разрешения `130` или `75`

Пример работы с методами
```javascript
vk.api.photos.get({
	album_id: 'profile',
	owner_id: 1,
	rev: 1
})
.then((response) => response.items[0])
.then((photo) => {
	const urlLarge = vk.getLargePhoto(photo);
	const urlMedium = vk.getMediumPhoto(photo);
	const urlSmall = vk.getSmallPhoto(photo);

	console.log(photo.photo_2560 === urlLarge); // -> true
	console.log(photo.photo_807 === urlMedium); // -> true
	console.log(photo.photo_130 === urlSmall); // -> true
});
```
#### Получение прикриплений с объектов
Список доступных объектов [objects](https://vk.com/dev/objects) медиаконтент

Метод `getAttachment`

`1 аргумент` - Тип нужно прикрипления

Тип: `string`

`2 аргумент` - Объекты или массив объектов

Тип: `string` или `array`

Пример работы с методом
```javascript
vk.upload.doc(...)
.then((doc) => {
	const attachment = vk.getAttachment('doc',doc);

	console.log(attachment); // doc<owner_id>_<doc_id>
})
```

#### Геттеры
Получение кол-во заданий в очереди
```javascript
vk.getQueue(); // -> integer
```

Получение токена
```javascript
vk.getToken(); // -> null или string
```

#### Константы
Текущая версия API
```javascript
vk.API_VERSION;
```

#### События
Отсутствуют

### Утилиты
Проверяет наличие метода
```javascript
vk.isMethod(<Метод>); // -> boolean
```

## TODO
Если вам есть что предложить прошу написать мне [VK](https://vk.com/id195624402) или сделать pull request
