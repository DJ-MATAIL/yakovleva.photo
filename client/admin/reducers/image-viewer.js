import {
    ADD_IMAGES_TO_IMAGE_VIEWER_IMAGES_LIST,
    CLEAR_IMAGES_FROM_IMAGE_VIEWER_IMAGES_LIST,
    SET_CURRENT_IMAGE_OF_IMAGE_VIEWER
} from '../constants/action-types'

const initialState = {
    items: []
}

export default function viewer(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case ADD_IMAGES_TO_IMAGE_VIEWER_IMAGES_LIST:
            return {
                ...state,
                items: data
            }
        case CLEAR_IMAGES_FROM_IMAGE_VIEWER_IMAGES_LIST:
            return {
                ...state,
                items: []
            }
        case SET_CURRENT_IMAGE_OF_IMAGE_VIEWER: {
            const { id } = data

            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id == id) {
                        item.current = true
                    } else {
                        item.current = false
                    }

                    return item
                })
            }
        }


        default:
            return state
    }
}
