import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'

import App from './App'

const UploadImagesList       = loadable(() => import('./UploadImagesList'))
const ImageViewer            = loadable(() => import('./ImageViewer'))
const ModalSection           = loadable(() => import('./Modal/ModalSection'))
const NotificationsList      = loadable(() => import('./NotificationsList'))
const ModalSectionImagesList = loadable(() => import('./Modal/ModalSectionImagesList'))
const ModalSlidesList        = loadable(() => import('./Modal/ModalSlidesList'))

export default function Root() {
    const {
        uploadImagesListHidden,
        imageViewerHidden,
        modalSectionHidden,
        modalSectionImagesListHidden,
        modalSlidesListHidden
    } = useSelector(state => state.layers)

    return (
        <Fragment>
            <App />
            { !uploadImagesListHidden && <UploadImagesList /> }
            { !imageViewerHidden && <ImageViewer /> }
            { !modalSectionHidden && <ModalSection /> }
            { !modalSectionImagesListHidden && <ModalSectionImagesList /> }
            { !modalSlidesListHidden && <ModalSlidesList /> }
            <NotificationsList />
        </Fragment>
    )
}
