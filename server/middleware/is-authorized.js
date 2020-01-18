const Auth = require('../services/auth')

module.exports = async (ctx, next) => {
    const auth = new Auth(ctx)
    const isAuthorized = await auth.isAuthorized()

    if (!isAuthorized) {
        return ctx.throw(403)
    }

    await next()
}
