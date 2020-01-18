const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Section          = require('../../../models/section')
const SectionImage     = require('../../../models/section-image')
const ResponseSchema   = require('../../../utils/response-schema')
const config           = require('../../../config')

exports.schema = Joi
    .object()
    .keys({
        offset:     validationSchema.sectionImageOffset,
        section_id: validationSchema.sectionId.required()
    })
    .required()

exports.handler = async ctx => {
    const { query } = ctx
    const {
        offset = 0,
        section_id: sectionId
    } = query


    // проверить, существует ли раздел
    const sectionExists = await Section.exists({ id: sectionId })

    if (!sectionExists) {
        return ctx.throw(404)
    }


    // получить список фотографий
    let items = await SectionImage.getListBySectionId({ sectionId }, offset)

    //
    const limit   = config.model.sectionImage.listLimit
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

    ctx.body = ResponseSchema.ok({
        hasMore,
        items
    })
}
