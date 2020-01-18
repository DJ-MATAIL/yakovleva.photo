const fs = require('fs')

module.exports = (src, dest) => {
    return new Promise((resolve, reject) => {
        const readStream  = fs.createReadStream(src)
        const writeStream = fs.createWriteStream(dest)

        readStream.on('error', err => {
            writeStream.destroy()
            reject(err)
        })
        writeStream.on('error', err => {
            readStream.destroy()
            reject(err)
        })

        writeStream.on('close', resolve)
        readStream.pipe(writeStream)
    })
}
