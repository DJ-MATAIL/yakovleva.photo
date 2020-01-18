import { GET, DELETE, POST } from '../../common/lib/http'
import {
    GET_SECTION_IMAGES_LIST_FETCHING,
    GET_SECTION_IMAGES_LIST_OK,
    GET_SECTION_IMAGES_LIST_ERROR,

    CLEAR_SECTION_IMAGES_LIST,

    DELETE_SECTION_IMAGE_FETCHING,
    DELETE_SECTION_IMAGE_OK,
    DELETE_SECTION_IMAGE_ERROR,

    ADD_SECTION_IMAGES_LIST_FETCHING,
    ADD_SECTION_IMAGES_LIST_OK,
    ADD_SECTION_IMAGES_LIST_ERROR
} from '../constants/action-types'
import { addNotification } from './notifications-list'
import { hideModalSectionImagesList } from './layers'


const getSectionImagesListFetching = ()   => ({ type: GET_SECTION_IMAGES_LIST_FETCHING })
const getSectionImagesListOk       = data => ({ type: GET_SECTION_IMAGES_LIST_OK, data })
const getSectionImagesListError    = data => ({ type: GET_SECTION_IMAGES_LIST_ERROR, data })

export function getSectionImagesList(data) {
    return async dispatch => {
        try {
            dispatch(getSectionImagesListFetching())

            const response = await GET('/api/section-images/', {
                section_id: data.sectionId,
                offset:     data.offset
            })

            dispatch(getSectionImagesListOk(response))
        } catch(err) {
            dispatch(getSectionImagesListError(err))
        }
    }
}


export const clearSectionImagesList = () => ({ type: CLEAR_SECTION_IMAGES_LIST })


const deleteSectionImageFetching = ()   => ({ type: DELETE_SECTION_IMAGE_FETCHING })
const deleteSectionImageOk       = data => ({ type: DELETE_SECTION_IMAGE_OK, data })
const deleteSectionImageError    = data => ({ type: DELETE_SECTION_IMAGE_ERROR, data })

export function deleteSectionImage(data) {
    return async dispatch => {
        try {
            dispatch(deleteSectionImageFetching())

            const response = await DELETE('/api/section-images/' + data.id)

            dispatch(addNotification({ message: 'Изображение было удалено!' }))
            dispatch(deleteSectionImageOk(response))
        } catch(err) {
            dispatch(deleteSectionImageError(err))
        }
    }
}


const addSectionImagesListFetching = ()   => ({ type: ADD_SECTION_IMAGES_LIST_FETCHING })
const addSectionImagesListOk       = data => ({ type: ADD_SECTION_IMAGES_LIST_OK, data })
const addSectionImagesListError    = data => ({ type: ADD_SECTION_IMAGES_LIST_ERROR, data })

export function addSectionImagesList(data) {
    return async dispatch => {
        try {
            dispatch(addSectionImagesListFetching())

            const response = await POST('/api/section-images/', data)

            dispatch(addNotification({ message: 'Изображения были добавлены!' }))
            dispatch(hideModalSectionImagesList())
            dispatch(addSectionImagesListOk(response))
        } catch(err) {
            dispatch(addSectionImagesListError())
        }
    }
}
