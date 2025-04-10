import React from 'react'
import authService from '../../appWrite/auth.js'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/authSlice.js'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
    return (
        <button className='inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-300'>Logout</button>
    )
}

export default LogoutBtn