import {
    ADD_IMAGES_LIST_TO_IMAGE_VIEWER,
    CLEAR_IMAGES_LIST_FROM_IMAGE_VIEWER,
    SET_CURRENT_IMAGE_OF_IMAGE_VIEWER
} from '../constants/action-types'
import initialState from '../../../common/redux/image-viewer'

export default function imageViewer(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case ADD_IMAGES_LIST_TO_IMAGE_VIEWER:
            return {
                ...state,
                items: [ ...data ]
            }
        case CLEAR_IMAGES_LIST_FROM_IMAGE_VIEWER:
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
