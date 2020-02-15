import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useParams } from 'react-router-dom'

function WithRouterParamsValidator(props) {
    const params = useParams()
    const {
        schema,
        component: Component
    } = props

    if (params.sectionId && !schema.sectionId.test(params.sectionId)) {
        return <Redirect to="/" />
    }

    return <Component { ...props } />
}

WithRouterParamsValidator.propTypes = {
    schema:    PropTypes.object.isRequired,
    component: PropTypes.elementType.isRequired
}

export default WithRouterParamsValidator
