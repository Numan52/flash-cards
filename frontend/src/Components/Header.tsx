import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
  const navigate = useNavigate()

  return (
    <div className='flex justify-between h-10 items-center ml-7 mr-7 mt-2 text-lg font-'>
        <div className='flex gap-10 items-center'>
            <nav>
                <ul className='flex gap-4'>
                    <li><a className='text-white' href="/">Home</a></li>
                    <li><a className='text-white' href="/explore">Explore</a></li>
                </ul>
            </nav>

            <div >
                <button className='flex gap-3 hover:cursor-pointer border-0 pl-6 pr-6 pt-2 pb-2 rounded-3xl bg-gray-300'>
                    <img src="/search.png" alt="Search Icon" className='w-6 h-6' />
                    <div className='text-black'>Search for flashcards</div>
                </button>
            </div>
        </div>
        

        <div className='flex gap-4'>
            <button onClick={() => navigate("/login")} className='hover:cursor-pointer border-0 rounded-2xl bg-blue-200 px-5 py-2 text-black'>Log in</button>
            <button onClick={() => navigate("/register")} className='hover:cursor-pointer border-0 rounded-2xl bg-green-200 px-5 py-2 text-black'>Get Started</button>
        </div>
    </div>   
  )
}

export default Header
