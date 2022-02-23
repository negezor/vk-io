# Upload

Базовый модуль [загрузки файлов](https://vk.com/dev/upload_files), позволяет загружать фотографии/видео/документы/аудио.

## Описание типов
[API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/classes/Upload.html)

## Инициализация
[Опции конструктора](https://negezor.github.io/vk-io/references/vk-io/interfaces/IUploadOptions.html)

```ts
import { API, Upload } from 'vk-io';

const api = new API({
	token: process.env.TOKEN
});

const upload = new Upload({
	api
});
```

## Концепт

Класс представляет набор методов для загрузки файлов, они поделены по группам. У каждого метода есть свойство [source](https://negezor.github.io/vk-io/references/vk-io/interfaces/IUploadParams.html#source), которое принимает опции загрузки и значение загрузки или сразу значение загрузки.

Полный набор опций:
```ts
const attachment = await upload.messagePhoto({
	source: {
		// Принимает массив значений (нужно для загрузки в альбом)
		values: [{
			value: <input>,
			// Название файла (нужно в основном для загрузки в документы)
			// filename: 'cat.jpg'
			// Тип загружаемого контента
			// contentType: 'image/jpeg',
			// Размер файла в битах, обязательно при загрузке через ReadableStream или если невозможно получить длину другим способом
			// contentLength: 241000
		}],
		// Время ожидания в миллисекундах
		// timeout: 60_000
		// Сервер загрузки
		// uploadUrl: <server url>
	}
})
```
Обычно достаточно упрощённой загрузки
```ts
const attachment = await upload.messagePhoto({
	source: {
		value: <input>
	}
});
```

Поддерживаемые типы загрузки:
```ts
[
	// URL
	{
		value: 'http://placekitten.com/200/300',
		// Необходимо указать, если сервер в заголовках не указывает Content-Length
		// contentLength: <size>
	},

	// File Path
	{
		value: './path/to/file.jpg'
	},

	// Buffer
	{
		value: fs.readFileSync('./path/to/file.jpg')
	},

	// ReadableStream
	{
		value: fs.createReadStream('./path/to/file.jpg'),
		// Обязательно нужно указать размер файла, иначе загрузка завершится неудачей
		// В примере использован `fs.statSync`, в реальном приложении нужно использовать `fs.stats` так как он не блокирует поток
		contentLength: fs.statSync('./path/to/file.jpg').size
	}
]
```
В основном методы загрузки возвращают инстанции `Attachment`, что позволяет удобно с ними взаимодействовать, например:
```ts
// PhotoAttachment
const attachment = await upload.messagePhoto({
	source: {
		value: <input>
	}
});

await api.messages.send({
	peer_id: <peer id>,
	// В итоге здесь будет photo1234_1234 (приведение через toString)
	attachment 
});
```

::: warning Внимание
Если у вас медленное интернет соединение, большой размер загрузки, сервера ВКонтакте медленно обрабатывают ваш запрос или вовсе произошла ошибка на стороне ВКонтакте, вы можете увидеть сообщение об ошибке `The user aborted a request`. Это значит запрос отклонился по истечению срока ожидания, увеличить можно через установка опции конструктора [uploadTimeout](https://negezor.github.io/vk-io/references/vk-io/interfaces/IUploadOptions.html#uploadTimeout) для всех или [внутри опций загрузки](https://negezor.github.io/vk-io/references/vk-io/interfaces/IUploadSourceOptions.html#timeout) для конкретного запроса. Но не стоит указывать его слишком большим, так как это приведёт к снижении производительности.
:::
