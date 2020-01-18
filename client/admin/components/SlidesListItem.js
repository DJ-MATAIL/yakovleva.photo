import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteSlide as deleteSlideAction } from '../actions/slides-list'
import '../styles/SlidesListItem.styl'

function SlidesListItem(props) {
    const dispatch = useDispatch()
    const deleteSlide = data => dispatch(deleteSlideAction(data))

    const {
        index,
        photo,
        margin,
        images
    } = props
    const {
        src,
        width,
        height
    } = photo

    let currentImage = images[index]

    function zoom() {
        console.log('zoom')
    }

    function remove() {
        deleteSlide({ id: currentImage.id })
    }

    return (
        <div
            key={ index }
            className="slides-list-item"
            style={{
                width:  `${ width }px`,
                height: `${ height }px`,
                margin: `${ margin }px`
            }}
        >
            <img src={ src } />
            <div className="absolute-100">
                <button className="absolute-100" onClick={ zoom }></button>
                <button className="flex flex-middle flex-center" onClick={ remove }>
                    <img src="/icons/close.svg" />
                </button>
            </div>
        </div>
    )
}

SlidesListItem.propTypes = {
    index:  PropTypes.number.isRequired,
    photo:  PropTypes.object.isRequired,
    margin: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
}

export default SlidesListItem
