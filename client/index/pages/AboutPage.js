import React, { useEffect } from 'react'
import pages from '../../../common/constants/pages'

import BasePage from '../components/BasePage'
import About    from '../components/About'

export default function AboutPage() {
    useEffect(() => {
        document.title = pages.ABOUT_PAGE
    }, [])

    return (
        <BasePage>
            <About />
        </BasePage>
    )
}
