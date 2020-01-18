import React from 'react'
import PropTypes from 'prop-types'

const TableCell = ({ children, style, ...props }) => (
    <div
        className="table-cell flex"
        style={ style }
        { ...props }
    >{ children }</div>
)

TableCell.propTypes = {
    children: PropTypes.node,
    style:    PropTypes.object.isRequired
}

TableCell.defaultProps = {
    style: {}
}

export default TableCell
