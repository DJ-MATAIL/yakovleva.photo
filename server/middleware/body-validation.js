module.exports = function bodyValidation(schema) {
    return async (ctx, next) => {
        const { method, request } = ctx
        const { body, query } = request

        let data

        switch(method.toUpperCase()) {
            case 'POST':
            case 'DELETE':
            case 'PUT':
                data = body
                break
            case 'GET':
                data = query
                break
            default:
                return ctx.throw(405)
        }

        try {
            await schema.validateAsync(data)
        } catch(err) {
            return ctx.throw(400)
        }

        await next()
    }
}
