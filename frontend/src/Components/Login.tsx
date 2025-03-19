import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useUserApi } from '../Hooks/useUserApi';

import Header from './Header';
import useAuth from '../Hooks/useAuth';
const apiUrl = import.meta.env.VITE_API_URL

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const {setAuth} = useAuth()
  const {loginUser} = useUserApi()
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const redirectedFrom = location.state?.from?.pathname || "/"
  
  async function handleLogin(e) {
    e.preventDefault()
    setErrorMessage("")
    console.log(email)
    try {
      const json = await loginUser(email, password)
      setAuth({email: json.email, jwt: json.jwt, role: "USER"})
      setEmail("")
      setPassword("")
      navigate(redirectedFrom, {replace: true})
    } catch (error) {
      console.log(error)
      setErrorMessage(error.message)
    }
  }

  return (
    <>
      <Header />
      <div className='flex justify-self-center items-center flex-col w-1/3'>
        <h1 className='mb-10'>Welcome!</h1>
        <form onSubmit={handleLogin} className='w-full' >
          
          <div className='flex flex-col gap-2 mb-5'>
            <label htmlFor="login-name">Email</label>
            <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='login-name'
                type="email" 
                placeholder='Enter your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required  
            />

          </div>
          

          <div className='flex flex-col gap-2 '>
            <label htmlFor="login-password">Password</label>
            <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='login-password'
                type="password" 
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required  
            />
          </div>

          <div className='mt-1 mb-5 text-end'>
            Forgot your Password? <a className='hover:underline' href="/reset-password">Reset it</a>
          </div>
          

          <div className='login-button-container'>
            <button className='btn-primary w-full mb-4 mt-7' type='submit'>
              Login
            </button>
            <div className='text-center'>Don't have an Account? <Link className='hover:underline' to="/register">Sign Up</Link></div>
          </div>

        </form>

        {errorMessage && 
          <div style={{color:"red", marginTop:"15px", fontSize:"20px"}}> 
            {errorMessage}
          </div>
        }
      
      </div>
    </>
    
  )
}


export default Login
