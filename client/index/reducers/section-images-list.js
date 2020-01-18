import {
    GET_SECTION_IMAGES_LIST_FETCHING,
    GET_SECTION_IMAGES_LIST_OK,
    GET_SECTION_IMAGES_LIST_ERROR,

    CLEAR_SECTION_IMAGES_LIST
} from '../constants/action-types'
import initialState from '../../../common/redux/section-images-list'

export default function sectionImagesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_SECTION_IMAGES_LIST_FETCHING:
            return { ...state, getSectionImagesListFetching: true }
        case GET_SECTION_IMAGES_LIST_OK: {
            const { items, hasMore } = data

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
                items: [],
                hasMore: false
            }


        default:
            return state
    }
}
