import React, { useEffect } from 'react'
import useAuth from './useAuth'
import { CustomClaims } from 'utils/types'

const useOwner = (ownerId: string) => {
    const {auth} = useAuth()
    const [isOwner, setIsOwner] = React.useState<boolean>(false)

    useEffect(() => {
        auth?.currentUser?.getIdTokenResult()
            .then((result) => {
                const claims = result.claims as CustomClaims
                setIsOwner(claims.dbid === ownerId)
            })
            .catch(() => setIsOwner(false))
    }, [auth])

    return {
        isOwner
    }
}

export default useOwner