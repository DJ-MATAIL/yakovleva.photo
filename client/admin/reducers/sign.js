import {
    SIGN_IN_FETCHING,
    SIGN_IN_OK,
    SIGN_IN_ERROR,

    SIGN_OUT_FETCHING,
    SIGN_OUT_OK,
    SIGN_OUT_ERROR,

    SIGNED_FETCHING,
    SIGNED_OK,
    SIGNED_ERROR
} from '../constants/action-types'

const initialState = {
    signInFetching: false,
    signInOk:       false,
    signInError:    false,

    signOutFetching: false,
    signOutOk:       false,
    signOutError:    false,

    signedFetching: false,
    signedOk:       false,
    signedError:    false,

    // залогинен ли
    signed: false,
    // ошибка
    error: ''
}

export default function sign(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        case SIGN_IN_FETCHING:
            return { ...state, signInFetching: true, error: '' }
        case SIGN_IN_OK:
            return {
                ...state,
                signInFetching: false,
                signInOk:       true,
                signed:         true,
                error:          ''
            }
        case SIGN_IN_ERROR: {
            const { message } = data

            return {
                ...state,
                signInFetching: false,
                signInError:    true,
                error:          message
            }
        }


        case SIGN_OUT_FETCHING:
            return { ...state, signOutFetching: true }
        case SIGN_OUT_OK:
            return {
                ...state,
                signOutFetching: false,
                signOutOk:       true,
                signed:          false
            }
        case SIGN_OUT_ERROR:
            return {
                ...state,
                signOutFetching: false,
                signOutError:    true
            }


        case SIGNED_FETCHING:
            return {
                ...state,
                signedFetching: true,
                error:          ''
            }
        case SIGNED_OK:
            return {
                ...state,
                signedFetching: false,
                signedOk:       true,
                signed:         true,
                error:          ''
            }
        case SIGNED_ERROR: {
            const { message } = data

            return {
                ...state,
                signedFetching: false,
                signedError:    true
            }
        }


        default:
            return state
    }
}
