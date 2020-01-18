const { Query } = require('../lib/db')

module.exports = class Section {

    static async getList() {
        const sql = `
            SELECT
                id,
                name
            FROM
                sections
            ORDER BY id DESC
        `

        return await Query(sql)
    }

    static async getById({ id }) {
        const sql = `
            SELECT
                *
            FROM
                sections
            WHERE
                id = $1
            LIMIT 1
        `
        const data = [
            id
        ]
        const rows = await Query(sql, data)

        return rows[0]
    }

    static async getByName({ name }) {
        const sql = `
            SELECT
                *
            FROM
                sections
            WHERE
                name = $1
            LIMIT 1
        `
        const data = [
            name
        ]

        const rows = await Query(sql, data)

        return rows[0]
    }

    static async exists({ id }) {
        const row = await Section.getById({ id })

        return row ? true : false
    }

    static async nameExists({ name }) {
        const row = await Section.getByName({ name })

        return row ? true : false
    }

    static async remove({ id }) {
        const sql = `
            DELETE FROM sections
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

    static async add({ name }) {
        const sql = `
            INSERT INTO sections
            ( name )
            VALUES
            ( $1 )
            RETURNING *
        `
        const data = [
            name
        ]
        const rows = await Query(sql, data)

        return rows[0]
    }

    static async edit({ id, name }) {
        const sql = `
            UPDATE sections
            SET
                name = $1
            WHERE
                id = $2
            RETURNING *
        `
        const data = [
            name,
            id
        ]
        const rows = await Query(sql, data)

        return rows[0]
    }

}
