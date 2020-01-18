import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

function WithAuthorization(props) {
    const {
        signed,
        signedFetching,
        signedOk,
        signedError
    } = useSelector(state => state.sign)
    const { component: Component } = props

    if ((signedOk || signedError) && !signed) {
        return <Redirect to="/signin" />
    }

    if ((signedOk || signedError) && signed) {
        return <Component { ...props } />
    }

    return ''
}

WithAuthorization.propTypes = {
    component: PropTypes.elementType.isRequired
}

export default WithAuthorization
