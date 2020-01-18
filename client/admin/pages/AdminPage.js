import React, { useEffect } from 'react'
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom'
import pages from '../../../common/constants/pages'

import AdminImagesListPage   from './AdminImagesListPage'
import AdminSlidesListPage   from './AdminSlidesListPage'
import AdminSectionsListPage from './AdminSectionsListPage'

export default function AdminPage() {
    const { path } = useRouteMatch()

    useEffect(() => {
        document.title = pages.ADMIN_PAGE
    }, [])

    return (
        <Switch>
            <Redirect
                from={ '/admin' }
                to={ `${ path }/images` }
                exact
                strict
                sensitive
            />
            <Route
                path={ `${ path }/images` }
                component={ AdminImagesListPage }
                exact
                strict
                sensitive
            />
            <Route
                path={ `${ path }/slides` }
                component={ AdminSlidesListPage }
                exact
                strict
                sensitive
            />
            <Route
                path={ `${ path }/sections` }
                component={ AdminSectionsListPage }
                exact
                strict
                sensitive
            />
        </Switch>
    )
}
