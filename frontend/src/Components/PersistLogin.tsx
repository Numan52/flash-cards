import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import useAuth from '../hooks/useAuth';
import { useUserApi } from "../Hooks/useUserApi";

const PersistLogin = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const {refreshToken} = useUserApi() 
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const refresh = async () => {
            try {
                const json = await refreshToken();
                setAuth({email: json.email, jwt: json.jwt, role: "USER"})
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }

       
        !auth?.jwt ? refresh() : setIsLoading(false);

        return () => isMounted = false;
    }, [])

   

    return isLoading ? <p>Loading...</p> : <Outlet />;
}

export default PersistLogin
