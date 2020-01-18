const path = require('path')

global.rootDir    = path.join(__dirname, '../')
global.viewsDir   = path.join(global.rootDir, 'server', 'views')
global.uploadsDir = path.join(global.rootDir, 'uploads')
global.keysDir    = path.join(global.rootDir, 'keys')
global.logsDir    = path.join(global.rootDir, 'logs')
global.env        = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : 'development'
