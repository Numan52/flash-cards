import { useState } from 'react'

import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Home from './Components/Home'
import ProtectedRoute from './Components/ProtectedRoute'
import Login from './Components/Login'
import Register from './Components/Register'
import { AuthProvider } from './Context/AuthProvider'
import Profile from './Components/Profile'
import useAuth from './Hooks/useAuth'
import PersistLogin from './Components/PersistLogin'
import ScenarioSettings from './Components/ScenarioSettings'

function App() {
  
  const {auth} = useAuth()

  console.log(auth)
  return (
    <BrowserRouter>
      
      <Routes>



        <Route element={<PersistLogin />}>
          <Route path='/' element={<Home />} />

          <Route path='/profile' 
            element={
              <ProtectedRoute allowedRoles={["ADMIN", 'USER']}>
                <Profile />
              </ProtectedRoute>
              
            } >
  
          </Route>
        </Route>
        
        <Route path='/scenario-settings/:scenarioId' element={<ScenarioSettings /> } />  


        <Route path='/login' element={auth.jwt ? <Navigate to={"/"} replace/> : <Login />} />  
        <Route path='/register' element={auth.jwt ? <Navigate to={"/"} replace/> : <Register />}/>  
      </Routes>
      
      
    </BrowserRouter>
  )
}

export default App
