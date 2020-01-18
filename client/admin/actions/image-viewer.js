import {
    ADD_IMAGES_TO_IMAGE_VIEWER_IMAGES_LIST,
    CLEAR_IMAGES_FROM_IMAGE_VIEWER_IMAGES_LIST,
    SET_CURRENT_IMAGE_OF_IMAGE_VIEWER
} from '../constants/action-types'

export const addImagesToImageViewerImagesList     = data => ({ type: ADD_IMAGES_TO_IMAGE_VIEWER_IMAGES_LIST, data })
export const clearImagesFromImageViewerImagesList = ()   => ({ type: CLEAR_IMAGES_FROM_IMAGE_VIEWER_IMAGES_LIST })
export const setCurrentImageOfImageViewer         = data => ({ type: SET_CURRENT_IMAGE_OF_IMAGE_VIEWER, data })
