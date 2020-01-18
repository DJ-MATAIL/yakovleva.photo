const Joi              = require('@hapi/joi')
const Section          = require('../../../models/section')
const SectionImage     = require('../../../models/section-image')
const validationSchema = require('../../../../common/utils/validation-schema')
const responseSchema   = require('../../../utils/response-schema')
const config           = require('../../../config')

exports.paramsSchema = Joi
    .object()
    .keys({
        section_id: validationSchema.sectionId
    })
    .required()

exports.bodySchema = Joi
    .object()
    .keys({
        offset: validationSchema.sectionImageOffset
    })
    .required()

exports.handler = async ctx => {
    const { query, params } = ctx
    const { section_id: sectionId } = params
    const { offset = 0 } = query

    let items

    // если был указан раздел
    if (sectionId) {
        // существует ли такой раздел
        const exists = await Section.exists({ id: sectionId })

        if (!exists) {
            return ctx.throw(404)
        }

        items = await SectionImage.getListBySectionId({ sectionId }, offset)
    }

    // если не был указан раздел
    else {
        // получить изображения в обратном порядке
        items = await SectionImage.getList(offset)
    }


    // проверить, есть ли еще изображения
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

    ctx.body = responseSchema.ok({
        items,
        hasMore
    })
}
