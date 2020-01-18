module.exports = async function renderAdminClient(ctx) {
    const { meta } = ctx.state
    const { title } = meta

    const html = await ctx.render('admin', {
        title
    })

    ctx.type = 'html'
    ctx.body = html
}
