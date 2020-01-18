const Joi              = require('@hapi/joi')
const fs               = require('fs').promises
const path             = require('path')
const validationSchema = require('../../../../common/utils/validation-schema')
const Image            = require('../../../models/image')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
    .object()
    .keys({
        id: validationSchema.imageId.required()
    })
    .required()

exports.handler = async ctx => {
    const { params } = ctx
    const { id } = params

    // TODO:
    // удалить изображение со всех разделов (section_images)
    // со всех слайдов (slides)

    // удаляем изображение из бд
    const removedImage = await Image.remove({ id })

    // удаляем файлы
    await fs.unlink(path.join(global.uploadsDir, removedImage.mini_name))
    await fs.unlink(path.join(global.uploadsDir, removedImage.full_name))

    ctx.body = responseSchema.ok({
        id: removedImage.id
    })
}
