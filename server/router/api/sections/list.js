const SectionModel   = require('../../../models/section')
const responseSchema = require('../../../utils/response-schema')

module.exports = async ctx => {
    const items = await SectionModel.getList()

    ctx.body = responseSchema.ok(items)
}
