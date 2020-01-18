import {
    GET_SLIDES_LIST_FETCHING,
    GET_SLIDES_LIST_OK,
    GET_SLIDES_LIST_ERROR
} from '../constants/action-types'
import initialState from '../../../common/redux/slides-list'

export default function slidesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_SLIDES_LIST_FETCHING:
            return { ...state, getSlidesListFetching: true }
        case GET_SLIDES_LIST_OK: {
            const { items } = data

            return {
                ...state,
                getSlidesListFetching: false,
                getSldiesListOk:       true,
                items
            }
        }
        case GET_SLIDES_LIST_ERROR:
            return {
                ...state,
                getSlidesListFetching: false,
                getSlidesListError:    true
            }


        default:
            return state
    }
}
