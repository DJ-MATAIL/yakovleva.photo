const { spawn } = require('child_process')

function exec(command, args) {
    return new Promise((resolve, reject) => {
        const handle = spawn(command, args)
        const { stdout, stderr } = handle

        let success = ''
        let error   = ''

        stdout.on('data', data => success += data)
        stderr.on('data', data => error += data)

        handle.on('close', () => {
            if (error.length > 0) {
                return reject(new Error(error))
            }

            resolve(success)
        })
        handle.on('error', reject)
    })
}

module.exports = class ImageMagick {

    static resize(path, newPath, options) {
        const DEFAULT_QUALITY = 80

        const args = [
            'convert',
            path
        ]


        // размеры
        args.push('-resize')

        if (options.width) {
            args.push(options.width)
        }

        if (options.height) {
            args.push(`x${ options.height }`)
        }


        // качество
        args.push('-quality')
        args.push(options.quality || DEFAULT_QUALITY)

        // вырезать комменты и другие ненужные поля
        args.push('-strip')

        // результирующее изображение
        args.push(newPath)

        return exec('magick', args)
    }

    static async getSize(path) {
        const args = [
            'identify',
            '-format',
            '%B',
            path
        ]

        return parseInt(await exec('magick', args))
    }

    static async getSizes(path) {
        const args = [
            'identify',
            '-format',
            '%wx%h',
            path
        ]

        const sizes = await exec('magick', args)
        const [ width, height ] = sizes.split('x')

        return { width, height }
    }

}
