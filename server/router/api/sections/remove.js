const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Section          = require('../../../models/section')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
	.object()
	.keys({
		id: validationSchema.sectionId.required()
	})
	.required()

exports.handler = async ctx => {
	const { params } = ctx
	const { id } = params

	// проверить, существует ли раздел
	const sectionExists = await Section.exists({ id })

	if (!sectionExists) {
		return ctx.throw(404)
	}


	// удалить раздел
	const removedSection = await Section.remove({ id })


	ctx.body = responseSchema.ok({
		id: removedSection.id
	})
}