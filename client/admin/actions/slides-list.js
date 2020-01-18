import { GET, DELETE, POST } from '../../common/lib/http'
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
import { addNotification } from './notifications-list'
import { hideModalSlidesList } from './layers'


const getSlidesListFetching = ()   => ({ type: GET_SLIDES_LIST_FETCHING })
const getSlidesListOk       = data => ({ type: GET_SLIDES_LIST_OK, data })
const getSlidesListError    = data => ({ type: GET_SLIDES_LIST_ERROR, data })

export function getSlidesList(data) {
    return async dispatch => {
        try {
            dispatch(getSlidesListFetching())

            const response = await GET('/api/slides/', data)

            dispatch(getSlidesListOk(response))
        } catch(err) {
            dispatch(getSlidesListError(err))
        }
    }
}


const deleteSlideFetching = ()   => ({ type: DELETE_SLIDE_FETCHING })
const deleteSlideOk       = data => ({ type: DELETE_SLIDE_OK, data })
const deleteSlideError    = data => ({ type: DELETE_SLIDE_ERROR, data })

export function deleteSlide(data) {
    return async dispatch => {
        try {
            dispatch(deleteSlideFetching())

            const response = await DELETE('/api/slides/' + data.id)

            dispatch(deleteSlideOk(response))
        } catch(err) {
            dispatch(deleteSlideError(err))
        }
    }
}


export const clearSlidesList = () => ({ type: CLEAR_SLIDES_LIST })


const addSlidesListFetching = ()   => ({ type: ADD_SLIDES_LIST_FETCHING })
const addSlidesListOk       = data => ({ type: ADD_SLIDES_LIST_OK, data })
const addSlidesListError    = data => ({ type: ADD_SLIDES_LIST_ERROR, data })

export function addSlidesList(data) {
    return async dispatch => {
        try {
            dispatch(addSlidesListFetching())

            const response = await POST('/api/slides/', data)

            dispatch(hideModalSlidesList())
            dispatch(addNotification({ message: 'Слайды были добавлены!' }))
            dispatch(addSlidesListOk(response))
        } catch(err) {
            dispatch(addSlidesListError(err))
        }
    }
}
