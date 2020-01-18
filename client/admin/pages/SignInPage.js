import React, { useEffect } from 'react'
import pages from '../../../common/constants/pages'

import SignIn from '../components/SignIn'

export default function SigninPage() {
    useEffect(() => {
        document.title = pages.SIGNIN_PAGE
    }, [])

    return <SignIn />
}
