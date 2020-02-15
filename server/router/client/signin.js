const { SIGNIN_PAGE } = require('../../../common/constants/pages')
const config          = require('../../config')

exports.meta = async (ctx, next) => {
    ctx.state.meta = {
        title: SIGNIN_PAGE,
        url: `https://${ config.domain }/signin`
    }

    await next()
}
