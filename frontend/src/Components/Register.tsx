import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'


import { useUserApi } from "../Hooks/useUserApi"
import Layout from './Layout'

const apiUrl = import.meta.env.VITE_API_URL

const Register = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [secondPassword, setSecondPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const {registerUser} = useUserApi()

  const navigate = useNavigate()

  async function handleRegister(e) {
    e.preventDefault()
    setErrorMessage("")

    if (password !== secondPassword) {
      setErrorMessage("The two passwords don't match")
      return;
    }
    try {
      await registerUser(firstName, lastName, username, password, email)
      navigate("/login")
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Layout>
        <div className='flex justify-self-center items-center flex-col w-1/3'>
          <h1 className='mb-10'>Register</h1>

          <form onSubmit={handleRegister} className='w-full'>

              <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="register-first-name">First Name</label>
                <input
                  className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                  id='register-first-name'
                  type="text" 
                  placeholder='First Name'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required  
                />
              </div>
            

              <div className='flex flex-col gap-2 mb-5'> 
                <label htmlFor="register-last-name">Last Name</label>
                <input 
                  className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                  id='register-last-name'
                  type="text" 
                  placeholder='Last Name'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required  
                />
              </div>
              
              <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="register-username">Username</label>
                <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='register-username'
                type="text" 
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required  
                />
              </div>
              
              <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="register-email">Email Address</label>
                <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='register-email'
                type="email" 
                placeholder='Email Address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required  
                />
              </div>
              

              <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="register-password">Password</label>
                <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='register-password'
                type="password" 
                placeholder='Password'
                
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required  
                />
              </div>
              
              <div className='flex flex-col gap-2 mb-5'>
                <label htmlFor="register-password-confirm">Confirm Password</label>
                <input
                className='px-3 py-3 bg-gray-800 placeholder:text-gray-400 text-white rounded-xl'
                id='register-password-confirm'
                type="password" 
                placeholder='Confirm your Password'
                value={secondPassword}
                onChange={(e) => setSecondPassword(e.target.value)}
                required  
                />
              </div>
              
              
              <div >
                <button className='btn-primary w-full mb-4 mt-7' type='submit'>
                    Register
                </button>
                <div className='text-center'>Already have an Account? <Link className='hover:underline' to="/login">Sign In</Link></div>
              </div>

          </form>
          

          {errorMessage && 
              <div style={{color:"red", marginTop:"15px"}}> 
              {errorMessage}
              </div>
          }
        </div>
    
    </Layout>
    
      
    
  )
}

export default Register