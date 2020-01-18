import initialState from '../../../common/redux/sections-list'

export default function sectionsList(state = initialState, action) {
    const { type, data } = action

    switch(type) {
        default:
            return state
    }
}
