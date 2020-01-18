import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store    from './store'
import services from './services'

import Root from './components/Root'

// сервисы
services(store)

render(
    <Provider store={ store }>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
