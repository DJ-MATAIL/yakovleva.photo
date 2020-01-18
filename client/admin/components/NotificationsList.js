import React from 'react'
import { useSelector } from 'react-redux'
import { getUnhiddenNotificationsList } from '../selectors/notifications-list'
import '../styles/NotificationsList.styl'

import NotificationsListItem from './NotificationsListItem'

export default function NotificationsList() {
    const notificationsList = useSelector(getUnhiddenNotificationsList)

    return (
        <div className="notifications-list">
            { notificationsList.map(item => (
                <NotificationsListItem
                    key={ item.id }
                    { ...item }
                />
            )) }
        </div>
    )
}
