const Router = require('koa-router')
const router = new Router()

const loadSectionsList  = require('../../utils/load-sections-list')
const renderClient      = require('../../utils/render-client')
const renderAdminClient = require('../../utils/render-admin-client')
const isAuthorized      = require('../../middleware/is-authorized')

const index     = require('./index')
const portfolio = require('./portfolio')
const about     = require('./about')
const price     = require('./price')

// private
const signIn = require('./signin')
const admin  = require('./admin')

router
    .get(
        '/',
        index.data,
        loadSectionsList,
        index.meta,
        index.redux,
        renderClient
    )
    .get(
        [
            '/portfolio',
            '/portfolio/:sectionId'
        ],
        portfolio.validation,
        portfolio.data,
        loadSectionsList,
        portfolio.meta,
        portfolio.redux,
        renderClient
    )
    .get(
        '/about',
        loadSectionsList,
        about.meta,
        about.redux,
        renderClient
    )
    .get(
        '/price',
        loadSectionsList,
        price.meta,
        price.redux,
        renderClient
    )
    .get(
        '/signin',
        signIn.meta,
        renderAdminClient
    )
    .get(
        [
            '/admin',
            '/admin/images',
            '/admin/slides',
            '/admin/sections'
        ],
        isAuthorized,
        admin.meta,
        renderAdminClient
    )

module.exports = router.routes()
