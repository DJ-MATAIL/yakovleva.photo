import React from 'react'
import { Switch, Route } from 'react-router-dom'

import SignInPage        from '../pages/SignInPage'
import AdminPage         from '../pages/AdminPage'
import WithAuthorization from './WithAuthorization'

const App = () => (
    <Switch>
        <Route
            path="/signin"
            component={ SignInPage }
            exact
            strict
            sensitive
        />
        <Route
            path="/admin"
            render={ props => <WithAuthorization
                component={ AdminPage }
            /> }
        />
    </Switch>
)

export default App
