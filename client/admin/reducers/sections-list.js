import deepClone from 'lodash.clonedeep'
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

const initialState = {
    getSectionsListFetching: false,
    getSectionsListOk:       false,
    getSectionsListError:    false,

    addSectionFetching: false,
    addSectionOk:       false,
    addSectionError:    false,

    editSectionFetching: false,
    editSectionOk:       false,
    editSectionError:    false,

    deleteSectionFetching: false,
    deleteSectionOk:       false,
    deleteSectionError:    false,

    items: []
}

export default function sectionsList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_SECTIONS_LIST_FETCHING:
            return { ...state, getSectionsListFetching: true }
        case GET_SECTIONS_LIST_OK: {
            return {
                ...state,
                getSectionsListFetching: false,
                getSectionsListOk:       true,
                items: data
            }
        }
        case GET_SECTIONS_LIST_ERROR:
            return {
                ...state,
                getSectionsListFetching: false,
                getSectionsListError:    true
            }


        case ADD_SECTION_FETCHING:
            return { ...state, addSectionFetching: true }
        case ADD_SECTION_OK:
            return {
                ...state,
                addSectionFetching: false,
                addSectionOk:       true,
                items: [
                    data,
                    ...state.items
                ]
            }
        case ADD_SECTION_ERROR:
            return {
                ...state,
                addSectionFetching: false,
                addSectionError:    true
            }


        case EDIT_SECTION_FETCHING:
            return { ...state, editSectionFetching: true }
        case EDIT_SECTION_OK: {
            const { id } = data

            return {
                ...state,
                editSectionFetching: false,
                editSectionOk:       true,
                items: state.items.map(item => {
                    if (item.id == id) {
                        item = data
                    }

                    return item
                })
            }
        }
        case EDIT_SECTION_ERROR:
            return {
                ...state,
                editSectionFetching: false,
                editSectionError:    true
            }


        case DELETE_SECTION_FETCHING:
            return { ...state, deleteSectionFetching: true }
        case DELETE_SECTION_OK: {
            const { id } = data

            return {
                ...state,
                deleteSectionFetching: false,
                deleteSectionOk:       true,
                items: state.items.filter(item => item.id != id)
            }
        }
        case DELETE_SECTION_ERROR:
            return {
                ...state,
                deleteSectionFetching: false,
                deleteSectionError:    true
            }


        default:
            return state
    }
}
