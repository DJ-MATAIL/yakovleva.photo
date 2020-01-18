import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteSectionImage as deleteSectionImageAction } from '../actions/section-images-list'
import { addImagesToImageViewerImagesList as addImagesToImageViewerImagesListAction } from '../actions/image-viewer'
import { showImageViewer as showImageViewerAction } from '../actions/layers'
import '../styles/SectionImagesListItem.styl'

function SectionImagesListItem(props) {
    const dispatch = useDispatch()
    const deleteSectionImage = data => dispatch(deleteSectionImageAction(data))
    const addImagesToImageViewerImagesList = data => dispatch(addImagesToImageViewerImagesListAction(data))
    const showImageViewer = () => dispatch(showImageViewerAction())

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
        addImagesToImageViewerImagesList(images2ImageViewer(images))
        showImageViewer()
    }

    function remove() {
        deleteSectionImage({ id: currentImage.id })
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
            <div className="absolute-100">
                <button className="absolute-100" onClick={ zoom }></button>
                <button className="flex flex-middle flex-center" onClick={ remove }>
                    <img src="/icons/close.svg" />
                </button>
            </div>
        </div>
    )
}

SectionImagesListItem.propTypes = {
    index:  PropTypes.number.isRequired,
    photo:  PropTypes.object.isRequired,
    margin: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
}

export default SectionImagesListItem
