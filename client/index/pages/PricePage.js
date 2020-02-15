import React, { useEffect } from 'react'
import pages from '../../../common/constants/pages'

import BasePage from '../components/BasePage'
import Price    from '../components/Price'

export default function PricePage() {
	useEffect(() => {
        document.title = pages.PRICE_PAGE
    }, [])

    return (
        <BasePage>
            <Price />
        </BasePage>
    )
}
