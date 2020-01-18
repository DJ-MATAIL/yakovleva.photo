import {
    ADD_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../constants/action-types'

let notificationId = 0

const initialState = {
    items: []
}

export default function notificationList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case ADD_NOTIFICATION: {
            const { message } = data

            return {
                ...state,
                items: [
                    { id: notificationId++, message },
                    ...state.items
                ]
            }
        }
        case HIDE_NOTIFICATION: {
            const { id } = data

            return {
                ...state,
                items: state.items.map(item => {
                    if (item.id == id) {
                        item.hidden = true
                    }

                    return item
                })
            }
        }


        default:
            return state
    }
}
