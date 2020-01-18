const Auth           = require('../../../services/auth')
const responseSchema = require('../../../utils/response-schema')

module.exports = async ctx => {
    const auth = new Auth(ctx)
    await auth.signOut()

    ctx.body = responseSchema.ok()
}
