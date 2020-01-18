const { Query } = require('../lib/db')
const Time      = require('../lib/time')
const config    = require('../config')

module.exports = class Session {

    static async getByHash({ hash }) {
        const sql = `
            SELECT
                *
            FROM
                sessions
            WHERE
                hash = $1
            LIMIT 1
        `
        const data = [
            hash
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

    static async getByHashAndUserIdAndIp({ hash, userId, ip }) {
        const currentDateTime = Time.getCurrentDateTime()
        const period = config.model.session.period
        const sql = `
            SELECT
                *
            FROM
                sessions
            WHERE
                hash = $1
                AND
                user_id = $2
                AND
                ip = $3
                AND
                date + $4 * interval '1 second' > $5
            LIMIT 1
        `
        const data = [
            hash,
            userId,
            ip,
            period,
            currentDateTime
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

    static async close({ id }) {
        const sql = `
            DELETE FROM sessions
            WHERE
                id = $1
            RETURNING *
        `
        const data = [
            id
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

    static async add({ hash, userId, ip, browser, os }) {
        const currentDateTime = Time.getCurrentDateTime()
        const sql = `
            INSERT INTO sessions
                ( hash, date, user_id, ip, browser, os )
            VALUES
                ( $1, $2, $3, $4, $5, $6 )
            RETURNING *
        `
        const data = [
            hash,
            currentDateTime,
            userId,
            ip,
            browser,
            os
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

    static async update({ id, ip, browser, os }) {
        const currentDateTime = Time.getCurrentDateTime()
        const sql = `
            UPDATE sessions
            SET
                ip = $1,
                date = $2,
                browser = $3,
                os = $4
            WHERE
                id = $5
            RETURNING *
        `
        const data = [
            ip,
            currentDateTime,
            browser,
            os,
            id
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

}
