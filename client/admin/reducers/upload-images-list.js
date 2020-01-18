import {
    ADD_UPLOAD_IMAGE_TO_UPLOAD_IMAGES_LIST,

    SET_UPLOAD_IMAGE_STAGE
} from '../constants/action-types'

const initialState = {
    items: []
}

export default function uploadImagesList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case ADD_UPLOAD_IMAGE_TO_UPLOAD_IMAGES_LIST:
            return {
                ...state,
                items: [
                    ...state.items,
                    ...data
                ]
            }
        case SET_UPLOAD_IMAGE_STAGE: {
            const { id, stage } = data

            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id == id) {
                        item.stage = stage
                    }

                    return item
                })
            }
        }


        default:
            return state
    }
}
