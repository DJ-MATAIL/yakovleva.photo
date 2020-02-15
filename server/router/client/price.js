const {
    INDEX_PAGE,
    PRICE_PAGE
}            = require('../../../common/constants/pages')
const redux  = require('../../../common/redux')
const config = require('../../config')

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
            },
            {
                '@type': 'ListItem',
                position: 2,
                item: {
                    '@id': `https://${ config.domain }/price`,
                    name: PRICE_PAGE
                }
            }
        ]
    }

    ctx.state.meta = {
        title: PRICE_PAGE,
        ldJson,
        url: `https://${ config.domain }/price`
    }

    await next()
}

exports.redux = async (ctx, next) => {
    const {
        sectionsList
    } = ctx.state.data

    ctx.state.redux = {
        ...redux,
        sectionsList: {
            items: sectionsList
        }
    }

    await next()
}
