import React from 'react'
import { useDispatch } from 'react-redux'
import { showUploadImagesList as showUploadImagesListAction } from '../actions/layers'
import { signOut as signOutAction } from '../actions/sign'
import '../styles/Header.styl'

export default function Header() {
    const dispatch = useDispatch()

    const showUploadImagesList = () => dispatch(showUploadImagesListAction())
    const signOut              = () => dispatch(signOutAction())

    return (
        <header className="header flex flex-middle flex-between">
            <div className="header--links">
                <a href="/">Сайт</a>
                <a href="/admin">Админ-панель</a>
                <a href="https://stats.yakovleva.photo">Статистика</a>
            </div>
            <nav className="header--nav flex flex-middle">
                <button className="flex flex-middle flex-center" onClick={ showUploadImagesList }>
                    <svg viewBox="0 0 24 24">
                        <path d="M14,13V17H10V13H7L12,8L17,13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" />
                    </svg>
                </button>
                <button onClick={ signOut }>Выйти</button>
            </nav>
        </header>
    )
}
