import {
    ADD_UPLOAD_IMAGE_TO_UPLOAD_IMAGES_LIST,
    SET_UPLOAD_IMAGE_STAGE
} from '../constants/action-types'

export const addUploadImageToUploadImagesList = data => ({ type: ADD_UPLOAD_IMAGE_TO_UPLOAD_IMAGES_LIST, data })
export const setUploadImageStage              = data => ({ type: SET_UPLOAD_IMAGE_STAGE, data })
