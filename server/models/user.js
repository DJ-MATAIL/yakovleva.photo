const { Query } = require('../lib/db')

module.exports = class User {

    static async getByLogin({ login }) {
        const sql = `
            SELECT
                *
            FROM
                users
            WHERE
                login = $1
            LIMIT 1
        `
        const data = [
            login
        ]

        const rows = await Query(sql, data)
        return rows[0]
    }

}
