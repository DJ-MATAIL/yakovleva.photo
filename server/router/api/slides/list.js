const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const limits           = require('../../../../common/constants/limits')
const responseSchema   = require('../../../utils/response-schema')
const Slide            = require('../../../models/slide')

exports.schema = Joi
	.object()
	.keys({
		offset: validationSchema.slideOffset
	})
	.required()

exports.handler = async ctx => {
	const { query } = ctx
	const { offset = 0 } = query

	let items = await Slide.getList(offset)
	const hasMore = items.length > limits.slidesPerPage

	items = items.slice(0, limits.slidesPerPage)
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