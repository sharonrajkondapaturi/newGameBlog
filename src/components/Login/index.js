import {useState} from 'react'
import axios from 'axios'
import Header from '../Header'
import './index.css'

const Login = ()=>{
    const [username,setname] = useState('')
    const [password,setpassword] = useState('')

    const onUser = (event)=>{
        setname(event.target.value)
    }
    const onPassword = (event)=>{
        setpassword(event.target.value)
    }
    return(
        <div className='background'>
        <Header/>
            <form>
                <h1>Login</h1>
                <label htmlFor='username'>Username</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username}/>
                <label htmlFor='password'>password</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password}/>
                <center>
                <button type="submit">Login</button>
                </center>
                <a>Are you a new user?</a>
            </form>
        </div>
    )
}

export default Login