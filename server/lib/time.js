const luxon  = require('luxon')
const config = require('../config')

// временная зона по-умолчанию
luxon.Settings.defaultZoneName = config.lib.time.defaultTimezone
const datetime = luxon.DateTime

module.exports = class Time {

    constructor(initialTime) {
        if (initialTime) {
            return this.date = datetime.fromSQL(initialTime)
        }

        this.date = datetime.local()
    }

    toDateTime() {
        return this.date.toFormat('yyyy-MM-dd HH:mm:ss')
    }

    toDate() {
        return this.date.toFormat('yyyy-MM-dd')
    }

    toTime() {
        return this.date.toFormat('HH:mm:ss')
    }

    toSeconds() {
        return this.date.toFormat('X')
    }

    toMilliseconds() {
        return this.date.toFormat('x')
    }

    plus(obj) {
        this.date.plus(obj)
    }

    minus(obj) {
        this.date.minus(obj)
    }

    static getCurrentDateTime() {
        return datetime.local().toFormat('yyyy-MM-dd HH:mm:ss')
    }

    static getCurrentDate() {
        return datetime.local().toFormat('yyyy-MM-dd')
    }

    static getCurrentTime() {
        return datetime.local().toFormat('HH:mm:ss')
    }

    static getCurrentSeconds() {
        return datetime.local().toFormat('X')
    }

    static getCurrentMilliseconds() {
        return datetime.local().toFormat('x')
    }

}
