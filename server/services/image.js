const uuid          = require('uuid/v1')
const path          = require('path')
const fs            = require('fs').promises
const os            = require('os')
const copyLargeFile = require('../utils/copy-large-file')
const ImageMagick   = require('../lib/image-magick')
const config        = require('../config')

module.exports = class Image {

    static async moveTempFile(src) {
        const srcExtension = path.extname(src)
        const srcPath      = path.join(config.middleware.imageUploader.directory, src)

        const destName = `${ uuid() }${ srcExtension }`
        const destPath = path.join(config.service.image.directory, destName)

        await fs.rename(srcPath, destPath)

        return destName
    }

    static async copy(src) {
        const srcExtension = path.extname(src)
        const srcPath      = path.join(config.service.image.directory, src)
        const destName = `${ uuid() }${ srcExtension }`
        const destPath = path.join(config.service.image.directory, destName)

        await copyLargeFile(srcPath, destPath)

        return destName
    }

    static async makeFull(src) {
        const srcPath = path.join(config.service.image.directory, src)
        const options = {
            height: config.service.image.full.height
        }

        await ImageMagick.resize(srcPath, srcPath, options)
    }

    static async makeMini(src) {
        const srcPath = path.join(config.service.image.directory, src)
        const options = {
            width: config.service.image.mini.width
        }

        await ImageMagick.resize(srcPath, srcPath, options)
    }

    static async getSizes(src) {
        const srcPath = path.join( config.service.image.directory, src )

        return await ImageMagick.getSizes(srcPath)
    }

}
