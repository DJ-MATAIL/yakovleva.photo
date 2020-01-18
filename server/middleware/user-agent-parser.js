const UAParser = require('ua-parser-js')

module.exports = async (ctx, next) => {
    ctx.ua = UAParser(ctx.get('User-Agent'))
    await next()
}
