import { POST } from '../../common/lib/http'
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

const signInFetching = ()   => ({ type: SIGN_IN_FETCHING })
const signInOk       = data => ({ type: SIGN_IN_OK, data })
const signInError    = data => ({ type: SIGN_IN_ERROR, data })

export function signIn(data) {
    return async dispatch => {
        try {
            dispatch(signInFetching())

            const response = await POST('/api/signin', data)

            dispatch(signInOk(response))
        } catch(err) {
            dispatch(signInError(err))
        }
    }
}


const signOutFetching = ()   => ({ type: SIGN_OUT_FETCHING })
const signOutOk       = data => ({ type: SIGN_OUT_OK, data })
const signOutError    = data => ({ type: SIGN_OUT_ERROR, data })

export function signOut() {
    return async dispatch => {
        try {
            dispatch(signOutFetching())

            const response = await POST('/api/signout')

            dispatch(signOutOk(response))
        } catch(err) {
            dispatch(signOutError(err))
        }
    }
}


const signedFetching = ()   => ({ type: SIGNED_FETCHING })
const signedOk       = data => ({ type: SIGNED_OK, data })
const signedError    = data => ({ type: SIGNED_ERROR, data })

export function signed() {
    return async dispatch => {
        try {
            dispatch(signedFetching())

            const response = await POST('/api/signed')

            dispatch(signedOk(response))
        } catch(err) {
            dispatch(signedError(err))
        }
    }
}