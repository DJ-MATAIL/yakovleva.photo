import React, {
	useState,
	useEffect,
	Fragment
} from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useMatomo } from '../hooks/matomo'

function Provider(props) {
	const location = useLocation()
	const [ currentUrl, setCurrentUrl ] = useState('')
	const {
		setUrl,
		setReferrerUrl,
		setTitle,
		setGenerationTime,
		viewPage
	} = useMatomo()
	const { children } = props

	useEffect(() => {
		const url = location.pathname

		if (location.search) {
			url += location.search
		}

		if (location.hash) {
			url += location.hash
		}

		if (currentUrl == '') {
			return setCurrentUrl(url)
		}

		setReferrerUrl(currentUrl)
		setUrl(url)
		setTitle(document.title)
		setGenerationTime(0)
		viewPage()

		setCurrentUrl(url)
	}, [ location ])

	return <Fragment>{ children }</Fragment>
}

Provider.propTypes = {
	children: PropTypes.node
}

export { Provider }