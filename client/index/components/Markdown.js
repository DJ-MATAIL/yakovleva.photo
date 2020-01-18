import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Md from 'markdown-it'
import MdContainer from 'markdown-it-container'
import '../../common/styles/markdown.styl'

function Markdown(props) {
    const { text } = props
    const [ html, setHTML ] = useState('')

    useEffect(() => {
        const md = Md()

        md.use(MdContainer, 'block', {
            validate(params) {
                return params.trim().match(/^block\s+(.+)$/)
            },

            render(tokens, idx) {
                const token = tokens[idx]
                const m = token.info.trim().match(/^block\s+(.+)$/)

                if (token.nesting === 1) {
                    return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary><div>\n'
                } else {
                    return '</div></details>\n'
                }
            },

            marker: ':'
        })

        setHTML(md.render(text))
    }, [])

    return (
        <div className="markdown" dangerouslySetInnerHTML={{ __html: html }}></div>
    )
}

Markdown.propTypes = {
    text: PropTypes.string.isRequired
}

export default Markdown
