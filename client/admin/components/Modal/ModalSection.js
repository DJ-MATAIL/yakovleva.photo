import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModalSection as hideModalSectionAction } from '../../actions/layers'
import {
    editSection as editSectionAction,
    addSection  as addSectionAction
} from '../../actions/sections-list'
import '../../styles/ModalSection.styl'

import Modal from './Modal'

export default function ModalSection() {
    const dispatch = useDispatch()
    const hideModalSection = () => dispatch(hideModalSectionAction())
    const editSection = data => dispatch(editSectionAction(data))
    const addSection  = data => dispatch(addSectionAction(data))
    const data = useSelector(state => state.layers.data.modalSection)

    const [ title, setTitle ] = useState('')
    const [ buttonText, setButtonText ] = useState('')

    const [ id, setId ] = useState('')
    const [ sectionName, setSectionName ] = useState('')

    useEffect(() => {
        if (isEditableMode()) {
            const { name, id } = data

            setTitle('Редактирование раздела')
            setButtonText('Редактировать')
            setSectionName(name)
            setId(id)
            return
        }

        setTitle('Создание раздела')
        setButtonText('Создать')
    }, [])

    function isEditableMode() {
        return Object.keys(data).length > 0
    }

    function onSuccess() {
        if (isEditableMode()) {
            return editSection({
                id,
                name: sectionName
            })
        }

        addSection({ name: sectionName })
    }

    function onClose() {
        hideModalSection()
    }

    return (
        <Modal
            title={ title }
            onSuccess={ onSuccess }
            onClose={ onClose }
            successButtonText={ buttonText }
        >
            <div className="modal-section">
                <section>
                    <label>Имя</label>
                    <input
                        type="text"
                        value={ sectionName }
                        onChange={ event => setSectionName(event.target.value) }
                    />
                </section>
            </div>
        </Modal>
    )
}
