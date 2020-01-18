const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Image            = require('../../../models/image')
const SectionImage     = require('../../../models/section-image')
const Section          = require('../../../models/section')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
    .object()
    .keys({
        items: Joi.array()
                  .items( validationSchema.imageId )
                  .unique()
                  .min(1)
                  .max(10)
                  .required(),
        section_id: validationSchema.sectionId.required()
    })
    .required()

exports.handler = async ctx => {
    const { body } = ctx.request
    const {
        items,
        section_id: sectionId
    } = body


    // проверить, существует ли раздел
    const sectionExists = Section.exists({ id: sectionId })

    if (!sectionExists) {
        return ctx.throw(404)
    }


    // проверить, существуют ли все изображения
	const itemsExists = await Image.listExists(items)

	if (!itemsExists) {
		return ctx.throw(400)
	}


    // добавить изображения
    const addedImages = await SectionImage.addListBySectionId({ items, sectionId })
    const addedImagesIds = addedImages.map(item => item.id)

    // вернуть все добавленные изображения
    let imagesList = await SectionImage.getListByIds({ items: addedImagesIds })

    imagesList = imagesList.map(item => {
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
		items: imagesList
	})
}
