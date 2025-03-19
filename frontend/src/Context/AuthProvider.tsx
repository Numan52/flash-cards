import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserApi } from '../Hooks/useUserApi'



const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    
    return (
      <AuthContext.Provider value={{auth, setAuth}}>
        {children}
      </AuthContext.Provider>
    )
}


export default AuthContext

