const Router = require('koa-router')
const router = new Router({
    prefix: '/images'
})

const paramsValidation = require('../../../middleware/params-validation')
const bodyValidation   = require('../../../middleware/body-validation')

const list          = require('./list')
const remove        = require('./remove')
const listBySection = require('./list-by-section')
const listBySlides  = require('./list-by-slides')

router
    .get(
        '/',
        bodyValidation(list.schema),
        list.handler
    )
    .delete(
        '/:id',
        paramsValidation(remove.schema),
        remove.handler
    )
    .get(
        '/by_section/',
        bodyValidation(listBySection.schema),
        listBySection.handler
    )
    .get(
        '/by_slides/',
        bodyValidation(listBySlides.schema),
        listBySlides.handler
    )

module.exports = router.routes()
