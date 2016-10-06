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

Идентификатор  пользователя

##### app
Тип: `number` или `string`

Идентификатор приложения `standlone`

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

##### ignoreMe
Тип: `boolean`

По умолчанию: `true`

Игнорировать ли себя в `longpoll`, если только указан id в настройках

##### timeout
Тип: `number`

По умолчанию: `6`

Время ожидания для сброса соединения в секундах

##### limit
Тип: `number`

По умолчанию: `3`

Лимит запросов в секунду

### Авторизация через standlone
Для авторизации `standlone` нужно установить `app`, `pass`, `login` или `phone`

Пример авторизации, по умолчанию scope содержит все разрешения
```javascript
vk.setting({
	app: 111,
	login: 'protagonist@valtec.com',
	pass: 'luckyVaultBoy',
	phone: '+749531116869'
});

const auth = vk.standloneAuth();

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

##### timeout
Тип: `number`

По умолчанию: `15`

Необязательный парметр, время ожидания для сброса соединения в секундах

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
vk.on('message',(msg) => {
	console.log('Новое сообщение:',msg.text);
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

`rename` - функция для переименование чата,

В качестве аргумента новое название чата

```javascript
msg.rename(<Название чата>);
```

##### chat.invite
В чат был добавлен новый участник или вернулся который вышел

`invite` - идентификатор пользователя которого пригласили

`kick` - функция для кика пользователя,

Работает если пользователь пригласил или пользователь администратор чата

Необязательный параметр позволяет указать идентификатор другого пользователя
```javascript
msg.kick(); // -> promise

msg.kick(<Идентификатор>);
```

##### chat.kick
В чате исключили пользователя или он вышел

`kick` - идентификатор пользователя которого исключили

`invite` - функция для приглашения пользователя,

Работает если только пользователя исключили

Необязательный параметр позволяет указать идентификатор другого пользователя

```javascript
msg.invite() // -> promise

msg.invite(<Идентификатор>);
```

##### chat.photo.update
В чате обновили изображение

`photo` - информация о изображение

`remove` - функция для удаления изображения чата
```javascript
msg.remove() // -> promise
```

##### chat.photo.remove
В чате удалили изображение

#### Основные события

##### message
Пришло новое сообщение

`id` - идентификатор сообщения

`date` - когда пришло сообщение в timestamp

`user` - пользователь отправивший сообщение

`text` - текст сообщения

`flags` - флаги сообщения, [подробнее](https://vk.com/dev/using_longpoll_2?f=4.%2BФлаги%2Bсообщений)

`isChat` - сообщения написано ли в чате

`isEmoji` - присутствуют ли emoji в тексте

`chat` - идентификатор чата

`title` - название чата, по умолчанию null

`fwd` - сообщения которые переслали (имеет многоуровневую структуру)

`send` - функция отправки сообщения в текущий диалог, если есть параметр `fwd: true` то сообщение будет прикреплено, примеры вызова
```javascript
msg.send('Простой ответ');

msg.send({
	message: 'Простой ответ без ответа на сообщение',
	fwd: false
});

msg.send('Ответ на сообщение.',{
	fdw: true
});
```

`attach` - прикрипления, подробнее ниже

======

`sticker` - если присутвует значит отправлен просто стикер, содержит: `id` - идентификатор стикера, `product` - наборк стикера

`geo` - карта, содержит: `id` - идентификатор карты, `geo_provider` - идентификатор сервиса карты

`photo` - содержит массив с прикриплениями изображений

`video` - содержит массив с прикриплениями видео

`audio` - содержит массив с прикриплениями аудиозаписями

`doc` - содержит массив с прикриплениями документов

`wall` - содержит массив с прикриплениями постов

`link` - содержит массив с прикриплениями ссылок

##### message.flags.replace
Замена флагов сообщения

`id` - идентификатор сообщения

`flags` - список флагов

##### message.flags.set
Установка флагов сообщения

`id` - идентификатор сообщения

`flags` - список флагов

##### message.flags.reset
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

`platform` - платформа с которой пользователь стал онлайн

##### user.offline
Друг стал оффлайн

`user` - идентификатор пользователя

`exit` - вышел ли пользователь используя кнопку выхода или таймаут

##### group.flags.reset
Сброс флагов фильтрации по папкам для чата/собеседника

`peer` - идентификатор чата/собеседника

`flags` - флаги сообщения

##### group.flags.replace
Замена флагов фильтрации по папкам для чата/собеседника

`peer` - идентификатор чата/собеседника

`flags` - флаги сообщения

##### group.flags.set
Установка флагов фильтрации по папкам для чата/собеседника

`peer` - идентификатор чата/собеседника

`flags` - флаги сообщения

##### chat.action
Один из параметров беседы был изменён

`chat` - идентификатор чата

`self` - вызваны ли изменения самим пользователем

##### typing.user
Пользователь начал набирать текст в диалоге

`user` - идентификатор пользователя

`active` - активный ли набор текста

##### typing.chat
Пользователь начал набирать текст в чате

`user` - идентификатор пользователя

`chat` - идентификатор чата

##### user.call
Пользователь совершил звонок

`user` - идентификатор пользователя

`call` - идентификатор звонка

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
Установка обработчика капчи,

`1 аргумент` - ссылка на капчу

`2 аргумент` - обработчик для повторной отправки с полученой капчей

Пример обработки капчи
```javascript
vk.setCaptchaHandler((src,again) => {
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

### Cтатистики модуля
Для получения статистики модуля нужно обратится к объекту `vk.status`

* `error` - кол-во ошибок
* `done` - кол-во выполненных методов
* `inbox` - кол-во входящих сообщений (longpoll)
* `outbox` - кол-во исходящих сообщений (messages.send)

#### Геттеры
Получение кол-во заданий в очереди
```javascript
vk.getQueue(); // -> integer
```
Получение кол-во очереди сообщений
```javascript
vk.getQueueMessages(); // -> integer
```

Получение токена
```javascript
vk.getToken(); // -> null или string
```

#### События
Обновление очереди сообщений
```javascript
vk.on('queue.messages',(count) => {
	console.log('В очереди сообщений:',count);
});
```

### Утилиты
Проверяет наличие метода
```javascript
vk.isMethod(<Метод>); // -> boolean
```

## TODO
Если вам есть что предложить прошу написать мне [VK](https://vk.com/id195624402) или сделать pull request
