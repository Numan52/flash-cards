import React from 'react'
import { useLocation } from 'react-router';
import Header from './Header';

const Layout = ({children}) => {
    //const { pathname } = useLocation();
    
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            
        </>
        
        
    )
}

export default Layout
