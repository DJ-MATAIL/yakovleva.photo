const Router = require('koa-router')
const router = new Router({
	prefix: '/sections'
})

const paramsValidation = require('../../../middleware/params-validation')
const bodyValidation   = require('../../../middleware/body-validation')

const list   = require('./list')
const get    = require('./get')
const remove = require('./remove')
const add    = require('./add')
const update = require('./update')

router
    .get('/', list)
    .get(
        '/:id',
        paramsValidation(get.paramsSchema),
        bodyValidation(get.bodySchema),
        get.handler
    )
    .delete(
    	'/:id',
    	paramsValidation(remove.schema),
    	remove.handler
    )
    .post(
        '/',
        bodyValidation(add.schema),
        add.handler
    )
    .put(
        '/:id',
        paramsValidation(update.paramsSchema),
        bodyValidation(update.bodySchema),
        update.handler
    )

module.exports = router.routes()
