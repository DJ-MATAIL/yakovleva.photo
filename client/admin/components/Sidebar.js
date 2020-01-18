import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import '../styles/Sidebar.styl'

export default function Sidebar() {
    const { path } = useRouteMatch()

    return (
        <aside className="sidebar">
            <div className="sidebar--container">
                <h3>Админ-панель</h3>
                <ul>
                    <li>
                        <Link
                            to="/admin/images"
                            className={ path == '/admin/images' ? 'active' : '' }
                        >Изображения</Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/slides"
                            className={ path == '/admin/slides' ? 'active' : '' }
                        >Слайды</Link>
                    </li>
                    <li>
                        <Link
                            to="/admin/sections"
                            className={ path == '/admin/sections' ? 'active' : '' }
                        >Разделы</Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
