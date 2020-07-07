import React from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import GuestMenu from './GuestMenu'

const Login = () => {

    const guestMenu = () => {
        // console.log('hey')
        // const token = Math.ceil(Math.random() * 10000)
        // console.log(token)
        // localStorage.setItem('Token', token )
        
    }

    return (
    <div>
        <form>
            <input type="text" placeholder="Enter Username"></input>
            <input type="password" placeholder="Enter Password"></input>
            <button>Log In</button>
        </form>
        <button onClick={guestMenu}>Demo User</button>
        <Link to="/guestMenu">Demo User</Link>
    </div>
    )
}

export default Login;