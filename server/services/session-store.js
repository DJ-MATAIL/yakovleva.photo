const redis  = require('../lib/redis')
const config = require('../config')

module.exports = class SessionStore {

    async get(key) {
        const json = await redis.get(key)

        return JSON.parse(json)
    }

    async set(key, data) {
        const json = JSON.stringify(data)

        await redis.set(key, json, config.lib.sessionStore.expires)
    }

    async destroy(key) {
        await redis.delete(key)
    }

}
