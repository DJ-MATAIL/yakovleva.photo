const Router = require('koa-router')
const router = new Router()

// middleware
const bodyValidation = require('../../../middleware/body-validation')
const isAuthorized   = require('../../../middleware/is-authorized')

const signIn  = require('./signin')
const signOut = require('./signout')
const signed  = require('./signed')


router
    .post('/signin', bodyValidation(signIn.schema), signIn.handler)
    .post('/signed', signed)
    .post('/signout', isAuthorized, signOut)


module.exports = router.routes()
