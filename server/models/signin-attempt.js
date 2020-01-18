const Redis  = require('../lib/redis')
const config = require('../config')

module.exports = class SigninAttempt {

    static async getByIp({ ip }) {
        const json = await Redis.get(ip)

        if (json === null) {
            return []
        }

        return JSON.parse(json)
    }

    static async hasLimit({ ip }) {
        const rows = await SigninAttempt.getByIp({ ip })

        return rows.length >= config.model.signinAttempt.limit
    }

    static async add({ ip }) {
        const data = await SigninAttempt.getByIp({ ip })
        data.push(ip)

        await Redis.set(ip, JSON.stringify(data), config.model.signinAttempt.period)
    }

}
