import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Main.styl'

const Main = ({ children }) => (
    <main className="main">{ children }</main>
)

Main.propTypes = {
    children: PropTypes.node
}

export default Main
