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

export const showUploadImagesList = () => ({ type: SHOW_UPLOAD_IMAGES_LIST })
export const hideUploadImagesList = () => ({ type: HIDE_UPLOAD_IMAGES_LIST })

export const showImageViewer = () => ({ type: SHOW_IMAGE_VIEWER })
export const hideImageViewer = () => ({ type: HIDE_IMAGE_VIEWER })

export const showModalSectionImagesList = data => ({ type: SHOW_MODAL_SECTION_IMAGES_LIST, data })
export const hideModalSectionImagesList = ()   => ({ type: HIDE_MODAL_SECTION_IMAGES_LIST })

export const showModalSection = data => ({ type: SHOW_MODAL_SECTION, data })
export const hideModalSection = ()   => ({ type: HIDE_MODAL_SECTION })

export const showModalSlidesList = () => ({ type: SHOW_MODAL_SLIDES_LIST })
export const hideModalSlidesList = () => ({ type: HIDE_MODAL_SLIDES_LIST })
