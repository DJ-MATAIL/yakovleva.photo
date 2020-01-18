import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideUploadImagesList as hideUploadImagesListAction } from '../actions/layers'
import '../styles/UploadImagesList.styl'

import {
    Table,
    TableRow,
    TableCell
} from './Table'
import UploadImagesListItem from './UploadImagesListItem'

export default function UploadImagesList() {
    const dispatch = useDispatch()
    const imagesList = useSelector(state => state.uploadImagesList.items)
    const hideUploadImagesList = () => dispatch(hideUploadImagesListAction())

    return (
        <div className="upload-images-list">
            <div className="upload-images-list--header flex flex-between">
                <h3>Список загрузок</h3>
                <button onClick={ hideUploadImagesList }>
                    <svg viewBox="0 0 24 24">
                        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                    </svg>
                </button>
            </div>
            <div className="upload-images-list--body">
                <Table>
                    <TableRow
                        style={{
                            padding:         '.5rem 1rem',
                            backgroundColor: '#1c1c1c'
                        }}
                    >
                        <TableCell>Имя</TableCell>
                        <TableCell>Статус</TableCell>
                    </TableRow>
                    { imagesList.map(item => (
                        <UploadImagesListItem
                            key={ item.id }
                            { ...item }
                        />
                    )) }
                </Table>
            </div>
        </div>
    )
}
