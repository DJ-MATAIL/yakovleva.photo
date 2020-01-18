import { GET } from '../../common/lib/http'
import {
	GET_MODAL_SECTION_IMAGES_LIST_FETCHING,
	GET_MODAL_SECTION_IMAGES_LIST_OK,
	GET_MODAL_SECTION_IMAGES_LIST_ERROR,

	GET_MODAL_SLIDES_LIST_FETCHING,
	GET_MODAL_SLIDES_LIST_OK,
	GET_MODAL_SLIDES_LIST_ERROR,

	CLEAR_MODAL_IMAGES_LIST,

	SELECT_MODAL_IMAGE,
	UNSELECT_MODAL_IMAGE
} from '../constants/action-types'


const getModalSectionImagesListFetching = ()   => ({ type: GET_MODAL_SECTION_IMAGES_LIST_FETCHING })
const getModalSectionImagesListOk       = data => ({ type: GET_MODAL_SECTION_IMAGES_LIST_OK, data })
const getModalSectionImagesListError    = data => ({ type: GET_MODAL_SECTION_IMAGES_LIST_ERROR, data })

export function getModalSectionImagesList(data) {
	return async dispatch => {
		try {
			dispatch(getModalSectionImagesListFetching())

			const response = await GET('/api/images/by_section/', data)

			dispatch(getModalSectionImagesListOk(response))
		}
		catch(err) {
			dispatch(getModalSectionImagesListError(err))
		}
	}
}


const getModalSlidesListFetching = ()   => ({ type: GET_MODAL_SLIDES_LIST_FETCHING })
const getModalSlidesListOk       = data => ({ type: GET_MODAL_SLIDES_LIST_OK, data })
const getModalSlidesListError    = data => ({ type: GET_MODAL_SLIDES_LIST_ERROR, data })

export function getModalSlidesList(data) {
	return async dispatch => {
		try {
			dispatch(getModalSlidesListFetching())

			const response = await GET('/api/images/by_slides/', data)

			dispatch(getModalSlidesListOk(response))
		} catch(err) {
			dispatch(getModalSlidesListError(err))
		}
	}
}


export const clearModalImagesList = () => ({ type: CLEAR_MODAL_IMAGES_LIST })


export const selectModalImage   = data => ({ type: SELECT_MODAL_IMAGE, data })
export const unselectModalImage = data => ({ type: UNSELECT_MODAL_IMAGE, data })
