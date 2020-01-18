const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const SectionImage     = require('../../../models/section-image')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
    .object()
    .keys({
        imageId: validationSchema.sectionImageId.required()
    })
    .required()

exports.handler = async ctx => {
    const { params } = ctx
    const { imageId } = params


    // проверить существует ли изображение
    const imageExists = await SectionImage.exists({ id: imageId })

    if (!imageExists) {
        return ctx.throw(400)
    }

    // удалить изображение
    const removedImage = await SectionImage.remove({ id: imageId })

    ctx.body = responseSchema.ok({
        id: removedImage.id
    })
}
