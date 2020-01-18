const config = require('../config')
const Session = require('../models/session')

module.exports = class Auth {

    constructor(ctx) {
        this.ctx = ctx
    }

    setCookie({ hash }) {
        this.ctx.cookies.set('hash', hash, {
            maxAge:    config.service.auth.hashPeriod,
            signed:    false,
            path:      '/',
            domain:    config.domain,
            secure:    config.isHttps,
            httpOnly:  true,
            overwrite: true,
            sameSite:  'strict'
        })
    }

    removeCookie() {
        this.ctx.cookies.set('hash', '', {
            domain:    config.domain,
            secure:    config.isHttps,
            httpOnly:  true
        })
    }

    getCookie() {
        return this.ctx.cookies.get('hash')
    }

    isValidCookie(name) {
        const hash = this.getCookie()

        if (
            typeof hash != 'string' ||
            hash.length != config.service.auth.hashLength
        ) {
            return false
        }

        return true
    }

    setSession({ userId, hash, ip }) {
        const { session } = this.ctx

        session.user_id = userId
        session.hash    = hash
        session.ip      = ip
    }

    removeSession() {
        this.ctx.session = null
    }

    isSessionFieldsExist() {
        const { session } = this.ctx

        return (session.user_id && session.hash && session.ip)
            ? true
            : false
    }

    isSessionIpMatch() {
        const { session, ip } = this.ctx

        return ip === session.ip
    }

    async isAuthorized() {
        const { session } = this.ctx

        if (!this.isSessionFieldsExist()) {
            return false
        }

        if (!this.isSessionIpMatch()) {
            return false
        }


        const hash = await Session.getByHashAndUserIdAndIp({
            hash:   session.hash,
            userId: session.user_id,
            ip:     session.ip
        })

        if (!hash) {
            return false
        }


        return true
    }

    async signIn() {
        const isAuthorized = await this.isAuthorized()

        // если не авторизован, попробовать выполнить автовход
        if (!isAuthorized) {
            const isAutoAuth = await this.autoSignIn()

            if (!isAutoAuth) {
                return false
            }
        }

        return true
    }

    async autoSignIn() {
        const { cookies, ip, ua } = this.ctx
        const cookieHash = this.getCookie()

        if (!cookieHash) {
            return false
        }

        if (!this.isValidCookie()) {
            this.removeCookie()
            return false
        }


        const hash = await Session.getByHash({ hash: cookieHash })

        if (!hash) {
            this.removeCookie()
            return false
        }


        // продливаем хеш
        const browser = `${ ua.browser.name } ${ ua.browser.version }`
        const os      = `${ ua.os.name } ${ ua.os.version }`

        const updatedHash = await Session.update({
            id: hash.id,
            ip,
            browser,
            os
        })


        //
        this.setSession({
            userId: hash.user_id,
            hash:   hash.hash,
            ip
        })
        this.setCookie({ hash: hash.hash })


        return true
    }

    async signOut() {
        // авторизован ли
        const { session } = this.ctx

        if (!this.isSessionFieldsExist()) {
            return false
        }

        if (!this.isSessionIpMatch()) {
            return false
        }


        const hash = await Session.getByHashAndUserIdAndIp({
            hash:   session.hash,
            userId: session.user_id,
            ip:     session.ip
        })

        if (!hash) {
            return false
        }


        // закрыть сессию
        const closedHashId = await Session.close({ id: hash.id })


        // удалить сессионные куки
        // удалить куки для авто-входа
        this.removeSession()
        this.removeCookie()


        return true
    }

}
