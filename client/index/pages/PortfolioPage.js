import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSectionById } from '../selectors/sections-list'
import { Redirect, useParams } from 'react-router-dom'
import pages from '../../../common/constants/pages'

import BasePage          from '../components/BasePage'
import SectionImagesList from '../components/SectionImagesList'

export default function PortfolioPage() {
    const { sectionId } = useParams()
    const section = useSelector(state => getSectionById(state, sectionId))

    useEffect(() => {
        let title = pages.PORTFOLIO_PAGE

        if (sectionId && section) {
            title = section.name
        }

        document.title = title
    }, [ sectionId ])

    if (sectionId && !section) {
        return <Redirect to="/portfolio" />
    }

    return (
        <BasePage>
            <SectionImagesList />
        </BasePage>
    )
}
