import React from 'react'
import Layout from './Layout'
import useFetch from '../Hooks/useFetch';
import useLogout from '../Hooks/useLogout';


const Home = () => {
  const { request } = useFetch();
  const logout = useLogout()

  async function makeRequest() {
    const data =  await request({
      endpoint: `/secured-endpoint`,
    });
    console.log(data)
  }

  return (
    <Layout>
      <button onClick={() => {
        makeRequest()
      }
        
      }>
        secure endpoint
      </button>


      <button onClick={logout}>
        Logout
      </button>
    </Layout>
  )
  

  

}

export default Home
