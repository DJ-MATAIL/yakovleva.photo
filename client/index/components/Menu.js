import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideMenu as hideMenuAction } from '../actions/layers-list'
import { useHistory } from 'react-router-dom'
import '../styles/Menu.styl'

export default function Menu() {
    const dispatch = useDispatch()
    const hideMenu = () => dispatch(hideMenuAction())
    const sectionsList = useSelector(state => state.sectionsList.items)

    return (
        <div className="menu">
            <div className="menu--container flex flex-column">
                <div className="menu--header flex flex-middle flex-between">
                    <LinkWrap to="/">yakovleva.photo</LinkWrap>
                    <button onClick={ () => hideMenu() }>
                        <img src="/icons/close.svg" />
                    </button>
                </div>
                <div className="menu--body">
                    <ul>
                        <li>
                            <LinkWrap to="/portfolio">Портфолио</LinkWrap>
                            <ul>
                                { sectionsList.map(item => (
                                    <li key={ item.id }>
                                        <LinkWrap to={ '/portfolio/' + item.id }>{ item.name }</LinkWrap>
                                    </li>
                                )) }
                            </ul>
                        </li>
                        <li>
                            <LinkWrap to="/about">Обо мне</LinkWrap>
                        </li>
                        <li>
                            <LinkWrap to="/price">Услуги и цены</LinkWrap>
                        </li>
                    </ul>
                </div>
                <div className="menu--footer"></div>
            </div>
        </div>
    )
}

function LinkWrap(props) {
    const dispatch = useDispatch()
    const hideMenu = () => dispatch(hideMenuAction())
    const history = useHistory()
    const { to, children } = props

    function go(event) {
        event.preventDefault()
        history.push(to)
        hideMenu()
    }

    return <a href={ to } onClick={ go }>{ children }</a>
}
