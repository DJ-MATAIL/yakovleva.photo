import React from 'react'
import PropTypes from 'prop-types'
import '../styles/SlidesListItem.styl'

function SlidesListItem(props) {
    const {
        src,
        loaded,
        visible
    } = props

    let className = 'slides-list-item absolute-100'

    if (visible) {
        className += ' visible'
    }

    const backgroundImage = loaded ? src: ''

    return (
        <div
            className={ className }
            style={{ backgroundImage: `url(${ backgroundImage })` }}
        ></div>
    )
}

SlidesListItem.propTypes = {
    src:     PropTypes.string.isRequired,
    loaded:  PropTypes.bool,
    visible: PropTypes.bool.isRequired
}

export default SlidesListItem
