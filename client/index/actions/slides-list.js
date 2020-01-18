import { GET } from '../../common/lib/http'
import {
    GET_SLIDES_LIST_FETCHING,
    GET_SLIDES_LIST_OK,
    GET_SLIDES_LIST_ERROR
} from '../constants/action-types'

const getSlidesListFetching = ()   => ({ type: GET_SLIDES_LIST_FETCHING })
const getSlidesListOk       = data => ({ type: GET_SLIDES_LIST_OK, data })
const getSlidesListError    = data => ({ type: GET_SLIDES_LIST_ERROR, data })

export function getSlidesList() {
    return async (dispatch, getState) => {
        const state = getState()

        if (state.slidesList.items.length > 0) {
            return
        }

        try {
            dispatch(getSlidesListFetching())

            const response = await GET('/api/public/slides/')

            dispatch(getSlidesListOk(response))
        } catch(err) {
            dispatch(getSlidesListError(err))
        }
    }
}
