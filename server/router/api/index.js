const Router = require('koa-router')
const router = new Router({
    prefix: '/api'
})


// middleware
const imageUploader = require('../../middleware/image-uploader')
const isAuthorized  = require('../../middleware/is-authorized')

// routers
const publicRouter        = require('./public')
const signRouter          = require('./sign')
const imagesRouter        = require('./images')
const sectionsRouter      = require('./sections')
const sectionImagesRouter = require('./section-images')
const slidesRouter        = require('./slides')

// routes
const upload = require('./upload')


router
    .use(publicRouter)

    .use(signRouter)
    .use(isAuthorized)
    .post('/upload', imageUploader, upload)
    .use(imagesRouter)
    .use(sectionsRouter)
    .use(sectionImagesRouter)
    .use(slidesRouter)


module.exports = router.routes()
