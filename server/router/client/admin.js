const { ADMIN_PAGE } = require('../../../common/constants/pages')
const config          = require('../../config')

exports.meta = async (ctx, next) => {
    ctx.state.meta = {
        title: ADMIN_PAGE,
        url: `https://${ config.domain }/admin`
    }

    await next()
}
