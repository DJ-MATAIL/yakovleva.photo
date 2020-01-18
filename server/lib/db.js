const { Pool } = require('pg')
const config = require('../config')

const pool = new Pool(config.lib.db)

module.exports = class DB {

    async connect() {
        this.connection = await pool.connect()
    }

    close() {
        this.connection.release()
    }

    async query(...args) {
        return await this.connection.query(...args)
    }

    static async Query(...args) {
        const db = new DB()
        await db.connect()

        const data = await db.query(...args)

        db.close()
        return data.rows
    }

}
