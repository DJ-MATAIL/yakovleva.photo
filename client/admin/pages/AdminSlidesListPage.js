import React, { Fragment } from 'react'

import Header     from '../components/Header'
import Sidebar    from '../components/Sidebar'
import Main       from '../components/Main'
import SlidesList from '../components/SlidesList'

export default function AdminSlidesListPage() {
    return (
        <Fragment>
            <div className="flex" style={{ 'flexBasis': '100%' }}>
                <Sidebar />
                <Main>
                    <SlidesList />
                </Main>
            </div>
            <Header />
        </Fragment>
    )
}
