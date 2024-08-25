import { useState } from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import './index.css'

//This is the Header of the blog which is fixed every page
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
                <GiHamburgerMenu fill='#fff' size={20} style={{position:'fixed'}}/>
                {
                ham?<ul className='mobile-ham'>
                    <li style={{paddingBottom:10,borderBottomStyle:"solid",borderBottomColor:"#000"}}><a  href="/login" className='mobile-anchors'>Home</a></li>
                    <li style={{paddingBottom:10,borderBottomStyle:"solid",borderBottomColor:"#000"}}><a  href="/posts" className='mobile-anchors'>Posts</a></li>
                    <li style={{paddingBottom:10,borderBottomStyle:"solid",borderBottomColor:"#000"}}><a href="/userposts" className='mobile-anchors'>User Posts</a></li>
                    <li style={{paddingBottom:5}}><a href="http://localhost:3000/newpost" className='mobile-anchors'>Add Post</a></li>
                </ul>:null
                }
            </nav>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/posts">Posts</a></li>
                    <li><a href="/userposts">User Posts</a></li>
                    <li><a href="/newpost">Add Post</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="/register">Register</a></li>
                    <li><a href='/login'>Login</a></li>
                    <li><button onClick={onLogout}>Logout</button></li>
                </ul>
            </nav>
            <nav className='mobile-nav'>
                <ul className='mobile-right'>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
                <li><button onClick={onLogout} className='mobile-button'>Logout</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
