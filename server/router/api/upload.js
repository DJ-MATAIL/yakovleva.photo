const {
    extname: getFileExtension,
    join:    joinPath
} = require('path')
const ImageService   = require('../../services/image')
const ImageModel     = require('../../models/image')
const responseSchema = require('../../utils/response-schema')

module.exports = async ctx => {
    const { file } = ctx.request
    const {
        originalname, // имя на компе пользователя
        mimetype,     // mime-type файла
        filename,     // имя, которое дает multer
        path,         // полный путь до файла
        size          // размер файла
    } = file
    const extension = getFileExtension(filename)


    // переместить загруженный файл
    const fullImage = await ImageService.moveTempFile(filename)
    // копировать файл
    const miniImage = await ImageService.copy(fullImage)

    // Обрезать изображение
    await ImageService.makeFull(fullImage)
    await ImageService.makeMini(miniImage)


    // получить размеры
    const fullImageSizes = await ImageService.getSizes(fullImage)
    const miniImageSizes = await ImageService.getSizes(miniImage)


    // добавить в бд
    const addedImage = await ImageModel.add({
        miniName:   miniImage,
        miniWidth:  miniImageSizes.width,
        miniHeight: miniImageSizes.height,
        fullName:   fullImage,
        fullWidth:  fullImageSizes.width,
        fullHeight: fullImageSizes.height
    })

    ctx.body = responseSchema.ok({
        id: addedImage.id,
        mini: {
            src:    '/uploads/' + addedImage.mini_name,
            width:  addedImage.mini_width,
            height: addedImage.mini_height
        },
        full: {
            src:    '/uploads/' + addedImage.full_name,
            width:  addedImage.full_width,
            height: addedImage.full_height
        }
    })
}
