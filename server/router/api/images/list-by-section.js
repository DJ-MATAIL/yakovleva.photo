const Joi               = require('@hapi/joi')
const validationSchema  = require('../../../../common/utils/validation-schema')
const Image             = require('../../../models/image')
const responseSchema    = require('../../../utils/response-schema')
const { imagesPerPage } = require('../../../../common/constants/limits')

exports.schema = Joi
    .object()
    .keys({
        offset:     validationSchema.imageOffset,
        section_id: validationSchema.sectionId.required()
    })
    .required()

exports.handler = async ctx => {
    const { query } = ctx
    const {
        offset = 0,
        section_id: sectionId
    } = query

    let items     = await Image.getListWithoutSectionId({ sectionId }, offset)
    const hasMore = imagesPerPage < items.length

    items = items
        .slice(0, imagesPerPage)
        .map(item => {
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

             delete item.section_id
             delete item.section_image_id

             return item
         })

    ctx.body = responseSchema.ok({
        items,
        hasMore
    })
}
