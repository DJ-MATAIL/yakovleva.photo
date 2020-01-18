import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getSlidesList as getSlidesListAction } from '../actions/slides-list'
import { SLIDE_DURATION } from '../constants/slider'
import '../styles/SlidesList.styl'

import SlidesListItem from './SlidesListItem'

export default function SlidesList() {
    const dispatch = useDispatch()
    const getSlidesList = () => dispatch(getSlidesListAction())
    const slidesList = useSelector(state => state.slidesList.items)

    const [ currentIndex, setCurrentIndex ]           = useState(0)
    const [ firstSlideLoaded, setFirstSlideLoaded ]   = useState(false)
    const [ items, setItems ]                         = useState([])
    const [ loadedSlideIndex, setLoadedSlideIndex ]   = useState(0)
    const [ slideLoadWorks, setSlideLoadWorks ]       = useState(false)

    const timer = useRef(null)

    useEffect(() => {
        getSlidesList()

        return () => clearTimeout(timer.current)
    }, [])

    useEffect(() => {
        setItems(slidesList)
    }, [ slidesList ])

    useEffect(() => {
        if (items.length == 0) {
            return
        }

        if (slideLoadWorks) {
            return
        }

        setSlideLoadWorks(true)
        loadSlide()
    }, [ items ])

    useEffect(() => {
        if (items.length == 0) {
            return
        }

        loadSlide()
    }, [ loadedSlideIndex ])
    useEffect(() => {
        if (items.length == 0) {
            return
        }

        iterate()
    }, [ currentIndex ])

    function setItemLoaded() {
        setItems(items.map((item, index) => {
            if (index == loadedSlideIndex) {
                item.loaded = true
            }

            return item
        }))
    }

    function setItemUnloaded() {
        setItems(items.map((item, index) => {
            if (index == loadedSlideIndex) {
                item.unloaded = true
            }

            return item
        }))
    }

    function loadSlide() {
        if (!slideLoadWorks) {
            setSlideLoadWorks(true)
        }

        if (loadedSlideIndex >= items.length) {
            return
        }

        const currentItem = items[loadedSlideIndex]
        const img = new Image()

        img.src = currentItem.src
        img.onload = () => {
            if (!firstSlideLoaded) {
                setFirstSlideLoaded(true)
                iterate()
            }

            setItemLoaded()
            setLoadedSlideIndex(loadedSlideIndex + 1)
        }
    }

    function iterate() {
        const currentItem = items[currentIndex]
        const nextIndex   = getNextIndex()

        timer.current = setTimeout(() => {
            setCurrentIndex(nextIndex)
        }, SLIDE_DURATION)
    }

    function getNextIndex() {
        const nextValue = currentIndex + 1

        return nextValue < items.length
            ? nextValue
            : 0
    }

    return (
        <div className="slides-list">
            { items.map((item, index) => <SlidesListItem
                key={ item.id }
                visible={ currentIndex == index }
                { ...item }
            />) }
        </div>
    )
}
