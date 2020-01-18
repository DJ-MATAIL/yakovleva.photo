const Joi               = require('@hapi/joi')
const validationSchema  = require('../../../../common/utils/validation-schema')
const SectionModel      = require('../../../models/section')
const SectionImageModel = require('../../../models/section-image')
const config            = require('../../../config')
const responseSchema    = require('../../../utils/response-schema')

exports.paramsSchema = Joi
    .object()
    .keys({
        id: validationSchema.sectionId.required()
    })
    .required()

exports.handler = async ctx => {
    const { params } = ctx
    const { id } = params

    // проверить существование раздела
    const sectionExists = await SectionModel.exists({ id })

    if (!sectionExists) {
        return ctx.throw(404)
    }


    let items = await SectionImageModel.getListBySectionId({ sectionId: id })

    const limit = config.model.sectionImage.listLimit
    const hasMore = items.length > limit

    items = items.slice(0, limit)
    items = items.map(item => {
        item.mini = {
            src:    item.mini_name,
            width:  item.mini_width,
            height: item.mini_height
        }
        item.full = {
            src:    item.full_name,
            width:  item.full_width,
            height: item.full_height
        }

        delete item.mini_name
        delete item.mini_width
        delete item.mini_height

        delete item.full_name
        delete item.full_width
        delete item.full_height
    })

    ctx.body = responseSchema.ok({
        items,
        hasMore
    })
}
