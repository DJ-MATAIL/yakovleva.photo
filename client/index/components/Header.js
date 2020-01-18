import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showMenu as showMenuAction } from '../actions/layers-list'
import { Link } from 'react-router-dom'
import {
    VK            as VK_LINK,
    INSTAGRAM     as INSTAGRAM_LINK,
    ODNOKLASSNIKI as ODNOKLASSNIKI_LINK
} from '../../../common/constants/links'
import '../styles/Header.styl'

import Logo from './Logo'

function Header() {
    const dispatch = useDispatch()
    const showMenu = () => dispatch(showMenuAction())

    const sectionsList = useSelector(state => state.sectionsList.items)
    const [ subNavHidden, setSubNavHidden ] = useState(true)

    function onMouseOver() {
        setSubNavHidden(false)
    }

    function onMouseOut() {
        setSubNavHidden(true)
    }

    return (
        <div className="header">
            <div className="header--shadow"></div>
            { /* mobile */ }
            <div className="header--mobile flex flex-middle flex-between">
                <button className="flex flex-column flex-around" onClick={ () => showMenu() }>
                    <img src="/icons/menu.svg" />
                </button>
                <div className="header--social-link-list flex">
                    { /* instagram */ }
                    <HeaderSocialLink href={ INSTAGRAM_LINK }>
                        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                    </HeaderSocialLink>
                    { /* vk */ }
                    <HeaderSocialLink href={ VK_LINK }>
                        <path d="M20.8,7.74C20.93,7.32 20.8,7 20.18,7H18.16C17.64,7 17.41,7.27 17.28,7.57C17.28,7.57 16.25,10.08 14.79,11.72C14.31,12.19 14.1,12.34 13.84,12.34C13.71,12.34 13.5,12.19 13.5,11.76V7.74C13.5,7.23 13.38,7 12.95,7H9.76C9.44,7 9.25,7.24 9.25,7.47C9.25,7.95 10,8.07 10.05,9.44V12.42C10.05,13.08 9.93,13.2 9.68,13.2C9,13.2 7.32,10.67 6.33,7.79C6.13,7.23 5.94,7 5.42,7H3.39C2.82,7 2.7,7.27 2.7,7.57C2.7,8.11 3.39,10.77 5.9,14.29C7.57,16.7 9.93,18 12.08,18C13.37,18 13.53,17.71 13.53,17.21V15.39C13.53,14.82 13.65,14.7 14.06,14.7C14.36,14.7 14.87,14.85 16.07,16C17.45,17.38 17.67,18 18.45,18H20.47C21.05,18 21.34,17.71 21.18,17.14C21,16.57 20.34,15.74 19.47,14.76C19,14.21 18.29,13.61 18.07,13.3C17.77,12.92 17.86,12.75 18.07,12.4C18.07,12.4 20.54,8.93 20.8,7.74Z" />
                    </HeaderSocialLink>
                    { /* odnoklassniki */ }
                    <HeaderSocialLink href={ ODNOKLASSNIKI_LINK }>
                        <path d="M17.83,12.74C17.55,12.17 16.76,11.69 15.71,12.5C14.28,13.64 12,13.64 12,13.64C12,13.64 9.72,13.64 8.29,12.5C7.24,11.69 6.45,12.17 6.17,12.74C5.67,13.74 6.23,14.23 7.5,15.04C8.59,15.74 10.08,16 11.04,16.1L10.24,16.9C9.1,18.03 8,19.12 7.25,19.88C6.8,20.34 6.8,21.07 7.25,21.5L7.39,21.66C7.84,22.11 8.58,22.11 9.03,21.66L12,18.68C13.15,19.81 14.24,20.9 15,21.66C15.45,22.11 16.18,22.11 16.64,21.66L16.77,21.5C17.23,21.07 17.23,20.34 16.77,19.88L13.79,16.9L13,16.09C13.95,16 15.42,15.73 16.5,15.04C17.77,14.23 18.33,13.74 17.83,12.74M12,4.57C13.38,4.57 14.5,5.69 14.5,7.06C14.5,8.44 13.38,9.55 12,9.55C10.62,9.55 9.5,8.44 9.5,7.06C9.5,5.69 10.62,4.57 12,4.57M12,12.12C14.8,12.12 17.06,9.86 17.06,7.06C17.06,4.27 14.8,2 12,2C9.2,2 6.94,4.27 6.94,7.06C6.94,9.86 9.2,12.12 12,12.12Z" />
                    </HeaderSocialLink>
                </div>
            </div>
            { /* /mobile */ }
            { /* desktop */ }
            <div className="header--desktop flex flex-middle flex-between">
                <div className="header--desktop--nav flex flex-middle">
                    <Logo />
                    <nav className="flex flex-middle">
                        <Link to="/about">Обо мне</Link>
                        <div
                            className="header--desktop--subnav-container"
                            onMouseOver={ onMouseOver }
                            onMouseOut={ onMouseOut }
                        >
                            <Link to="/portfolio" className="flex flex-middle">
                                Портфолио
                                <svg viewBox="0 0 24 24">
                                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                </svg>
                            </Link>
                            <div className={
                                'header--desktop--subnav flex flex-column' +
                                ( !subNavHidden ? ' visible' : '' )
                            }>
                                { sectionsList.map(item => (
                                    <div key={ item.id }><Link to={ `/portfolio/${ item.id }` }>{ item.name }</Link></div>
                                )) }
                            </div>
                        </div>
                        <Link to="/price">Услуги и цены</Link>
                    </nav>
                </div>
                <div className="header--social-link-list flex">
                    { /* instagram */ }
                    <HeaderSocialLink href={ INSTAGRAM_LINK }>
                        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
                    </HeaderSocialLink>
                    { /* vk */ }
                    <HeaderSocialLink href={ VK_LINK }>
                        <path d="M20.8,7.74C20.93,7.32 20.8,7 20.18,7H18.16C17.64,7 17.41,7.27 17.28,7.57C17.28,7.57 16.25,10.08 14.79,11.72C14.31,12.19 14.1,12.34 13.84,12.34C13.71,12.34 13.5,12.19 13.5,11.76V7.74C13.5,7.23 13.38,7 12.95,7H9.76C9.44,7 9.25,7.24 9.25,7.47C9.25,7.95 10,8.07 10.05,9.44V12.42C10.05,13.08 9.93,13.2 9.68,13.2C9,13.2 7.32,10.67 6.33,7.79C6.13,7.23 5.94,7 5.42,7H3.39C2.82,7 2.7,7.27 2.7,7.57C2.7,8.11 3.39,10.77 5.9,14.29C7.57,16.7 9.93,18 12.08,18C13.37,18 13.53,17.71 13.53,17.21V15.39C13.53,14.82 13.65,14.7 14.06,14.7C14.36,14.7 14.87,14.85 16.07,16C17.45,17.38 17.67,18 18.45,18H20.47C21.05,18 21.34,17.71 21.18,17.14C21,16.57 20.34,15.74 19.47,14.76C19,14.21 18.29,13.61 18.07,13.3C17.77,12.92 17.86,12.75 18.07,12.4C18.07,12.4 20.54,8.93 20.8,7.74Z" />
                    </HeaderSocialLink>
                    { /* odnoklassniki */ }
                    <HeaderSocialLink href={ ODNOKLASSNIKI_LINK }>
                        <path d="M17.83,12.74C17.55,12.17 16.76,11.69 15.71,12.5C14.28,13.64 12,13.64 12,13.64C12,13.64 9.72,13.64 8.29,12.5C7.24,11.69 6.45,12.17 6.17,12.74C5.67,13.74 6.23,14.23 7.5,15.04C8.59,15.74 10.08,16 11.04,16.1L10.24,16.9C9.1,18.03 8,19.12 7.25,19.88C6.8,20.34 6.8,21.07 7.25,21.5L7.39,21.66C7.84,22.11 8.58,22.11 9.03,21.66L12,18.68C13.15,19.81 14.24,20.9 15,21.66C15.45,22.11 16.18,22.11 16.64,21.66L16.77,21.5C17.23,21.07 17.23,20.34 16.77,19.88L13.79,16.9L13,16.09C13.95,16 15.42,15.73 16.5,15.04C17.77,14.23 18.33,13.74 17.83,12.74M12,4.57C13.38,4.57 14.5,5.69 14.5,7.06C14.5,8.44 13.38,9.55 12,9.55C10.62,9.55 9.5,8.44 9.5,7.06C9.5,5.69 10.62,4.57 12,4.57M12,12.12C14.8,12.12 17.06,9.86 17.06,7.06C17.06,4.27 14.8,2 12,2C9.2,2 6.94,4.27 6.94,7.06C6.94,9.86 9.2,12.12 12,12.12Z" />
                    </HeaderSocialLink>
                </div>
            </div>
            { /* /desktop */ }
        </div>
    )
}

const HeaderSocialLink = ({ href, children }) => (
    <a
        href={ href }
        className="header--social-link flex flex-middle flex-center"
        rel="noopener"
        target="_blank"
    >
        <svg viewBox="0 0 24 24">{ children }</svg>
    </a>
)

export default Header
