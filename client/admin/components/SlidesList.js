import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getSlidesList   as getSlidesListAction,
    clearSlidesList as clearSlidesListAction
} from '../actions/slides-list'
import { showModalSlidesList as showModalSlidesListAction } from '../actions/layers'
import Gallery from 'react-photo-gallery'
import '../styles/SlidesList.styl'

import SlidesListItem from './SlidesListItem'

export default function SlidesList() {
    const dispatch = useDispatch()
    const getSlidesList       = data => dispatch(getSlidesListAction(data))
    const clearSlidesList     = ()   => dispatch(clearSlidesListAction())
    const showModalSlidesList = ()   => dispatch(showModalSlidesListAction())
    const {
        items: slidesList,
        hasMore,
        getSlidesListFetching
    } = useSelector(state => state.slidesList)

    const [ offset, setOffset ] = useState(0)

    useEffect(() => {
        getSlidesList({ offset })

        return () => clearSlidesList()
    }, [])

    function getMore() {
        const nextValue = offset + 1
        getSlidesList({ offset: nextValue })
    }

    function images2GalleryPhotos(arr) {
        return arr.map(item => item.mini)
    }

    const loading = getSlidesListFetching

    return (
        <div className="slides-list">
            <header className="slides-list--header">
                <button style={{ marginLeft: 0 }} onClick={ () => showModalSlidesList() }>Добавить новый слайд</button>
            </header>
            <div className="slides-list--body">
                <Gallery
                    photos={ images2GalleryPhotos(slidesList) }
                    renderImage={ props => (
                        <SlidesListItem
                            images={ slidesList }
                            { ...props }
                        />
                    ) }
                />
                { hasMore && <div className="slides-list--buttons flex flex-center">
                    <button className={ loading ? 'disable' : '' } onClick={ getMore }>{ loading ? 'Загрузка...' : 'Загрузить еще' }</button>
                </div> }
            </div>
        </div>
    )
}
