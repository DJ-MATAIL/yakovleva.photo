const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Image            = require('../../../models/image')
const config           = require('../../../config')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
    .object()
    .keys({
        offset: validationSchema.imageOffset
    })
    .required()

exports.handler = async ctx => {
    const { query } = ctx
    const { offset = 0 } = query
    const limit = config.model.image.listLimit

    let items = await Image.getList(offset)
    const hasMore = items.length > limit

    items = items.slice(0, limit)
    items = items.map(item => {
        item.mini = {
            src:    '/uploads/' + item.mini_name,
            width:  item.mini_width,
            height: item.mini_height
        }
        item.full = {
            src:    '/uploads/' + item.full_name,
            width:  item.full_width,
            height: item.full_height
        }

        delete item.mini_name
        delete item.mini_width
        delete item.mini_height

        delete item.full_name
        delete item.full_width
        delete item.full_height

        return item
    })

    ctx.body = responseSchema.ok({
        items,
        hasMore
    })
}
