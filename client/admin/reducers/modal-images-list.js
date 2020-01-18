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
const initialState = {
	getModalSectionImagesListFetching: false,
	getModalSectionImagesListOk:       false,
	getModalSectionImagesListError:    false,

	getModalSlidesListFetching: false,
	getModalSlidesListOk:       false,
	getModalSlidesListError:    false,

	items:   [],
	hasMore: false
}

export default function modalImagesList(state = initialState, action) {
	const { type, data } = action

	switch(type) {
		case GET_MODAL_SECTION_IMAGES_LIST_FETCHING:
			return { ...state, getModalSectionImagesListFetching: true }
		case GET_MODAL_SECTION_IMAGES_LIST_OK: {
			const { items, hasMore } = data

			return {
				...state,
				getModalSectionImagesListFetching: false,
				getModalSectionImagesListOk:       true,
				items: [
					...state.items,
					...items
				],
				hasMore
			}
		}
		case GET_MODAL_SECTION_IMAGES_LIST_ERROR:
			return {
				...state,
				getModalSectionImagesListFetching: false,
				getModalSectionImagesListError:    true
			}


		case GET_MODAL_SLIDES_LIST_FETCHING:
			return { ...state, getModalSlidesListFetching: true }
		case GET_MODAL_SLIDES_LIST_OK: {
			const { items, hasMore } = data

			return {
				...state,
				getModalSlidesListFetching: false,
				getModalSlidesListOk:       true,
				items: [
					...state.items,
					...items
				],
				hasMore
			}
		}
		case GET_MODAL_SLIDES_LIST_ERROR:
			return {
				...state,
				getModalSlidesListFetching: false,
				getModalSlidesListError:    true
			}


		case CLEAR_MODAL_IMAGES_LIST:
			return {
				...state,
				items: []
			}


		case SELECT_MODAL_IMAGE: {
			const { id } = data

			return {
				...state,
				items: state.items.map(item => {
					if (item.id == id) {
						item.selected = true
					}

					return item
				})
			}
		}
		case UNSELECT_MODAL_IMAGE: {
			const { id } = data

			return {
				...state,
				items: state.items.map(item => {
					if (item.id == id) {
						item.selected = false
					}

					return item
				})
			}
		}


		default:
			return state
	}
}
