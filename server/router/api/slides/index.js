const Router = require('koa-router')
const router = new Router({
	prefix: '/slides'
})

const bodyValidation   = require('../../../middleware/body-validation')
const paramsValidation = require('../../../middleware/params-validation')

const list   = require('./list')
const add    = require('./add')
const remove = require('./remove')

router
	.get(
		'/',
		bodyValidation(list.schema),
		list.handler
	)
	.post(
		'/',
		bodyValidation(add.schema),
		add.handler
	)
	.delete(
		'/:id',
		paramsValidation(remove.schema),
		remove.handler
	)

module.exports = router.routes()
