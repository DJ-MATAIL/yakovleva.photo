const { minify } = require('html-minifier')

module.exports = async function renderClient(ctx) {
    const { meta, redux } = ctx.state
    const { title, ldJson, url } = meta

    const description = 'Семейный фотограф Наталия Яковлева'
    const keywords = [
        'фотограф',
        'Наталия',
        'Яковлева',
        'фотография',
        'семья'
    ]

    let html = await ctx.render('default', {
        title,
        description,
        ldJson,
        url,
        keywords: keywords.join(','),
        redux: JSON.stringify(redux)
    })

    if (global.env == 'production') {
        html = minify(html, {
            // заменяет аттрибут readonly="readonly" на readonly
            collapseBooleanAttributes: true,
            // удаляет лишние символы между свойствами display:none;
            collapseInlineTagWhitespace: true,
            // удаляет пробельные символы внутри текстовых нод
            // <div> <p>    foo </p>    </div> => <div><p>foo</p></div>
            collapseWhitespace: true,
            // минифицировать js
            minifyJS: {
                compress: {
                    arguments:     false,
                    assignments:   false,
                    booleans:      false,
                    collapse_vars: false,
                    comparisons:   false,
                    conditionals:  false,
                    dead_code:     false,
                    directives:    false,
                    functions:     false,
                    hoist_props:   false,
                    if_return:     false,
                    inline:        false,
                    join_vars:     false,
                    loops:         false,
                    negate_iife:   false,
                    objects:       false,
                    properties:    false,
                    reduce_vars:   false,
                    sequences:     false,
                    switches:      false,
                    typeofs:       false
                }
            },
            // удалить html-комменты
            removeComments: true,
            // удалять атрибуты типо <a id=""></a> => <a></a>
            removeEmptyAttributes: true,
            // удалять у style, link type="text/css"
            removeStyleLinkTypeAttributes: true
        })
    }

    ctx.type = 'html'
    ctx.body = html
}
