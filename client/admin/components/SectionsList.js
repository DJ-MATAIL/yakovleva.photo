import React, { useState, useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getSectionsList as getSectionsListAction,
    deleteSection   as deleteSectionAction
} from '../actions/sections-list'
import {
    showModalSection           as showModalSectionAction,
    showModalSectionImagesList as showModalSectionImagesListAction
} from '../actions/layers'
import '../styles/SectionsList.styl'

import SectionImagesList from './SectionImagesList'

export default function SectionsList() {
    const dispatch = useDispatch()
    const getSectionsList            = ()   => dispatch(getSectionsListAction())
    const deleteSection              = data => dispatch(deleteSectionAction(data))
    const showModalSection           = data => dispatch(showModalSectionAction(data))
    const showModalSectionImagesList = data => dispatch(showModalSectionImagesListAction(data))

    const sectionsList = useSelector(state => state.sectionsList.items)

    const [ sectionValue, setSectionValue ] = useState(0)

    useEffect(() => {
        getSectionsList()
    }, [])

    function onSectionChange(event) {
        setSectionValue(event.target.value)
    }

    function getCurrentSection() {
        for (let section of sectionsList) {
            if (section.id == sectionValue) {
                return section
            }
        }
    }

    function onDeleteSection() {
        // TODO: переписать, используя пользовательский диалог
        // т.к. системный подвисает страницу
        const isAgree = confirm('Вы уверены, что хотите удалить раздел?')

        if (!isAgree) {
            return
        }

        deleteSection({ id: parseInt(sectionValue) })
    }

    return (
        <div className="sections-list">
            <h3>Разделы</h3>
            <header className="flex flex-between flex-middle">
                <div className="flex flex-middle">
                    <select
                        value={ sectionValue }
                        onChange={ onSectionChange }
                    >
                        <option value="0" disabled>Выберите</option>
                        { sectionsList.map(item => (
                            <SectionListOption
                                key={ item.id }
                                value={ item.id }
                                setValue={ setSectionValue }
                            >{ item.name }</SectionListOption>
                        )) }
                    </select>
                    { sectionValue != 0 && <Fragment>
                        <button onClick={ () => showModalSection(getCurrentSection()) }>Изменить</button>
                        <button onClick={ () => onDeleteSection() } style={{ marginLeft: '.5rem' }}>Удалить</button>
                    </Fragment> }
                </div>
                <div className="flex flex-middle">
                    { sectionValue != 0 && <button onClick={ () => showModalSectionImagesList({ sectionId: sectionValue }) }>Добавить изображение</button> }
                    <button onClick={ () => showModalSection() }>Создать раздел</button>
                </div>
            </header>
            <SectionImagesList sectionId={ sectionValue } />
        </div>
    )
}

const SectionListOption = props => {
    const {
        value,
        children,
        setValue
    } = props

    useEffect(() => {
        return () => setValue(0)
    }, [])

    return <option value={ value }>{ children }</option>
}
