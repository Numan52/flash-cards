import React from 'react'
import useAuth from './useAuth'
import { useUserApi } from './useUserApi'

const useLogout = () => {
    const {setAuth} = useAuth()
    const {logout} = useUserApi()

    function signOut() {
        setAuth({})
        try {
            logout()
        } catch (error) {
            console.error(error)
        }
    }

    return signOut
}

export default useLogout
