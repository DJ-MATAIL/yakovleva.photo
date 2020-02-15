import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider as MatomoProvider } from './components/Matomo'

import store from './store'

import Root from './components/Root'

render(
    <Provider store={ store }>
        <BrowserRouter>
        	<MatomoProvider>
            	<Root />
            </MatomoProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)
