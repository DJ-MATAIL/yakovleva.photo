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

const initialState = {
    getSectionImagesListFetching: false,
    getSectionImagesListOk:       false,
    getSectionImagesListError:    false,

    deleteSectionImageFetching: false,
    deleteSectionImageOk:       false,
    deleteSectionImageError:    false,

    addSectionImagesListFetching: false,
    addSectionImagesListOk:       false,
    addSectionImagesListError:    false,

    items:   [],
    hasMore: false
}

export default function sectionImagesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_SECTION_IMAGES_LIST_FETCHING:
            return { ...state, getSectionImagesListFetching: true }
        case GET_SECTION_IMAGES_LIST_OK: {
            const {
                items,
                hasMore
            } = data

            return {
                ...state,
                getSectionImagesListFetching: false,
                getSectionImagesListOk:       true,
                items: [
                    ...state.items,
                    ...items
                ],
                hasMore
            }
        }
        case GET_SECTION_IMAGES_LIST_ERROR:
            return {
                ...state,
                getSectionImagesListFetching: false,
                getSectionImagesListError:    true
            }


        case CLEAR_SECTION_IMAGES_LIST:
            return {
                ...state,
                hasMore: false,
                items: []
            }


        case DELETE_SECTION_IMAGE_FETCHING:
            return { ...state, deleteSectionImageFetching: true }
        case DELETE_SECTION_IMAGE_OK: {
            const { id } = data

            return {
                ...state,
                deleteSectionImageFetching: false,
                deleteSectionImageOk:       true,
                items: state.items.filter(item => item.id != id)
            }
        }
        case DELETE_SECTION_IMAGE_ERROR:
            return {
                ...state,
                deleteSectionImageFetching: false,
                deleteSectionImageError:    true
            }


        case ADD_SECTION_IMAGES_LIST_FETCHING:
            return { ...state, addSectionImagesListFetching: true }
        case ADD_SECTION_IMAGES_LIST_OK: {
            const { items } = data

            return {
                ...state,
                addSectionImagesListFetching: false,
                addSectionImagesListOk:       true,
                items: [
                    ...items,
                    ...state.items
                ]
            }
        }
        case ADD_SECTION_IMAGES_LIST_ERROR:
            return {
                ...state,
                addSectionImagesListFetching: false,
                addSectionImagesListError:    true
            }


        default:
            return state
    }
}
