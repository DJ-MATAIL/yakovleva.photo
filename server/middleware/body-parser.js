const bodyParser = require('koa-body')
const config     = require('../config')

module.exports = bodyParser({
    jsonLimit:  config.middleware.bodyParser.jsonLimit,
    multipart:  false,
    urlencoded: false,
    text:       false,
    json:       true,
    jsonStrict: true,
    parsedMethods: [
        'POST',
        'PUT',
        'DELETE'
    ],
    onError(err, ctx) {
        ctx.throw(422)
    }
})
