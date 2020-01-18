const { Query } = require('../lib/db')
const { slidesPerPage } = require('../../common/constants/limits')

module.exports = class Slide {

    static async getFullList() {
        const sql = `
            SELECT
                s.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height
            FROM
                slides AS s
                    INNER JOIN images AS i
                    ON s.image_id = i.id
            ORDER BY s.id DESC
        `

        return await Query(sql)
    }

    static async getList(offset) {
        const limit = slidesPerPage
        const sql = `
            SELECT
                s.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height
            FROM
                slides AS s
                    INNER JOIN images AS i
                    ON s.image_id = i.id
            ORDER BY s.id DESC
            LIMIT $1
            OFFSET $2
        `
        const data = [
            limit + 1,
            limit * offset
        ]

        return await Query(sql, data)
    }

    static async getListByIds(ids) {
        let sql = `
            SELECT
                s.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height
            FROM
                slides AS s
                    INNER JOIN images AS i
                    ON s.image_id = i.id
            WHERE
                s.id IN (
        `

        ids.forEach((id, index) => {
            if (index != 0) {
                sql += ','
            }

            sql += `$${ index + 1 }`
        })

        sql += `)
            ORDER BY s.id DESC
            LIMIT 100
        `

        return await Query(sql, ids)
    }

    static async getById({ id }) {
        const sql = `
            SELECT
                s.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height
            FROM
                slides AS s
                    INNER JOIN images AS i
                    ON s.image_id = i.id
            WHERE
                s.id = $1
            LIMIT 1
        `
        const data = [
            id
        ]

        const rows = await Query(sql, data)

        return rows[0]
    }

    static async exists({ id }) {
        const row = await Slide.getById({ id })

        return row ? true : false
    }

    static async add({ imageId }) {
        const sql = `
            INSERT INTO slides
            ( image_id )
            VALUES
            ( $1 )
            RETURNING *
        `
        const data = [
            imageId
        ]

        const rows = await Query(sql, data)

        return rows[0]
    }

    static async addList(items) {
        let sql = `
            INSERT INTO slides
            ( image_id )
            VALUES
        `

        items.forEach((item, index) => {
            if (index != 0) {
                sql += ','
            }

            sql += `( $${ index + 1 } )`
        })

        sql += 'RETURNING *'

        let rows = await Query(sql, items)
        rows = rows.reverse()

        return rows
    }

    static async remove({ id }) {
        const sql = `
            DELETE FROM slides
            WHERE id = $1
            RETURNING *
        `
        const data = [
            id
        ]

        const rows = await Query(sql, data)

        return rows[0]
    }

}
