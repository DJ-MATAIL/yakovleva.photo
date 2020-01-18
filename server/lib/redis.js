const redis  = require('redis')
const config = require('../config')

const client = redis.createClient(config.lib.redis)

module.exports = class Redis {

    static get(key) {
        return new Promise((resolve, reject) => {
            client.get(key, (err, data) => {
                if (err) {
                    reject(err)
                }

                resolve(data)
            })
        })
    }

    static set(key, value, expires) {
        return new Promise((resolve, reject) => {
            const args = [
                key,
                value
            ]

            if (expires) {
                args.push('PX')
                args.push(expires)
            }

            client.set(...args, err => {
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

    static delete(key) {
        return new Promise((resolve, reject) => {
            client.del(key, err => {
                if (err) {
                    reject(err)
                }

                resolve()
            })
        })
    }

}
