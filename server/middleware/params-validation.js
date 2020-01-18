module.exports = function paramsValidation(schema) {
    return async (ctx, next) => {
        const { params } = ctx

        try {
            await schema.validateAsync(params)
        } catch(err) {
            return ctx.throw(400)
        }

        await next()
    }
}
