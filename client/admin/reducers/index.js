import { combineReducers } from 'redux'

import imageViewer       from './image-viewer'
import imagesList        from './images-list'
import layers            from './layers'
import modalImagesList   from './modal-images-list'
import notificationsList from './notifications-list'
import sectionImagesList from './section-images-list'
import sectionsList      from './sections-list'
import sign              from './sign'
import slidesList        from './slides-list'
import uploadImagesList  from './upload-images-list'

export default combineReducers({
    imageViewer,
    imagesList,
    layers,
    modalImagesList,
    notificationsList,
    sectionImagesList,
    sectionsList,
    sign,
    slidesList,
    uploadImagesList
})
