import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import loadable from '@loadable/component'

const Menu        = loadable(() => import('./Menu'))
const ImageViewer = loadable(() => import('./ImageViewer'))

import App from './App'

export default function Root() {
    const {
        imageViewerHidden,
        menuHidden
    } = useSelector(state => state.layersList)

    return (
        <Fragment>
            <App />
            { !imageViewerHidden && <ImageViewer /> }
            { !menuHidden && <Menu /> }
        </Fragment>
    )
}
