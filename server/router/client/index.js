const Slide          = require('../../models/slide')
const { INDEX_PAGE } = require('../../../common/constants/pages')
const redux          = require('../../../common/redux')
const config         = require('../../config')

exports.data = async (ctx, next) => {
    // загрузить слайды
    let slidesList = await Slide.getFullList()
    slidesList = slidesList.map(item => {
        item.src = '/uploads/' + item.full_name

        delete item.full_name
        delete item.full_width
        delete item.full_height

        delete item.mini_name
        delete item.mini_width
        delete item.mini_height

        return item
    })

    ctx.state.data = {
        slidesList
    }

    await next()
}

exports.meta = async (ctx, next) => {
    const ldJson = {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                item: {
                    '@id': `https://${ config.domain }/`,
                    name: INDEX_PAGE
                }
            }
        ]
    }

    ctx.state.meta = {
        title: INDEX_PAGE,
        ldJson
    }

    await next()
}

exports.redux = async (ctx, next) => {
    const {
        slidesList,
        sectionsList
    } = ctx.state.data

    ctx.state.redux = {
        ...redux,
        sectionsList: { items: sectionsList },
        slidesList: { items: slidesList }
    }

    await next()
}
