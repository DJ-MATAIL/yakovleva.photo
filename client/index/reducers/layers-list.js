import {
    SHOW_IMAGE_VIEWER,
    HIDE_IMAGE_VIEWER,

    SHOW_MENU,
    HIDE_MENU
} from '../constants/action-types'
import initialState from '../../../common/redux/layers-list'

export default function layersList(state = initialState, action) {
    const { type } = action

    switch(type) {
        case SHOW_IMAGE_VIEWER:
            return { ...state, imageViewerHidden: false }
        case HIDE_IMAGE_VIEWER:
            return { ...state, imageViewerHidden: true }
        case SHOW_MENU:
            return { ...state, menuHidden: false }
        case HIDE_MENU:
            return { ...state, menuHidden: true }
        default:
            return state
    }
}
