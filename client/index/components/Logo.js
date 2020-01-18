import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Logo.styl'

export default function Logo() {
    return (
        <Link to="/" className="logo">yakovleva.photo</Link>
    )
}
