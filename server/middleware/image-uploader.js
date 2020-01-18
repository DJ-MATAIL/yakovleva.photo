const os     = require('os')
const multer = require('multer')
const path   = require('path')
const uuid   = require('uuid/v1')
const config = require('../config')

const uploader = multer({
    // куда сохранять файлы
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, config.middleware.imageUploader.directory)
        },

        filename(req, file, cb) {
            const extension = path.extname(file.originalname)

            cb(null, `${ uuid() }${ extension }`)
        }
    }),
    // фильтр файлов
    fileFilter(req, file, cb) {
        /*
            file {
                fieldname,
                originalname,
                encoding,
                mimetype,
                size,
                destination,
                filename,
                path
            }
        */


        // Проверить расширение
        const name = file.originalname
        const extension = path.extname(name)
        const { allowedExtensions } = config.middleware.imageUploader

        if (!allowedExtensions.includes(extension)) {
            return cb(null, false)
        }


        // проверить mime-type
        const mimeType = file.mimetype
        const { allowedMimeTypes } = config.middleware.imageUploader

        if (!allowedMimeTypes.includes(mimeType)) {
            return cb(null, false)
        }


        cb(null, true)
    },
    // лимиты
    limits: {
        // размер имени текстового поля
        // fieldNameSize: 20,
        // размер текстового поля
        // fieldSize: 0,
        // макс. кол-во текстовых полей
        fields: 0,
        // размер файла в байтах
        fileSize: config.middleware.imageUploader.maxFileSize,
        // максимальное кол-во файлов
        files: 1,
        // максимальное кол-во файлов + полей
        parts: 1,
        // максимальное кол-во заголовков
        headerPairs: 2000
    }
})

const uploaderPromise = ctx => {
    return new Promise((resolve, reject) => {
        const { req, res } = ctx

        uploader.single('photo')(req, res, err => {
            if (err) {
                reject(err)
            }

            ctx.request.file = req.file
            delete req.file

            resolve()
        })
    })
}

module.exports = async function imageUploader(ctx, next) {
    try {
        await uploaderPromise(ctx)
    } catch(err) {
        if (err.message == 'File too large') {
            return ctx.throw(413)
        }

        return ctx.throw(400)
    }

    await next()
}
