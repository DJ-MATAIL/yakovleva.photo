const Router = require('koa-router')
const router = new Router()

// routers
const apiRouter    = require('./api')
const clientRouter = require('./client/_index')

router
    .use(apiRouter)
    .use(clientRouter)

module.exports = router.routes()
