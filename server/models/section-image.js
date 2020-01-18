const { Query } = require('../lib/db')
const config    = require('../config')

module.exports = class SectionImage {

    static async getList(offset = 0) {
        const limit = config.model.sectionImage.listLimit
        const sql = `
            SELECT
                si.id         AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height,
                s.id          AS section_id,
                s.name        AS section_name
            FROM
                section_images AS si
                    INNER JOIN images AS i
                        ON si.image_id = i.id
                    INNER JOIN sections AS s
                        ON si.section_id = s.id
            ORDER BY si.id DESC
            LIMIT $1
            OFFSET $2
        `
        const data = [
            limit + 1,
            offset * limit
        ]

        return await Query(sql, data)
    }

    static async getListByIds({ items }) {
        let sql = `
            SELECT
                si.id         AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height,
                s.id          AS section_id,
                s.name        AS section_name
            FROM
                section_images AS si
                    INNER JOIN images AS i
                        ON si.image_id = i.id
                    INNER JOIN sections AS s
                        ON si.section_id = s.id
            WHERE
                si.id IN (
        `

        items.forEach((item, index) => {
            if (index != 0) {
                sql += ','
            }

            sql += `$${ index + 1 }`
        })

        sql += `)
            ORDER BY si.id DESC
        `

        return await Query(sql, items)
    }

    static async getListBySectionId({ sectionId }, offset = 0) {
        const limit = config.model.sectionImage.listLimit
        const sql = `
            SELECT
                si.id         AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.full_width  AS full_width,
                i.mini_height AS mini_height,
                i.full_height AS full_height,
                s.id          AS section_id,
                s.name        AS section_name
            FROM
                section_images AS si
                    INNER JOIN images AS i
                        ON si.image_id = i.id
                    INNER JOIN sections AS s
                        ON si.section_id = s.id
            WHERE
                si.section_id = $1
            ORDER BY si.id DESC
            LIMIT $2
            OFFSET $3
        `
        const data = [
            sectionId,
            limit + 1,
            offset * limit
        ]

        return await Query(sql, data)
    }

    static async getById({ id }) {
        const sql = `
            SELECT
                *
            FROM
                section_images
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

    static async exists({ id }) {
        const row = await SectionImage.getById({ id })

        return row ? true : false
    }

    static async addListBySectionId({ items, sectionId }) {
        let sql = `
            INSERT INTO section_images
            ( image_id, section_id )
            VALUES
        `

        for (let i = 0, j = 1; i < items.length; i++, j += 2) {
            const item = items[i]

            if (i != 0) {
                sql += ','
            }

            sql += `( $${ j }, $${ j + 1 } )`
        }

        sql += `
            RETURNING id
        `

        const data = []

        items.forEach(item => {
            data.push(item)
            data.push(sectionId)
        })

        return await Query(sql, data)
    }

    static async remove({ id }) {
        const sql = `
            DELETE FROM section_images
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

}
