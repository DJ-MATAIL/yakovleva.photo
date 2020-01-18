const Joi = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Image = require('../../../models/image')
const Slide = require('../../../models/slide')
const responseSchema = require('../../../utils/response-schema')

exports.schema = Joi
	.object()
	.keys({
		items: Joi.array()
		          .items( validationSchema.imageId )
		          .unique()
		          .min(1)
		          .max(10)
		          .required()
	})
	.required()

exports.handler = async ctx => {
	const { body }  = ctx.request
	const { items } = body

	// проверить, существуют ли все изображения
	const itemsExists = await Image.listExists(items)

	if (!itemsExists) {
		return ctx.throw(400)
	}


	// проверить, не были ли уже добавлены эти
	// изображения в качестве слайдов
	// const slidesExists = await Slide.listExists(items)


	// добавить слайды
	let addedSlides = await Slide.addList(items)
	let addedSlidesIds = addedSlides.map(item => item.id)

	// вернуть все добавленные слайды с изображениями
	let slidesList = await Slide.getListByIds(addedSlidesIds)

	slidesList = slidesList.map(item => {
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
		items: slidesList
	})
}