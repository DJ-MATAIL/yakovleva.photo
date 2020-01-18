import {
    GET,
    POST,
    PUT,
    DELETE
} from '../../common/lib/http'
import {
    GET_SECTIONS_LIST_FETCHING,
    GET_SECTIONS_LIST_OK,
    GET_SECTIONS_LIST_ERROR,

    ADD_SECTION_FETCHING,
    ADD_SECTION_OK,
    ADD_SECTION_ERROR,

    EDIT_SECTION_FETCHING,
    EDIT_SECTION_OK,
    EDIT_SECTION_ERROR,

    DELETE_SECTION_FETCHING,
    DELETE_SECTION_OK,
    DELETE_SECTION_ERROR
} from '../constants/action-types'
import { hideModalSection } from './layers'
import { addNotification } from './notifications-list'


const getSectionsListFetching = ()   => ({ type: GET_SECTIONS_LIST_FETCHING })
const getSectionsListOk       = data => ({ type: GET_SECTIONS_LIST_OK, data })
const getSectionsListError    = data => ({ type: GET_SECTIONS_LIST_ERROR, data })

export function getSectionsList() {
    return async (dispatch, getState) => {
        const state = getState()
        const items = state.sectionsList.items

        if (items.length > 0) {
            return
        }

        try {
            dispatch(getSectionsListFetching())

            const response = await GET('/api/sections/')

            dispatch(getSectionsListOk(response))
        } catch(err) {
            dispatch(getSectionsListError(err))
        }
    }
}


const addSectionFetching = ()   => ({ type: ADD_SECTION_FETCHING })
const addSectionOk       = data => ({ type: ADD_SECTION_OK, data })
const addSectionError    = data => ({ type: ADD_SECTION_ERROR, data })

export function addSection(data) {
    return async dispatch => {
        try {
            dispatch(addSectionFetching())

            const response = await POST('/api/sections/', { name: data.name })

            dispatch(addSectionOk(response))
            dispatch(addNotification({ message: 'Раздел был добавлен' }))
            dispatch(hideModalSection())
        } catch(err) {
            dispatch(addSectionError(err))
        }
    }
}


const editSectionFetching = ()   => ({ type: EDIT_SECTION_FETCHING })
const editSectionOk       = data => ({ type: EDIT_SECTION_OK, data })
const editSectionError    = data => ({ type: EDIT_SECTION_ERROR, data })

export function editSection(data) {
    return async dispatch => {
        try {
            dispatch(editSectionFetching())

            const response = await PUT('/api/sections/' + data.id, { name: data.name })

            dispatch(editSectionOk(response))
            dispatch(addNotification({ message: 'Раздел был изменен' }))
            dispatch(hideModalSection())
        } catch(err) {
            dispatch(editSectionError(err))
        }
    }
}


const deleteSectionFetching = ()   => ({ type: DELETE_SECTION_FETCHING })
const deleteSectionOk       = data => ({ type: DELETE_SECTION_OK, data })
const deleteSectionError    = data => ({ type: DELETE_SECTION_ERROR, data })

export function deleteSection(data) {
    return async dispatch => {
        try {
            dispatch(deleteSectionFetching())

            const response = await DELETE('/api/sections/' + data.id)

            dispatch(deleteSectionOk(response))
            dispatch(addNotification({ message: 'Раздел был удален' }))
        } catch(err) {
            dispatch(deleteSectionError(err))
        }
    }
}
