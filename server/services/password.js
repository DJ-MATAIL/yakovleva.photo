const {
    randomBytes: _randomBytes,
    pbkdf2: _pbkdf2
} = require('crypto')
const config = require('../config')

function randomBytes(len) {
    return new Promise((resolve, reject) => {
        _randomBytes(len, (err, data) => {
            if (err) {
                reject(err)
            }

            resolve(data)
        })
    })
}

function pbkdf2(...args) {
    return new Promise((resolve, reject) => {
        _pbkdf2(...args, (err, derivedKey) => {
            if (err) {
                reject(err)
            }

            resolve(derivedKey)
        })
    })
}

module.exports = class Password {

    static async getSalt() {
        try {
            const saltLength = config.service.password.saltLength / 2
            const bytes = await randomBytes(saltLength)

            return bytes.toString('hex')
        } catch(err) {
            throw err
        }
    }

    // хешировать пароль
    static async hash(password) {
        try {
            const salt = await Password.getSalt()

            const iterationNumber = config.service.password.iterationNumber
            const hashLength      = config.service.password.hashLength / 2
            const algorithm       = config.service.password.algorithm

            let hash = await pbkdf2(password, salt, iterationNumber, hashLength, algorithm)
            hash = hash.toString('hex')

            return { salt, hash }
        } catch(err) {
            throw err
        }
    }

    // Сравнить пароль и хеш
    static async verify(password, hash, salt) {
        try {
            const iterationNumber = config.service.password.iterationNumber
            const hashLength      = config.service.password.hashLength / 2
            const algorithm       = config.service.password.algorithm

            let generatedHash = await pbkdf2(password, salt, iterationNumber, hashLength, algorithm)

            return generatedHash.toString('hex') === hash
        } catch(err) {
            throw err
        }
    }

}
