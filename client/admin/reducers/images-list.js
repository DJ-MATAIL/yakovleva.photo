import deepClone from 'lodash.clonedeep'
import {
    GET_IMAGES_LIST_FETCHING,
    GET_IMAGES_LIST_OK,
    GET_IMAGES_LIST_ERROR,

    DELETE_IMAGE_FETCHING,
    DELETE_IMAGE_OK,
    DELETE_IMAGE_ERROR,

    CLEAR_IMAGES_FROM_IMAGES_LIST,
    ADD_UPLOAD_IMAGE_TO_IMAGES_LIST
} from '../constants/action-types'

const initialState = {
    getImagesListFetching: false,
    getImagesListOk:       false,
    getImagesListError:    false,

    deleteImageFetching: false,
    deleteImageOk:       false,
    deleteImageError:    false,

    items: []
}

export default function imagesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case GET_IMAGES_LIST_FETCHING:
            return { ...state, getImagesListFetching: true }
        case GET_IMAGES_LIST_OK: {
            const { items, hasMore } = data
            let _items = deepClone(state.items)

            items.forEach(item => {
                for (let _item of _items) {
                    if (_item.id == item.id) {
                        break
                    }
                }

                _items.push(item)
            })

            return {
                ...state,
                getImagesListFetching: false,
                getImagesListOk:       true,
                items: _items,
                hasMore
            }
        }
        case GET_IMAGES_LIST_ERROR:
            return {
                ...state,
                getImagesListFetching: false,
                getImagesListError:    true
            }


        case DELETE_IMAGE_FETCHING:
            return { ...state, deleteImageFetching: true }
        case DELETE_IMAGE_OK: {
            const { id } = data

            return {
                ...state,
                deleteImageFetching: false,
                deleteImageOk:       true,
                items: state.items.filter(item => item.id != id)
            }
        }
        case DELETE_IMAGE_ERROR:
            return {
                ...state,
                deleteImageFetching: false,
                deleteImageError:    true
            }


        case CLEAR_IMAGES_FROM_IMAGES_LIST:
            return {
                ...state,
                items:   [],
                hasMore: false
            }
        case ADD_UPLOAD_IMAGE_TO_IMAGES_LIST:
            return {
                ...state,
                items: [
                    data,
                    ...state.items
                ]
            }


        default:
            return state
    }
}
