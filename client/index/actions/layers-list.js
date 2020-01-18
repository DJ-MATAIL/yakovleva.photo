import {
    SHOW_IMAGE_VIEWER,
    HIDE_IMAGE_VIEWER,

    SHOW_MENU,
    HIDE_MENU
} from '../constants/action-types'

export const showImageViewer = () => ({ type: SHOW_IMAGE_VIEWER })
export const hideImageViewer = () => ({ type: HIDE_IMAGE_VIEWER })

export const showMenu = () => ({ type: SHOW_MENU })
export const hideMenu = () => ({ type: HIDE_MENU })
