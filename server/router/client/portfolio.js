const Joi                = require('@hapi/joi')
const validationSchema   = require('../../../common/utils/validation-schema')
const Section            = require('../../models/section')
const SectionImage       = require('../../models/section-image')
const config             = require('../../config')
const {
    INDEX_PAGE,
    PORTFOLIO_PAGE
}                        = require('../../../common/constants/pages')
const redux              = require('../../../common/redux')

exports.validation = async (ctx, next) => {
    const { params } = ctx
    const schema = Joi
        .object()
        .keys({
            sectionId: validationSchema.sectionId
        })
        .required()

    try {
        await schema.validateAsync(params)
    } catch(err) {
        return ctx.redirect('/portfolio')
    }

    await next()
}

exports.data = async (ctx, next) => {
    const { params } = ctx
    const { sectionId } = params
    let title
    let items

    // если был указан раздел
    if (sectionId) {
        const section = await Section.getById({ id: sectionId })

        // если такой раздел не существует
        // редирект
        if (!section) {
            return ctx.redirect('/portfolio')
        }

        title = section.name

        // получить изображения по id раздела
        items = await SectionImage.getListBySectionId({ sectionId })
    }

    // если не был указан раздел
    else {
        // получить изображения в обратном порядке
        items = await SectionImage.getList()
    }

    // проверить, есть ли еще изображения
    const limit   = config.model.sectionImage.listLimit
    const hasMore = items.length > limit

    items = items
        .slice(0, limit)
        .map(item => {
            item.mini = {
                src:    '/uploads/' + item.mini_name,
                width:  item.mini_width,
                height: item.mini_height
            }
            item.full = {
                src:    '/uploads/' + item.full_name,
                width:  item.full_width,
                height: item.full_height
            }

            delete item.mini_name
            delete item.mini_width
            delete item.mini_height

            delete item.full_name
            delete item.full_width
            delete item.full_height

            delete item.section_id
            delete item.section_name

            return item
        })

    ctx.state.data = {
        title,
        sectionId,
        hasMore,
        items
    }

    await next()
}

exports.meta = async (ctx, next) => {
    const { data } = ctx.state
    let title = PORTFOLIO_PAGE

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
                    '@id': `https://${ config.domain }/portfolio`,
                    name: PORTFOLIO_PAGE
                }
            }
        ]
    }

    if (data.title) {
        title = data.title
        ldJson.itemListElement.push({
            '@type': 'ListItem',
            position: 3,
            item: {
                '@id': `https://${ config.domain }/portfolio/${ data.sectionId }`,
                name: title
            }
        })
    }

    ctx.state.meta = {
        title,
        ldJson
    }

    await next()
}

exports.redux = async (ctx, next) => {
    const {
        hasMore,
        items,
        sectionsList
    } = ctx.state.data

    ctx.state.redux = {
        ...redux,
        sectionImagesList: {
            items,
            hasMore
        },
        sectionsList: {
            items: sectionsList
        }
    }

    await next()
}
