import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
    getSectionImagesList as getSectionImagesListAction,
    clearSectionImagesList as clearSectionImagesListAction
} from '../actions/section-images-list'
import Gallery from 'react-photo-gallery'
import '../styles/SectionImagesList.styl'

import SectionImagesListItem from './SectionImagesListItem'

function SectionImagesList(props) {
    const dispatch = useDispatch()
    const getSectionImagesList = data => dispatch(getSectionImagesListAction(data))
    const clearSectionImagesList = () => dispatch(clearSectionImagesListAction())
    const {
        items: imagesList,
        hasMore,
        getSectionImagesListFetching
    } = useSelector(state => state.sectionImagesList)

    const [ offset, setOffset ] = useState(0)

    const { sectionId } = props

    useEffect(() => {
        return () => clearSectionImagesList()
    }, [])

    useEffect(() => {
        if (sectionId == 0) {
            return
        }

        clearSectionImagesList()
        setOffset(0)

        getSectionImagesList({
            sectionId: parseInt(sectionId),
            offset:    0
        })
    }, [ sectionId ])

    function loadMore() {
        const _offset = offset + 1

        setOffset(_offset)
        getSectionImagesList({
            sectionId: parseInt(sectionId),
            offset:    _offset
        })
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
                renderImage={ props => (
                    <SectionImagesListItem
                        images={ imagesList }
                        { ...props }
                    />
                ) }
            />
            { hasMore && <div className="section-images-list--buttons flex flex-center">
                <button className={ loading ? 'disable' : '' } onClick={ loadMore }>{ loading ? 'Загрузка...' : 'Загрузить еще' }</button>
            </div> }
        </div>
    )
}

SectionImagesList.propTypes = {
    sectionId: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ])
}

export default SectionImagesList
