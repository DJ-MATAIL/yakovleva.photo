import { GET } from '../../common/lib/http'
import {
    GET_SECTION_IMAGES_LIST_FETCHING,
    GET_SECTION_IMAGES_LIST_OK,
    GET_SECTION_IMAGES_LIST_ERROR,

    CLEAR_SECTION_IMAGES_LIST
} from '../constants/action-types'

const getSectionImagesListFetching = ()   => ({ type: GET_SECTION_IMAGES_LIST_FETCHING })
const getSectionImagesListOk       = data => ({ type: GET_SECTION_IMAGES_LIST_OK, data })
const getSectionImagesListError    = data => ({ type: GET_SECTION_IMAGES_LIST_ERROR, data })

export function getSectionImagesList(data, first = false) {
    return async (dispatch, getState) => {
        if (first) {
            const state = getState()
            
            if (state.sectionImagesList.items.length > 0) {
                return
            }
        }

        try {
            dispatch(getSectionImagesListFetching())

            const response = await GET('/api/public/section-images/' + (data.section_id ? data.section_id : ''), { offset: data.offset })

            dispatch(getSectionImagesListOk(response))
        } catch(err) {
            dispatch(getSectionImagesListError(err))
        }
    }
}


export const clearSectionImagesList = () => ({ type: CLEAR_SECTION_IMAGES_LIST })
