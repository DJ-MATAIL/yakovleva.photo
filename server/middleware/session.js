const session      = require('koa-session')
const config       = require('../config')
const SessionStore = require('../services/session-store')

module.exports = app => {
    return session({
        // ключ
    	key: 'sid',
    	// будет удалена, когда браузер будет закрыт
    	maxAge: 'session',
    	// автоматически подставлять заголовок set-cookie
    	autoCommit: true,
    	// может ли быть переписана
    	overwrite: true,
    	// http only cookie
    	httpOnly: true,
    	// same-site атрибут
    	sameSite: 'strict',
        // https?
    	secure: config.isHttps,
    	// domain
    	domain: config.domain,
    	// path
    	path: '/',
    	// signed cookie
    	signed: false,
    	// [ передается в бд, не используется ]
    	rolling: false,
    	// продлять сессию, когда она истекает
    	renew: true,
        // хранилище
        store: new SessionStore
    }, app)
}
