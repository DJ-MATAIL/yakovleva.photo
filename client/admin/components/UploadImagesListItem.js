import React from 'react'
import PropTypes from 'prop-types'
import {
    getText as getStageText,
    getType as getStageType
} from '../utils/upload-stages'
import '../styles/UploadImagesListItem.styl'

import {
    TableRow,
    TableCell
} from './Table'

function UploadImagesListItem(props) {
    const {
        id,
        name,
        stage
    } = props

    const text = getStageText(stage)
    const type = getStageType(stage)

    return (
        <TableRow
            style={{ padding: '.5rem 1rem' }}
        >
            <TableCell>{ name }</TableCell>
            <TableCell>
                <span className={ 'upload-images-list-item--stage ' + type }>{ text }</span>
            </TableCell>
        </TableRow>
    )
}

UploadImagesListItem.propTypes = {
    id:    PropTypes.number.isRequired,
    name:  PropTypes.string.isRequired,
    stage: PropTypes.number.isRequired
}

export default UploadImagesListItem
