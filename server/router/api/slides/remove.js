const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Slide            = require('../../../models/slide')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
    .object()
    .keys({
        id: validationSchema.slideId.required()
    })
    .required()

exports.handler = async ctx => {
    const { params } = ctx
    const { id } = params

    
    // проверить, есть ли такой слайд
    const slideExists = await Slide.exists({ id })

    if (!slideExists) {
        return ctx.throw(404)
    }


    // удалить
    const removedSlide = await Slide.remove({ id })

    ctx.body = responseSchema.ok({
        id: removedSlide.id
    })
}
