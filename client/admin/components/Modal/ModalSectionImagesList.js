import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
	getModalSectionImagesList as getModalSectionImagesListAction,
	clearModalImagesList      as clearModalImagesListAction,
	selectModalImage          as selectModalImageAction,
	unselectModalImage        as unselectModalImageAction
} from '../../actions/modal-images-list'
import { hideModalSectionImagesList as hideModalSectionImagesListAction } from '../../actions/layers'
import Gallery from 'react-photo-gallery'
import '../../styles/ModalSectionImagesList.styl'
import { addSectionImagesList as addSectionImagesListAction } from '../../actions/section-images-list'

import Modal from './Modal'

function ModalSectionImagesList() {
	const dispatch = useDispatch()
	const getModalSectionImagesList  = data => dispatch(getModalSectionImagesListAction(data))
	const clearModalImagesList       = ()   => dispatch(clearModalImagesListAction())
	const hideModalSectionImagesList = ()   => dispatch(hideModalSectionImagesListAction())
	const addSectionImagesList       = data => dispatch(addSectionImagesListAction(data))
	const {
		items: imagesList,
		hasMore,
		getModalSectionImagesListFetching
	} = useSelector(state => state.modalImagesList)
	const data = useSelector(state => state.layers.data.modalSectionImagesList)

	const [ offset, setOffset ] = useState(0)

	useEffect(() => {
		const sectionId = data.sectionId

		getModalSectionImagesList({
			offset,
			section_id: sectionId
		})

		return () => clearModalImagesList()
	}, [])

	function getMore() {
		const _offset = offset + 1
		setOffset(_offset)

		const sectionId = data.sectionId

		getModalSectionImagesList({
			offset:     _offset,
			section_id: sectionId
		})
	}

	function images2GalleryPhotos(arr) {
        return arr.map(item => item.mini)
    }

	function onSuccess() {
		const items = imagesList.filter(item => item.selected)
		                        .map(item => item.id)

		addSectionImagesList({ items, section_id: data.sectionId })
	}

	function onClose() {
		hideModalSectionImagesList()
	}

	const loading = getModalSectionImagesListFetching

	const title = 'Список изображений'
	const successButtonText = 'Выбрать'

	return (
		<Modal
			title={ title }
			successButtonText={ successButtonText }
			onSuccess={ onSuccess }
			onClose={ onClose }
		>
			<div className="modal-section-images-list">
				<Gallery
	                photos={ images2GalleryPhotos(imagesList) }
	                renderImage={ props => (
	                    <ModalSectionImagesListItem
	                        images={ imagesList }
	                        { ...props }
	                    />
	                ) }
	            />
				{ hasMore && <div className="modal-section-images-list--buttons flex flex-center">
                    <button className={ loading ? 'disable' : '' } onClick={ getMore }>{ loading ? 'Загрузка...' : 'Загрузить еще' }</button>
                </div> }
			</div>
		</Modal>
	)
}

function ModalSectionImagesListItem(props) {
	const dispatch = useDispatch()
	const selectModalImage   = data => dispatch(selectModalImageAction(data))
	const unselectModalImage = data => dispatch(unselectModalImageAction(data))

	const {
		index,
		photo,
		margin,
		images
	} = props
	const {
		src,
		width,
		height
	} = photo
	let currentImage = images[index]

	const { selected } = currentImage

	return (
		<div
			key={ index }
			className="modal-section-images-list-item"
			style={{
				width:  `${ width }px`,
				height: `${ height }px`,
				margin: `${ margin }px`
			}}
		>
			<img src={ src } />
			{ selected && <button className="absolute-100 selected" onClick={ () => unselectModalImage({ id: currentImage.id }) }>
				<svg viewBox="0 0 24 24">
					<path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" />
				</svg>
			</button> }
			{ !selected && <button className="absolute-100 unselected" onClick={ () => selectModalImage({ id: currentImage.id }) }>
				<svg viewBox="0 0 24 24">
					<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
				</svg>
			</button> }
		</div>
	)
}

ModalSectionImagesListItem.propTypes = {
	index:  PropTypes.number.isRequired,
    photo:  PropTypes.object.isRequired,
    margin: PropTypes.number.isRequired,
    images: PropTypes.array.isRequired
}


export default ModalSectionImagesList
