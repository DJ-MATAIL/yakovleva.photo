const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Section          = require('../../../models/section')
const responseSchema   = require('../../../utils/response-schema')

exports.paramsSchema = Joi
	.object()
	.keys({
		id: validationSchema.sectionId.required()
	})
	.required()

exports.bodySchema = Joi
	.object()
	.keys({
		name: validationSchema.sectionName.required()
	})
	.required()

exports.handler = async ctx => {
	const { params } = ctx
	const { body } = ctx.request
	const { id } = params
	const { name } = body


	// проверить, существует ли раздел с таким id
	const sectionExists = await Section.exists({ id })

	if (!sectionExists) {
		return ctx.throw(404)
	}


	// проверить, есть ли такое имя
	const sectionNameExists = await Section.nameExists({ name })

	if (sectionNameExists) {
		return ctx.throw(400)
	}


	// изменить раздел
	const editedSection = await Section.edit({ id, name })


	ctx.body = responseSchema.ok({
		id:   editedSection.id,
		name: editedSection.name
	})
}