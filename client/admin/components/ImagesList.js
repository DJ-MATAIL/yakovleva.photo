import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getImagesList            as getImagesListAction,
    clearImageFromImagesList as clearImageFromImagesListAction
} from '../actions/images-list'
import Gallery from 'react-photo-gallery'
import '../styles/ImagesList.styl'

import ImagesListItem from './ImagesListItem'

export default function ImagesList() {
    const dispatch = useDispatch()
    const {
        items: imagesList,
        hasMore,
        getImagesListFetching
    } = useSelector(state => state.imagesList)
    const getImagesList            = data => dispatch(getImagesListAction(data))
    const clearImageFromImagesList = ()   => dispatch(clearImageFromImagesListAction())

    const [ offset, setOffset ] = useState(0)

    useEffect(() => {
        getImagesList({ offset })

        return () => clearImageFromImagesList()
    }, [])

    function getMore() {
        const _offset = offset + 1

        getImagesList({ offset: _offset })
        setOffset(_offset)
    }

    function images2GalleryPhotos(arr) {
        return arr.map(item => {
            return item.mini
        })
    }

    const loading = getImagesListFetching

    return (
        <div className="images-list">
            <Gallery
                photos={ images2GalleryPhotos(imagesList) }
                renderImage={ props => (
                    <ImagesListItem
                        images={ imagesList }
                        { ...props }
                    />
                ) }
            />
            { hasMore && <div className="images-list--buttons flex flex-center">
                <button className={ loading ? 'disable' : '' } onClick={ getMore }>{ loading ? 'Загрузка...' : 'Загрузить еще' }</button>
            </div> }
        </div>
    )
}
