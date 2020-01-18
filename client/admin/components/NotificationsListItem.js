import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { hideNotification as hideNotificationAction } from '../actions/notifications-list'
import { NOTIFICATION_TIMEOUT } from '../constants/notification'
import '../styles/NotificationsListItem.styl'

function NotificationsListItem(props) {
    const dispatch = useDispatch()
    const hideNotification = data => dispatch(hideNotificationAction(data))

    const [ timerId, setTimerId ] = useState(null)

    const {
        id,
        message,
        autoClose
    } = props

    useEffect(() => {
        if (!autoClose) {
            return
        }

        setTimerId(setTimeout(() => {
            hideNotification({ id })
        }, NOTIFICATION_TIMEOUT))
    }, [])

    function hide() {
        if (autoClose) {
            setTimerId(clearTimeout(timerId))
        }

        hideNotification({ id })
    }

    return (
        <div className="notifications-list-item flex">
            <div>{ message }</div>
            { !autoClose && <button className="flex flex-middle flex-center" onClick={ hide }>
                <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                </svg>
            </button> }
        </div>
    )
}

NotificationsListItem.propTypes = {
    id:        PropTypes.number.isRequired,
    message:   PropTypes.string.isRequired,
    autoClose: PropTypes.bool.isRequired
}

NotificationsListItem.defaultProps = {
    autoClose: true
}

export default NotificationsListItem
