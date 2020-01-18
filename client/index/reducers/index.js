import { combineReducers } from 'redux'

import imageViewer from './image-viewer'
import layersList from './layers-list'
import sectionImagesList from './section-images-list'
import sectionsList from './sections-list'
import slidesList from './slides-list'

export default combineReducers({
    imageViewer,
    layersList,
    sectionImagesList,
    sectionsList,
    slidesList
})
