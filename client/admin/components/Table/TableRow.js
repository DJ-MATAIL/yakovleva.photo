import React from 'react'
import PropTypes from 'prop-types'

const TableRow = ({ children, style, ...props }) => (
    <div
        className="table-row flex"
        style={ style }
        { ...props }
    >{ children }</div>
)

TableRow.propTypes = {
    children: PropTypes.node,
    style:    PropTypes.object.isRequired
}

TableRow.defaultProps = {
    style: {}
}

export default TableRow
