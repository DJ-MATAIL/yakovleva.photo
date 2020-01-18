import {
    SHOW_UPLOAD_IMAGES_LIST,
    HIDE_UPLOAD_IMAGES_LIST,

    SHOW_IMAGE_VIEWER,
    HIDE_IMAGE_VIEWER,

    SHOW_MODAL_SECTION_IMAGES_LIST,
    HIDE_MODAL_SECTION_IMAGES_LIST,

    SHOW_MODAL_SECTION,
    HIDE_MODAL_SECTION,

    SHOW_MODAL_SLIDES_LIST,
    HIDE_MODAL_SLIDES_LIST
} from '../constants/action-types'

const initialState = {
    uploadImagesListHidden:       true,
    imageViewerHidden:            true,
    modalSectionImagesListHidden: true,
    modalSectionHidden:           true,
    modalSlidesListHidden:        true,

    data: {
        modalSection:           {},
        modalSectionImagesList: {}
    }
}

export default function layers(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case SHOW_UPLOAD_IMAGES_LIST:
            return { ...state, uploadImagesListHidden: false }
        case HIDE_UPLOAD_IMAGES_LIST:
            return { ...state, uploadImagesListHidden: true }
        case SHOW_IMAGE_VIEWER:
            return { ...state, imageViewerHidden: false }
        case HIDE_IMAGE_VIEWER:
            return { ...state, imageViewerHidden: true }
        case SHOW_MODAL_SECTION_IMAGES_LIST:
            return {
                ...state,
                modalSectionImagesListHidden: false,
                data: {
                    ...state.data,
                    modalSectionImagesList: data || {}
                }
            }
        case HIDE_MODAL_SECTION_IMAGES_LIST:
            return {
                ...state,
                modalSectionImagesListHidden: true,
                data: {
                    ...state.data,
                    modalSectionImagesList: {}
                }
            }
        case SHOW_MODAL_SECTION:
            return {
                ...state,
                modalSectionHidden: false,
                data: {
                    ...state.data,
                    modalSection: data || {}
                }
            }
        case HIDE_MODAL_SECTION:
            return {
                ...state,
                modalSectionHidden: true,
                data: {
                    ...state.data,
                    modalSection: {}
                }
            }
        case SHOW_MODAL_SLIDES_LIST:
            return { ...state, modalSlidesListHidden: false }
        case HIDE_MODAL_SLIDES_LIST:
            return { ...state, modalSlidesListHidden: true }


        default:
            return state
    }
}
