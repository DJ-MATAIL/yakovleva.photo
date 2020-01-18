export function getUnhiddenNotificationsList(state) {
    return state.notificationsList.items.filter(item => !item.hidden)
}
