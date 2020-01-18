const Router = require('koa-router')
const router = new Router()

// routers
const apiRouter    = require('./api')
const clientRouter = require('./client/_index')

router
    .use(apiRouter)
    .use(clientRouter)
    // .get('*', async (ctx, next) => {
    //     const title       = ''
    //     const description = ''
    //     const keywords    = [].join(',')
    //     const ldJson      = []
    //
    //     const html = await ctx.render('default', {
    //         title,
    //         description,
    //         keywords,
    //         ldJson
    //     })
    //
    //     ctx.type = 'html'
    //     ctx.body = html
    // })

module.exports = router.routes()
