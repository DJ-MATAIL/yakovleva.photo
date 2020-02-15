import React from 'react'
import { Switch, Route } from 'react-router-dom'

import IndexPage     from '../pages/IndexPage'
import AboutPage     from '../pages/AboutPage'
import PricePage     from '../pages/PricePage'
import PortfolioPage from '../pages/PortfolioPage'
import DefaultPage   from '../pages/DefaultPage'

import WithRouterParamsValidator from './WithRouterParamsValidator'
import { sectionId as sectionIdSchema } from '../utils/validation-schema'

export default function App() {
    return (
        <Switch>
            <Route
                path="/"
                component={ IndexPage }
                exact
                strict
                sensitive
            />
            <Route
                path="/about"
                component={ AboutPage }
                exact
                strict
                sensitive
            />
            <Route
                path="/price"
                component={ PricePage }
                exact
                strict
                sensitive
            />
            <Route
                path={[
                    '/portfolio',
                    '/portfolio/:sectionId'
                ]}
                render={ () => <WithRouterParamsValidator
                    schema={{ sectionId: sectionIdSchema }}
                    component={ PortfolioPage }
                /> }
                exact
                strict
                sensitive
            />
            <Route component={ DefaultPage } />
        </Switch>
    )
}
