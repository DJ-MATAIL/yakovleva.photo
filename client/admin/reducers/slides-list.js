import {
    GET_SLIDES_LIST_FETCHING,
    GET_SLIDES_LIST_OK,
    GET_SLIDES_LIST_ERROR,

    DELETE_SLIDE_FETCHING,
    DELETE_SLIDE_OK,
    DELETE_SLIDE_ERROR,

    CLEAR_SLIDES_LIST,

    ADD_SLIDES_LIST_FETCHING,
    ADD_SLIDES_LIST_OK,
    ADD_SLIDES_LIST_ERROR
} from '../constants/action-types'

const initialState = {
    getSlidesListFetching: false,
    getSlidesListOk:       false,
    getSlidesListError:    false,

    deleteSlideFetching: false,
    deleteSlideOk:       false,
    deleteSlideError:    false,

    addSlidesListFetching: false,
    addSlidesListOk:       false,
    addSlidesListError:    false,

    items: []
}

export default function slidesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_SLIDES_LIST_FETCHING:
            return { ...state, getSlidesListFetching: true }
        case GET_SLIDES_LIST_OK: {
            const { items, hasMore } = data

            return {
                ...state,
                getSlidesListFetching: false,
                getSlidesListOk:       true,
                items: [
                    ...state.items,
                    ...items
                ],
                hasMore
            }
        }
        case GET_SLIDES_LIST_ERROR:
            return {
                ...state,
                getSlidesListFetching: false,
                getSlidesListError:    true
            }


        case DELETE_SLIDE_FETCHING:
            return { ...state, deleteSlideFetching: true }
        case DELETE_SLIDE_OK: {
            const { id } = data

            return {
                ...state,
                deleteSlideFetching: false,
                deleteSlideOk:       true,
                items: state.items.filter(item => item.id != id)
            }
        }
        case DELETE_SLIDE_ERROR:
            return {
                ...state,
                deleteSlideFetching: false,
                deleteSlideError:    true
            }


        case CLEAR_SLIDES_LIST:
            return {
                ...state,
                items: [],
                hasMore: false
            }


        case ADD_SLIDES_LIST_FETCHING:
            return { ...state, addSlidesListFetching: true }
        case ADD_SLIDES_LIST_OK: {
            const { items } = data

            return {
                ...state,
                addSlidesListFetching: false,
                addSlidesListOk:       true,
                items: [
                    ...items,
                    ...state.items
                ]
            }
        }
        case ADD_SLIDES_LIST_ERROR:
            return {
                ...state,
                addSlidesListFetching: false,
                addSlidesListError:    true
            }


        default:
            return state
    }
}
