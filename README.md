### Структура проекта
* `assets` - оригиналы медиа-файлов
* `client` - код клиента
* `common` - общие файлы между клиентом и сервером
* `dist` - файлы клиента после сборки
* `keys` - конфиги
* `logs` - логи
* `public` - публичная директория
* `server` - код сервера
* `sql` - sql-команды
* `uploads` - загружаемые через админку изображения

### Команды
* `build_client` - development-сборка клиента
* `watch_client` - автоматическая пересборка клиента при изменениях
* `build_production_client` - production-сборка клиента
* `remove_webpack_odd_files` - удаление лишних файлов. При точке входа, отличной от .js, создается лишний js-файл. Их и удаляем
* `start_server` - запуск development-сервера
* `start_production_server` - запуск production-сервера
* `build` - алиас к `build_production_client`
* `start` - алиас к `start_production_server`

### Равертывание
1. Установка nodejs, npm, imagemagick, postgresql, redis, nginx
2. `npm i` - установка пакетов
3. `npm run build` - сборка клиента
4. создание всех необходимых баз и таблиц из `sql/create.sql`
5. создание файлов `keys/basic.js`, `keys/postgresql.js`, `keys/redis.js` и их заполнение. Структура файлов находится ниже
6. добавление пользователя для админки. Смотри таблицу `users` и файл `server/services/password.js`, чтобы понять, как создать хеш и соль пароля
7. `npm run start` - запуск сервера

### Проблемы
* При установке imagemagick должен быть доступен через команду magick
* пример конфига для nginx можно найти в issues

### Структура файлов

###### keys/basic.js
```js
module.exports = {
	domain: 'yakovleva.photo',
	port:   3333,
}
```

###### keys/postgresql.js
```js
module.exports = {
	host:     'localhost',
	port:     5432,
	user:     '',
	password: '',
	database: 'yakovleva_photo'
}
```

###### keys/redis.js
```js
module.exports = {
	host:     'localhost',
	port:     6379,
	password: '',
	database: ''
}
```