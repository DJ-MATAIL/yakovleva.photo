const view = require('koa-ejs')

module.exports = app => {
    return view(app, {
        // директория с шаблонами
        root: global.viewsDir,
        // шаблон по-умолчанию
        layout: false,
        // расширение шаблонов
        viewExt: 'ejs',
        // отладочный режим
        debug: false,
        // разделитель в шаблонах
        delimiter: '%',
        // использовать асинхронные функции для рендеринга
        async: false,
        // не отдавать запросом, а возвращать html
        writeResp: false
    })
}
