const { SIGNIN_PAGE } = require('../../../common/constants/pages')

exports.meta = async (ctx, next) => {
    ctx.state.meta = {
        title: SIGNIN_PAGE
    }

    await next()
}
