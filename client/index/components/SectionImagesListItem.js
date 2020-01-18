import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addImagesListToImageViewer as addImagesListToImageViewerAction } from '../actions/image-viewer'
import { showImageViewer as showImageViewerAction } from '../actions/layers-list'
import '../styles/SectionImagesListItem.styl'

function SectionImagesListItem(props) {
    const dispatch = useDispatch()
    const addImagesListToImageViewer = data => dispatch(addImagesListToImageViewerAction(data))
    const showImageViewer = () => dispatch(showImageViewerAction())

    const {
        index,
        margin,
        photo,
        images
    } = props
    const {
        src,
        width,
        height
    } = photo

    let currentImage = images[index]

    function images2ImageViewer(arr) {
        return images.map((item, idx) => {
            return {
                id: item.id,
                ...item.full,
                current: idx == index
            }
        })
    }

    function zoom() {
        addImagesListToImageViewer(images2ImageViewer(images))
        showImageViewer()
    }

    return (
        <div
            key={ index }
            className="section-images-list-item"
            style={{
                width:  `${ width }px`,
                height: `${ height }px`,
                margin: `${ margin }px`
            }}
        >
            <img src={ src } />
            <div className="absolute-100" onClick={ zoom }></div>
        </div>
    )
}

SectionImagesListItem.propTypes = {
    index:  PropTypes.number.isRequired,
    margin: PropTypes.number.isRequired,
    photo:  PropTypes.object.isRequired,
    images: PropTypes.array.isRequired
}

export default SectionImagesListItem
