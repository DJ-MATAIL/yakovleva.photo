// глобальные переменные
require('./global')


// middleware
const errorsHandler   = require('./middleware/errors-handler')
const bodyParser      = require('./middleware/body-parser')
const userAgentParser = require('./middleware/user-agent-parser')
const viewEngine      = require('./middleware/view-engine')
const session         = require('./middleware/session')


// files
const logger = require('./lib/logger')
const config = require('./config')
const router = require('./router')


// app
const Koa = require('koa')
const app = new Koa

// находится за nginx
app.proxy = true

// обработка ошибок
app.use(errorsHandler)
// парсинг тела запроса
app.use(bodyParser)
// парсинг user-agent
app.use(userAgentParser)
// шаблонизатор
viewEngine(app)
// сессия
app.use(session(app))

// пути
app.use(router)

app.listen(config.port, () => {
    logger.info('🚀 server was started')
    logger.info(`🚀 server port: ${ config.port }`)
})
