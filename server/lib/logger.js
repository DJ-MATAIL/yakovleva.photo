const {
    createLogger,
    format,
    transports
} = require('winston')
const {
    Console: ConsoleTransport,
    File:    FileTransport
} = transports
const {
    combine,
    timestamp,
    printf,
    colorize
} = format
const config = require('../config')

module.exports = createLogger({
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        printf(({ message, timestamp, level }) => {
            return `${ timestamp } [${ level.toUpperCase() }]: ${ message }`
        }),
        colorize()
    ),
    transports: [
        new ConsoleTransport(),
        new FileTransport({
            filename: config.lib.logger.file,
            level:    'error'
        })
    ],
    // выходить если ошибка
    exitOnError: false,
    // не логировать
    silent: false
})
