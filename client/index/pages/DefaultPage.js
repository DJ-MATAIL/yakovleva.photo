import React, { useEffect } from 'react'
import pages from '../../../common/constants/pages'

export default function DefaultPage() {
    useEffect(() => {
        document.title = pages.DEFAULT_PAGE
    }, [])

    return (
        <h1>Default Page</h1>
    )
}
