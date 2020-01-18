const Joi              = require('@hapi/joi')
const uuid             = require('uuid/v1')
const validationSchema = require('../../../../common/utils/validation-schema')
const Auth             = require('../../../services/auth')
const SigninAttempt    = require('../../../models/signin-attempt')
const User             = require('../../../models/user')
const Password         = require('../../../services/password')
const Session          = require('../../../models/session')
const responseSchema   = require('../../../utils/response-schema')
const errors           = require('../../../errors')

exports.schema = Joi
    .object()
    .keys({
        login:    validationSchema.login.required(),
        password: validationSchema.password.required()
    })
    .required()

exports.handler = async ctx => {
    const { body } = ctx.request
    const {
        login,
        password
    } = body


    // проверить, авторизован ли пользователь
    const auth = new Auth(ctx)
    const isAuthorized = await auth.isAuthorized()

    if (isAuthorized) {
        return ctx.body = responseSchema.error(errors.SIGNED_ALREADY)
    }


    // проверить есть ли попытки ввода
    const { ip } = ctx

    const hasAttemptLimit = await SigninAttempt.hasLimit({ ip })

    if (hasAttemptLimit) {
        return ctx.body = responseSchema.error(errors.SIGNIN_ATTEMPTS_LIMIT)
    }


    // получить пользователя по логину
    const user = await User.getByLogin({ login })

    if (!user) {
        // добавить неудачную попытку
        await SigninAttempt.add({ ip })

        return ctx.body = responseSchema.error(errors.WRONG_LOGIN_OR_PASSWORD)
    }


    // проверить пароль
    const {
        password_hash: passwordHash,
        password_salt: passwordSalt
    } = user

    const verifiedPassword = await Password.verify(password, passwordHash, passwordSalt)

    if (!verifiedPassword) {
        // добавить неудачную попытку
        await SigninAttempt.add({ ip })

        return ctx.body = responseSchema.error(errors.WRONG_LOGIN_OR_PASSWORD)
    }


    // сгенерировать hash для авторизации
    const { id: userId } = user
    const { ua } = ctx

    let browser = null
    let os      = null

    // браузер
    if (ua.browser.name) {
        browser = ua.browser.name

        if (ua.browser.version) {
            browser += ` ${ ua.browser.version }`
        }
    }

    // ОС
    if (ua.os.name) {
        os = ua.os.name

        if (ua.os.version) {
            os += ` ${ ua.os.version }`
        }
    }


    const addedSession = await Session.add({
        hash: uuid(),
        userId,
        ip,
        browser,
        os
    })


    auth.setSession({
        userId,
        hash:   addedSession.hash,
        ip
    })
    auth.setCookie({ hash: addedSession.hash })


    ctx.body = responseSchema.ok()
}
