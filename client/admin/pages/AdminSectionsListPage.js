import React, { Fragment } from 'react'

import Header       from '../components/Header'
import Sidebar      from '../components/Sidebar'
import Main         from '../components/Main'
import SectionsList from '../components/SectionsList'

export default function AdminSectionsListPage() {
    return (
        <Fragment>
            <div className="flex" style={{ 'flexBasis': '100%' }}>
                <Sidebar />
                <Main>
                    <SectionsList />
                </Main>
            </div>
            <Header />
        </Fragment>
    )
}
