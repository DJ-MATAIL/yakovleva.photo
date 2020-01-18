const Slide          = require('../../../models/slide')
const responseSchema = require('../../../utils/response-schema')

module.exports = async ctx => {
    let items = await Slide.getFullList()
    items = items.map(item => {
        return {
            id:  item.id,
            src: '/uploads/' + item.full_name
        }
    })

    ctx.body = responseSchema.ok({ items })
}
