import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideImageViewer as hideImageViewerAction } from '../actions/layers-list'
import {
    clearImagesListFromImageViewer as clearImagesListFromImageViewerAction,
    setCurrentImageOfImageViewer   as setCurrentImageOfImageViewerAction
} from '../actions/image-viewer'
import {
    ESCAPE,
    RIGHT_ARROW,
    LEFT_ARROW
} from '../../common/constants/key-codes'
import '../styles/ImageViewer.styl'

export default function ImageViewer() {
    const dispatch = useDispatch()

    const clearImagesListFromImageViewer = ()   => dispatch(clearImagesListFromImageViewerAction())
    const setCurrentImageOfImageViewer   = data => dispatch(setCurrentImageOfImageViewerAction(data))
    const hideImageViewer                = ()   => dispatch(hideImageViewerAction())

    const imagesList = useSelector(state => state.imageViewer.items)

    const [ leftArrowVisible, setLeftArrowVisible ]   = useState(true)
    const [ rightArrowVisible, setRightArrowVisible ] = useState(true)

    useEffect(() => {
        document.addEventListener('keydown', onKeyPress)

        return () => {
            document.removeEventListener('keydown', onKeyPress)
            clearImagesListFromImageViewer()
        }
    }, [])

    function onKeyPress(event) {
        const code = event.code

        if (code == RIGHT_ARROW) {
            getNextImage()
        }

        if (code == LEFT_ARROW) {
            getPreviousImage()
        }

        if (code == ESCAPE) {
            close()
        }
    }

    function getNextImage() {
        const { image, index } = getCurrentImage()
        const nextImage = imagesList[index + 1]

        if (!nextImage) {
            return
        }

        setCurrentImageOfImageViewer({ id: nextImage.id })
    }

    function getPreviousImage() {
        const { image, index } = getCurrentImage()
        const previousImage = imagesList[index - 1]

        if (!previousImage) {
            return
        }

        setCurrentImageOfImageViewer({ id: previousImage.id })
    }

    function getCurrentImage() {
        let index = 0

        for (let image of imagesList) {
            if (image.current) {
                break
            }

            index++
        }

        return {
            image: imagesList[index],
            index
        }
    }

    function checkArrows(currentImageIndex) {
        // левая стрелка
        if (!imagesList[currentImageIndex - 1]) {
            if (leftArrowVisible) {
                setLeftArrowVisible(false)
            }
        } else {
            if (!leftArrowVisible) {
                setLeftArrowVisible(true)
            }
        }

        // правая стрелка
        if (!imagesList[currentImageIndex + 1]) {
            if (rightArrowVisible) {
                setRightArrowVisible(false)
            }
        } else {
            if (!rightArrowVisible) {
                setRightArrowVisible(true)
            }
        }
    }

    const currentImage = getCurrentImage()
    checkArrows(currentImage.index)

    return (
        <div className="image-viewer fixed-100">
            <div className="image-viewer--picture">
                <img src={ currentImage.image.src } className="absolute-center" />
            </div>
            <div className="image-viewer--nav absolute-100">
                { leftArrowVisible && <button className="image-viewer--left-arrow" onClick={ getPreviousImage }>
                    <img src="/icons/left-arrow.svg" alt="left-arrow" />
                </button> }
                { rightArrowVisible && <button className="image-viewer--right-arrow" onClick={ getNextImage }>
                    <img src="/icons/right-arrow.svg" alt="right-arrow" />
                </button> }
                <button className="image-viewer--close" onClick={ hideImageViewer }>
                    <img src="/icons/close.svg" alt="close" />
                </button>
            </div>
        </div>
    )
}
