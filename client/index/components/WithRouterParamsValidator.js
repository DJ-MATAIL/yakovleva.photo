import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useParams } from 'react-router-dom'
import Joi from '@hapi/joi'

function WithRouterParamsValidator(props) {
    const params = useParams()
    const {
        schema,
        component: Component
    } = props
    const _schema = Joi
        .object()
        .keys(schema)
        .required()
    const validationResult = _schema.validate(params)

    if (validationResult.error) {
        return <Redirect to="/" />
    }

    return <Component { ...props } />
}

WithRouterParamsValidator.propTypes = {
    schema:    PropTypes.object.isRequired,
    component: PropTypes.elementType.isRequired
}

export default WithRouterParamsValidator
