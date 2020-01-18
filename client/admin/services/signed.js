import { signed as signedAction } from '../actions/sign'

export default function signed(store) {
	store.dispatch(signedAction())
}