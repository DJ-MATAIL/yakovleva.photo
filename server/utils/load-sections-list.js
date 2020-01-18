const Section = require('../models/section')

module.exports = async function loadSectionsList(ctx, next) {
    const sectionsList = await Section.getList()

    if (!ctx.state.data) {
        ctx.state.data = {}
    }

    ctx.state.data = {
        ...ctx.state.data,
        sectionsList
    }

    await next()
}
