import React, { useRef, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    addUploadImageToUploadImagesList as addUploadImageToUploadImagesListAction,
    setUploadImageStage as setUploadImageStageAction
} from '../actions/upload-images-list'
import { showUploadImagesList as showUploadImagesListAction } from '../actions/layers'
import { addUploadImageToImagesList as addUploadImageToImagesListAction } from '../actions/images-list'
import { FILE } from '../../common/lib/http'
import { MAX_FILE_SIZE } from '../../../common/constants/limits'
import '../styles/ImageUploader.styl'

let uploadedImageId = 0

export default function ImageUploader() {
    const dispatch = useDispatch()

    const addUploadImageToUploadImagesList = data => dispatch(addUploadImageToUploadImagesListAction(data))
    const setUploadImageStage              = data => dispatch(setUploadImageStageAction(data))
    const showUploadImagesList             = ()   => dispatch(showUploadImagesListAction())
    const addUploadImageToImagesList       = data => dispatch(addUploadImageToImagesListAction(data))

    const ref = useRef()

    const [ filesList, setFilesList ] = useState([])
    const [ works, setWorks ]         = useState(false)

    useEffect(() => {
        if (filesList.length == 0) {
            return
        }

        if (works) {
            return
        }

        loop()
    }, [ filesList ])

    function onInputChange() {
        let files = []

        for (let i = 0; i < ref.current.files.length; i++) {
            const file = ref.current.files[i]

            files.push({
                id: uploadedImageId++,
                file
            })
        }

        const filesForState = files.filter(item =>
            isMimeTypeAllowed(item.file.type) &&
            isExtensionAllowed(item.file.name) &&
            isFileSizeAllowed(item.file.size)
        )

        setFilesList([
            ...filesList,
            ...filesForState
        ])

        const filesForRedux = files.map(item => {
            let stage = 1

            if (!isMimeTypeAllowed(item.file.type)) {
                stage = 4
            }

            if (!isExtensionAllowed(item.file.name)) {
                stage = 5
            }

            if (!isFileSizeAllowed(item.file.size)) {
                stage = 6
            }

            return {
                id:   item.id,
                name: item.file.name,
                size: item.file.size,
                type: item.file.type,
                stage
            }
        })

        addUploadImageToUploadImagesList(filesForRedux)
        showUploadImagesList()
    }

    function isMimeTypeAllowed(type) {
        return type == 'image/jpeg' || type == 'image/png'
    }

    function isExtensionAllowed(name) {
        return /^[\s\S]+(\.jpg|.jpeg|.png)$/.test(name)
    }

    function isFileSizeAllowed(size) {
        return size <= MAX_FILE_SIZE
    }

    async function loop() {
        setWorks(true)

        const currentFile = filesList[0]

        setUploadImageStage({
            id:    currentFile.id,
            stage: 2
        })

        let uploadedImage

        try {
            uploadedImage = await upload(currentFile.file)
        } catch(err) {
            setUploadImageStage({
                id:    currentFile.id,
                stage: 6
            })
            setWorks(false)
            setFilesList(filesList.slice(1))
            return
        }

        setUploadImageStage({
            id:    currentFile.id,
            stage: 3
        })
        addUploadImageToImagesList(uploadedImage)
        setWorks(false)
        setFilesList(filesList.slice(1))
    }

    function upload(file) {
        return FILE('/api/upload', file)
    }

    return (
        <div className="image-uploader">
            <h3>Загрузка изображений</h3>
            <label>
                <span>Выбрать файлы для загрузки</span>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    hidden
                    ref={ ref }
                    onChange={ onInputChange }
                />
            </label>
        </div>
    )
}
