const { ADMIN_PAGE } = require('../../../common/constants/pages')

exports.meta = async (ctx, next) => {
    ctx.state.meta = {
        title: ADMIN_PAGE
    }

    await next()
}
