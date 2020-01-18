export function getSectionById(state, sectionId) {
    const sections = state.sectionsList.items
    let sec = null

    for (let section of sections) {
        if (section.id == sectionId) {
            sec = section
            break
        }
    }

    return sec
}
