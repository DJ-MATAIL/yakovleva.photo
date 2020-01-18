const path = require('path')

const basicKeys      = require( path.join(global.keysDir, 'basic') )
const redisKeys      = require( path.join(global.keysDir, 'redis') )
const postgresqlKeys = require( path.join(global.keysDir, 'postgresql') )

const config = {}


config.domain  = basicKeys.domain
config.port    = basicKeys.port
config.isHttps = false


/*
    middleware
*/
config.middleware = {

    bodyParser: {
        jsonLimit: '100kb'
    },

    imageUploader: {
        allowedMimeTypes: [
            'image/jpeg',
            'image/png'
        ],
        allowedExtensions: [
            '.jpeg',
            '.jpg',
            '.png'
        ],
        maxFileSize: 1024 * 1024 * 20, // 20mb
        directory: path.join(global.uploadsDir, 'temp')
    }

}


/*
    lib
*/
config.lib = {

    logger: {
        file: path.join( global.logsDir, 'error.log' )
    },

    time: {
        defaultTimezone: 'Asia/Irkutsk'
    },

    db: postgresqlKeys,
    redis: redisKeys,

    sessionStore: {
        expires: 60 * 60 * 24 * 1000 // день
    }

}


/*
    service
*/
config.service = {

    password: {
        saltLength:      64,
        hashLength:      128,
        iterationNumber: 10000,
        algorithm:       'sha512'
    },

    auth: {
        hashPeriod: 60 * 60 * 24 * 30 * 1000, // 30 дней (мсек),
        hashLength: 36
    },

    image: {
        directory: global.uploadsDir,
        full: {
            height: 1440
        },
        mini: {
            width: 500
        }
    }

}


/*
    models
*/
config.model = {

    sectionImage: {
        listLimit: 16
    },

    image: {
        listLimit: 16
    },

    signinAttempt: {
        limit: 3,
        period: 15 * 60 * 1000 // 15 минут
    },

    session: {
        period: 60 * 60 * 24 * 30 // 30 дней в секундах
    }

}


module.exports = config
