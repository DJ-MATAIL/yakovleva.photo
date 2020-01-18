import React, { Fragment } from 'react'

import Header        from '../components/Header'
import Sidebar       from '../components/Sidebar'
import Main          from '../components/Main'
import ImageUploader from '../components/ImageUploader'
import ImagesList    from '../components/ImagesList'

export default function AdminImagesListPage() {
    return (
        <Fragment>
            <div className="flex" style={{ 'flexBasis': '100%' }}>
                <Sidebar />
                <Main>
                    <ImageUploader />
                    <ImagesList />
                </Main>
            </div>
            <Header />
        </Fragment>
    )
}
