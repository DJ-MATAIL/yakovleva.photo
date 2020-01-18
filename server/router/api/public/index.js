const Router = require('koa-router')
const router = new Router({
    prefix: '/public'
})

const paramsValidation = require('../../../middleware/params-validation')
const bodyValidation   = require('../../../middleware/body-validation')

const slidesList        = require('./slides-list')
const sectionImagesList = require('./section-images-list')

router
    .get('/slides/', slidesList)
    .get(
        [
            '/section-images/',
            '/section-images/:section_id'
        ],
        paramsValidation(sectionImagesList.paramsSchema),
        bodyValidation(sectionImagesList.bodySchema),
        sectionImagesList.handler
    )

module.exports = router.routes()
