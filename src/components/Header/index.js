import { useState } from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import './index.css'

const Header = ()=>{
    const [ham,setHam] = useState(false)
    const navigate = useNavigate()

    const onHam = ()=>{
        setHam(prevState=>!prevState)
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login')
    }
    
    return(
        <header>
            <nav className="ham" onClick={onHam}>
                <GiHamburgerMenu fill='#fff' size={20}/>
                {
                ham?<ul className='mobile-ham'>
                    <li><a href="http://localhost:3000/login" className='mobile-anchors'>Home</a></li>
                    <li><a href="http://localhost:3000/posts" className='mobile-anchors'>Posts</a></li>
                    <li><a href="http://localhost:3000/userposts" className='mobile-anchors'>User Posts</a></li>
                    <li><a href="http://localhost:3000/newpost" className='mobile-anchors'>Add Post</a></li>
                </ul>:null
                }
            </nav>
            <nav>
                <ul>
                    <li><a href="http://localhost:3000/">Home</a></li>
                    <li><a href="http://localhost:3000/posts">Posts</a></li>
                    <li><a href="http://localhost:3000/userposts">User Posts</a></li>
                    <li><a href="http://localhost:3000/newpost">Add Post</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="http://localhost:3000/register">Register</a></li>
                    <li><a href='http://localhost:3000/login'>Login</a></li>
                    <li><button onClick={onLogout}>Logout</button></li>
                </ul>
            </nav>
            <nav className='mobile-nav'>
                <ul className='mobile-right'>
                <li><a href="http://localhost:3000/register">Register</a></li>
                <li><a href="http://localhost:3000/login" className='mobile-button'>Login</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header