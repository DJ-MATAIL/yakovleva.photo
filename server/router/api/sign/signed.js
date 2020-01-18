const Auth           = require('../../../services/auth')
const responseSchema = require('../../../utils/response-schema')
const errors         = require('../../../errors')

module.exports = async ctx => {
    const auth   = new Auth(ctx)
    const signed = await auth.signIn()

    if (!signed) {
        return ctx.body = responseSchema.error(errors.NOT_SIGNED)
    }


    ctx.body = responseSchema.ok()
}
