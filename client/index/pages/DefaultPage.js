import React, { useEffect } from 'react'
import pages from '../../../common/constants/pages'

import BasePage from '../components/BasePage'

export default function DefaultPage() {
	useEffect(() => {
        document.title = pages.DEFAULT_PAGE
    }, [])

    return (
        <BasePage>
			<h1
				style={{
					padding:    '1rem',
					fontSize:   '2rem',
					fontWeight: 'bold',
					color:      '#fff'
				}}
			>Такой страницы не существует!</h1>
		</BasePage>
    )
}
