import {
    ADD_IMAGES_LIST_TO_IMAGE_VIEWER,
    CLEAR_IMAGES_LIST_FROM_IMAGE_VIEWER,
    SET_CURRENT_IMAGE_OF_IMAGE_VIEWER
} from '../constants/action-types'

export const addImagesListToImageViewer = data => ({ type: ADD_IMAGES_LIST_TO_IMAGE_VIEWER, data })
export const clearImagesListFromImageViewer = () => ({ type: CLEAR_IMAGES_LIST_FROM_IMAGE_VIEWER })
export const setCurrentImageOfImageViewer = data => ({ type: SET_CURRENT_IMAGE_OF_IMAGE_VIEWER, data })
