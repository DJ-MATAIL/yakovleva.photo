const { Query } = require('../lib/db')
const config    = require('../config')
const { imagesPerPage } = require('../../common/constants/limits')

module.exports = class Image {

    static async getList(offset = 0) {
        const limit = config.model.image.listLimit
        const sql = `
            SELECT
                *
            FROM
                images
            ORDER BY id DESC
            LIMIT $1
            OFFSET $2
        `
        const data = [
            limit + 1,
            offset * limit
        ]

        return await Query(sql, data)
    }

    static async listExists(ids) {
        let sql = `
            SELECT
                *
            FROM
                images
            WHERE
                id IN (
        `

        ids.forEach((id, index) => {
            if (index != 0) {
                sql += ','
            }

            sql += `$${ index + 1 }`
        })

        sql += `)
            ORDER BY id DESC
        `

        const rows = await Query(sql, ids)
        const rowsIds = rows.map(item => item.id)

        let exists = false

        for (let id of ids) {
            exists = false

            rowsIdsLabel: for (let rowId of rowsIds) {
                if (rowId == id) {
                    exists = true
                    break rowsIdsLabel
                }
            }

            if (!exists) {
                break
            }
        }

        return exists
    }

    static async getListWithoutSectionId({ sectionId }, offset = 0) {
        const limit = imagesPerPage
        const sql = `
            SELECT
                i.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.mini_height AS mini_height,
                i.full_width  AS full_width,
                i.full_height AS full_height,
                si.section_id AS section_id,
                si.id         AS section_image_id
            FROM
                images AS i
                    LEFT OUTER JOIN (SELECT * FROM section_images WHERE section_id = $1) AS si
                    ON i.id = si.image_id
            WHERE
                si.id IS NULL
            ORDER BY i.id DESC
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

    static async getListWithoutSlides(offset = 0) {
        const limit = imagesPerPage
        const sql = `
            SELECT
                i.id          AS id,
                i.mini_name   AS mini_name,
                i.full_name   AS full_name,
                i.mini_width  AS mini_width,
                i.mini_height AS mini_height,
                i.full_width  AS full_width,
                i.full_height AS full_height
            FROM
                images AS i
                    LEFT OUTER JOIN slides AS s
                    ON i.id = s.image_id
            WHERE
                s.id IS NULL
            ORDER BY i.id DESC
            LIMIT $1
            OFFSET $2
        `
        const data = [
            limit + 1,
            offset * limit
        ]

        return await Query(sql, data)
    }

    static async add({ miniName, miniWidth, miniHeight, fullName, fullWidth, fullHeight }) {
        const sql = `
            INSERT INTO images
            (
                mini_name,
                mini_width,
                mini_height,
                full_name,
                full_width,
                full_height
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING *
        `
        const data = [
            miniName,
            miniWidth,
            miniHeight,
            fullName,
            fullWidth,
            fullHeight
        ]

        const rows = await Query(sql, data)

        return rows[0]
    }

    static async remove({ id }) {
        const sql = `
            DELETE FROM
                images
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
