import {
    GET,
    DELETE
} from '../../common/lib/http'
import {
    GET_IMAGES_LIST_FETCHING,
    GET_IMAGES_LIST_OK,
    GET_IMAGES_LIST_ERROR,

    DELETE_IMAGE_FETCHING,
    DELETE_IMAGE_OK,
    DELETE_IMAGE_ERROR,

    CLEAR_IMAGES_FROM_IMAGES_LIST,
    ADD_UPLOAD_IMAGE_TO_IMAGES_LIST
} from '../constants/action-types'
import { addNotification } from './notifications-list'

const getImagesListFetching = ()   => ({ type: GET_IMAGES_LIST_FETCHING })
const getImagesListOk       = data => ({ type: GET_IMAGES_LIST_OK, data })
const getImagesListError    = data => ({ type: GET_IMAGES_LIST_ERROR, data })

export function getImagesList(data) {
    return async dispatch => {
        try {
            dispatch(getImagesListFetching())

            const response = await GET('/api/images/', {
                offset: data.offset
            })

            dispatch(getImagesListOk(response))
        } catch(err) {
            dispatch(getImagesListError(err))
        }
    }
}


const deleteImageFetching = ()   => ({ type: DELETE_IMAGE_FETCHING })
const deleteImageOk       = data => ({ type: DELETE_IMAGE_OK, data })
const deleteImageError    = data => ({ type: DELETE_IMAGE_ERROR, data })

export function deleteImage(data) {
    return async dispatch => {
        try {
            dispatch(deleteImageFetching())

            const response = await DELETE(`/api/images/${ data.id }`)

            dispatch(addNotification({ message: 'Изображение было удалено' }))
            dispatch(deleteImageOk(response))
        } catch(err) {
            dispatch(deleteImageError(err))
        }
    }
}


export const clearImageFromImagesList = () => ({ type: CLEAR_IMAGES_FROM_IMAGES_LIST })

export const addUploadImageToImagesList = data => ({ type: ADD_UPLOAD_IMAGE_TO_IMAGES_LIST, data })
