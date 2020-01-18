import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/Modal.styl'

function Modal(props) {
    const {
        // заголовок окна
        title,
        // функция в случае отмены или закрытия
        onClose,
        // функция в случае успеха
        onSuccess,
        // текст на кнопке для отмены
        closeButtonText,
        // текст на кнопке в случае успеха
        successButtonText,
        // дочерние элементы
        children
    } = props

    function onClickOut(event) {
        event.stopPropagation()
        const target = event.target

        if (target.className == 'modal' || target.className == 'modal--space') {
            onClose()
        }
    }

    return (
        <div className="modal" onClick={ onClickOut }>
            <div className="modal--space">
                <div className="modal--container">
                    <header className="modal--header flex flex-between flex-middle">
                        <h3>{ title }</h3>
                        <button onClick={ onClose }>
                            <svg viewBox="0 0 24 24">
                                <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                            </svg>
                        </button>
                    </header>
                    <div className="modal--body">{ children }</div>
                    <footer className="modal--footer flex flex-between">
                        <button onClick={ onClose }>{ closeButtonText }</button>
                        <button onClick={ onSuccess }>{ successButtonText }</button>
                    </footer>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    title:             PropTypes.string.isRequired,
    onClose:           PropTypes.func.isRequired,
    onSuccess:         PropTypes.func.isRequired,
    closeButtonText:   PropTypes.string,
    successButtonText: PropTypes.string,
    children:          PropTypes.node
}

Modal.defaultProps = {
    closeButtonText:   'Отмена',
    successButtonText: 'OK'
}

export default Modal
