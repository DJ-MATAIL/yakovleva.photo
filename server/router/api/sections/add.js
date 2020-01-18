const Joi              = require('@hapi/joi')
const validationSchema = require('../../../../common/utils/validation-schema')
const Section          = require('../../../models/section')
const responseSchema   = require('../../../utils/response-schema')

exports.schema = Joi
	.object()
	.keys({
		name: validationSchema.sectionName.required()
	})
	.required()

exports.handler = async ctx => {
	const { body } = ctx.request
	const { name } = body


	// проверить, есть ли раздел с таким же именем
	const sectionNameExists = await Section.nameExists({ name })

	if (sectionNameExists) {
		return ctx.throw(400)
	}


	// добавить раздел
	const addedSection = await Section.add({ name })


	ctx.body = responseSchema.ok({
		id:   addedSection.id,
		name: addedSection.name
	})
}