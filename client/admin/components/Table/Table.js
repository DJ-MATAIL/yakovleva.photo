import React from 'react'
import PropTypes from 'prop-types'

const Table = ({ children }) => (
    <div className="table flex flex-wrap">{ children }</div>
)

Table.propTypes = {
    children: PropTypes.node
}

export default Table
