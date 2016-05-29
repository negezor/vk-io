# vk-io
###Russian
Модуль для лёгкой работы с vk api!

## npm зависимости
* async
* base-io
* cheerio
* bluebird
* html-entities
* request-promise

## Использование
Инициализация
```javascript
'use strict';

var vk = new (require('vk-io'));
```
Конфигурация
```javascript
vk.setting({
  id: 'ID пользователя',
  email: 'Логин/email/телефон пользователя',
  token: 'Токен пользователя',
  app: 'Приложение standlone',
  key: 'Секретный ключ приложения',
  limit: 3 // Лучше оставить как есть если у вас он не выше 3
});
```
Авторизация вк для полного токена
```javascript
vk.setting({
  app: 114,
  email: 'user@example.com',
  pass: '1234'
});

vk.auth()
.then((token) => {
  // Дальше например сохраняете токен, он так же обновится в настройках
})
```
Запросы на api
Они очень просты, достаточно скопировать название метода с vk.com/dev/methods
На примере messages.get
```javascript
vk.api.messages.get({
  count: 5
})
.then((messages) => {
  // Работаем с данными
});
```
Работа с longpoll.
Метод longpoll возвращает promise, после него не повесить обработчик .on, учтите это.
```javascript
vk.longpoll()
.then(() => {
  // При запуске longpoll продолжаете делать что то
  vk.on('longpoll.message',(msg) => {
    // Например получать сообщения
  });
});
```
Работа с потоками, работает с теми методами в которых есть offset. Например photos.get.
```javascript
vk.stream.photos.get({
  owner_id: 1,
  album_id: 136592355
})
.then((photos) => {
  // Вернёт массив с данными
});
```
Загрузка на сервера вк, на примере загружается картинка в диалог.
Остальные методы можно глянут в файле vk-io/include/upload.js
```javascript
vk.upload.message({
  file: __dirname+'/test.png'
})
.then((image) => {
  // Возвращается объект photo
});
```
Обработка исключений. Капча.
```javascript
vk.on('captcha',(captcha) => {
  // captcha.src - путь до капчи
  // captcha.sid - id капчи
  // captcha.handler - нужно вызвать с передачей кода с капчи
  // Дальше пример, он может отличаться от того что вы будете использовать
  // Использовался модуль https://www.npmjs.com/package/ac-io
  ac.url(captcha.src)
  .then((data) => {
  	captcha.handler(data.code);
  });
});
```
Получение информации о состояние модуля
```javascript
var status = vk.status;

// status.errors - кол-во ошибок
// status.execute - кол-во выполненных методов vk
// status.outbox - кол-во отправленных сообщений
// status.inbox - кол-во принятых сообщений
// status.tasks.queue.length - кол-во заданий в очереди
```
Остальные ошибки можно отловить через .catch() с возвращаемого promise.
## TODO
* Если есть предложение пишите мне сюда https://vk.com/id195624402

### English
Module for easy work with vk api!

## npm depending
* async
* base-io
* cheerio
* bluebird
* html-entities
* request-promise

## Using
Initialization
```javascript
'use strict';

var vk = new (require('vk-io'));
```
Configuration
```javascript
vk.setting({
  id: 'ID user',
  email: 'Login/email/phone user',
  token: 'user token',
  app: 'application standlone',
  key: 'Secret key applications',
  limit: 3 // It is best left as it is if you do it does not exceed 3
});
```
Log in to complete token vk
```javascript
vk.setting({
  app: 114,
  email: 'user@example.com',
  pass: '1234'
});

vk.auth()
.then((token) => {
  // Then save the token for example, it is also updated in the settings
})
```
Requests for api
They are very simple, just copy the name of the method with vk.com/dev/methods
For example messages.get
```javascript
vk.api.messages.get({
  count: 5
})
.then((messages) => {
  // We are working with data
});
```
Working with longpoll.
longpoll method returns a promise, since he did not hang up the handler .on, keep this in mind.
```javascript
vk.longpoll()
.then(() => {
  // When you start longpoll keep doing something
  vk.on('longpoll.message',(msg) => {
    // For example receive messages
  });
});
```
Working with the flow, working with those methods which have offset. For example photos.get.
```javascript
vk.stream.photos.get({
  owner_id: 1,
  album_id: 136592355
})
.then((photos) => {
  // This will return an array of data
});
```
Loading on the vk server, the example of a picture is loaded into a dialogue.
Other methods you can look in the file vk-io/include/upload.js
```javascript
vk.upload.message({
  file: __dirname+'/test.png'
})
.then((image) => {
  // Returned object photo
});
```
Exception Handling. Captcha.
```javascript
vk.on('captcha',(captcha) => {
  // captcha.src - the way to the CAPTCHA
  // captcha.sid - id CAPTCHA
  // captcha.handler - you need to call a code transmission with CAPTCHA
  // Next an example, it may be different from what you'll use
  // Use modules https://www.npmjs.com/package/ac-io
  ac.url(captcha.src)
  .then((data) => {
  	captcha.handler(data.code);
  });
});
```
Receive module status information
```javascript
var status = vk.status;

// status.errors - number of errors
// status.execute - Number of executed methods vk
// status.outbox - Number of messages send
// status.inbox - the number of received messages
// status.tasks.queue.length - Number of jobs in the queue
```
The remaining errors can catch through .catch () to return promise.
## TODO
* If you have a suggestion please contact me here https://vk.com/id195624402
* And I'm sorry if I made a mistake in the translation of |._. |
