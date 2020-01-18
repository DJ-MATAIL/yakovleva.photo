import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Main   from './Main'
import Footer from './Footer'

function BasePage(props) {
    const { children } = props

    return (
        <Fragment>
            <Main>{ children }</Main>
            <Footer />
            <Header />
        </Fragment>
    )
}

BasePage.propTypes = {
    children: PropTypes.node
}

export default BasePage
