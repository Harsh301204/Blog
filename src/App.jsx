import React  from 'react'
import './App.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appWrite/auth.js'
import { useEffect } from 'react'
import {login , logout} from './features/authSlice'
import {Header , Footer} from './components/index'

function App() {
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(authService.getUser())
    authService.getUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  } )
  
  
  return  !loading ? <div className='min-h-screen flex flex-wrap content-between bg-gray-600'>
    <div className='w-full block text-center'>
      <Header/>
      <Footer/>
    </div>
  </div> : (null)
}

export default App
