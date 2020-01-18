const logger = require('../lib/logger')

module.exports = async function errorsHandler(ctx, next) {
    try {
        // время начала запроса
        ctx.state.requestStartTime = Date.now()

        await next()

        // время окончания запроса
        ctx.state.requestEndTime = Date.now()
    } catch(err) {
        if (global.env == 'development') {
            console.error(err)
        }

        ctx.status = err.statusCode || err.status || 500
        ctx.type   = 'html'

        if (ctx.status >= 500) {
            logger.error(`${ ctx.status } ${ err.message }:\n${ err.stack }`)
        }
    }
}
