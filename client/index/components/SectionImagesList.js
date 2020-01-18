import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getSectionImagesList   as getSectionImagesListAction,
    clearSectionImagesList as clearSectionImagesListAction
} from '../actions/section-images-list'
import { useParams } from 'react-router-dom'
import Gallery from 'react-photo-gallery'
import '../styles/SectionImagesList.styl'

import SectionImagesListItem from './SectionImagesListItem'

export default function SectionImagesList() {
    const dispatch = useDispatch()
    const getSectionImagesList   = (data, first) => dispatch(getSectionImagesListAction(data, first))
    const clearSectionImagesList = ()            => dispatch(clearSectionImagesListAction())
    const {
        items: imagesList,
        hasMore,
        getSectionImagesListFetching
    } = useSelector(state => state.sectionImagesList)

    const { sectionId } = useParams()

    const [ offset, setOffset ] = useState(0)
    const [ inited, setInited ] = useState(false)

    useEffect(() => {
        return () => clearSectionImagesList()
    }, [])

    useEffect(() => {
        const data = { offset }

        if (sectionId) {
            data.section_id = sectionId
        }

        if (inited) {
            clearSectionImagesList()
        }

        getSectionImagesList(data, !inited)
        setInited(true)
    }, [ sectionId ])

    function loadMore() {
        let data = {
            offset: offset + 1
        }

        if (sectionId) {
            data.section_id = sectionId
        }

        setOffset(offset + 1)
        getSectionImagesList(data)
    }

    function images2GalleryPhotos(arr) {
        return arr.map(item => {
            return item.mini
        })
    }

    const loading = getSectionImagesListFetching

    return (
        <div className="section-images-list">
            <Gallery
                photos={ images2GalleryPhotos(imagesList) }
                renderImage={ props => <SectionImagesListItem
                    images={ imagesList }
                    { ...props }
                /> }
            />
            { hasMore && <div className="section-images-list--buttons flex flex-center">
                <button className={ loading ? 'disable' : '' } onClick={ loadMore }>{ loading ? 'Загрузка...' : 'Загрузить еще' }</button>
            </div> }
        </div>
    )
}
