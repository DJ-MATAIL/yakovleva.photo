import React, { useEffect, Fragment } from 'react'
import pages from '../../../common/constants/pages'

import Header     from '../components/Header'
import SlidesList from '../components/SlidesList'

export default function IndexPage() {
    useEffect(() => {
        document.title = pages.INDEX_PAGE
    }, [])

    return (
        <Fragment>
            <SlidesList />
            <Header />
        </Fragment>
    )
}
