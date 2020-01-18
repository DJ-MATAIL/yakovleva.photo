import {
    ADD_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../constants/action-types'

export const addNotification  = data => ({ type: ADD_NOTIFICATION, data })
export const hideNotification = data => ({ type: HIDE_NOTIFICATION, data })
