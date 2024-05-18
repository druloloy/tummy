import { Auth, IdTokenResult } from '@firebase/auth'
import React from 'react'

interface useEmailVerificationCheckProps {
    (auth: Auth, onEmailVerified?: (result: IdTokenResult) => void, onEmailNotVerified?: Function): {isEmailVerified: boolean};
}

const useEmailVerificationCheck: useEmailVerificationCheckProps = (auth, onEmailVerified, onEmailNotVerified) => {
    const [ isEmailVerified, setIsEmailVerified ] = React.useState(false)

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (auth?.currentUser && !auth?.currentUser?.emailVerified) {
                auth?.currentUser?.reload()
                    .then(async () => {
                        if (auth?.currentUser?.emailVerified) {
                            setIsEmailVerified(true)
                            auth?.currentUser?.getIdTokenResult(true)
                            .then((result) => {
                                onEmailVerified && onEmailVerified(result)
                            })
                        } else {
                            onEmailNotVerified && onEmailNotVerified()
                        }
                    })
            }
        }, 500)

        return () => clearInterval(interval)
    }, [])

    return {isEmailVerified}
}

export default useEmailVerificationCheck