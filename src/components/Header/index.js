import { useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import './index.css'

//This is the Header of the blog which is fixed every page
const Header = ()=>{
    const [ham,setHam] = useState(false)
    const token = Cookies.get('jwt_token')
    const navigate = useNavigate()
    const name = localStorage.getItem("username")

    //the below functions will triger the route pages
    const onHam = ()=>{
        setHam(prevState=>!prevState)
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        localStorage.clear()
        navigate('/login')
    }

    const onHome = () => {
        navigate('/')
    }

    const onlogin = () => {
        navigate('/login')
    }

    const onPosts = () => {
        navigate('/posts')
    }

    const onUserPosts = () => {
        navigate('/userposts')
    }
    const onNewPost = () => {
        navigate('/newpost')
    }
    const onRegister = () => {
        navigate('/register')
    }

    const onDetails = () => {
        navigate('/userDetails')
    }
    
    return(
        <header>
            <nav className="ham" onClick={onHam}>
                <GiHamburgerMenu fill='#fff' size={20} style={{position:'absolute'}}/>
                {
                ham?<ul className='mobile-ham'>
                    <li><a onClick={onHome} className='mobile-anchors'>Home</a></li>
                    <li><a onClick={onPosts} className='mobile-anchors'>Posts</a></li>
                    <li><a onClick={onUserPosts} className='mobile-anchors'>User Posts</a></li>
                    <li><a onClick={onNewPost} className='mobile-anchors'>Add Post</a></li>
                </ul>:null
                }
            </nav>
            <nav>
                <ul>
                    <li><a onClick={onHome}>Home</a></li>
                    <li><a onClick={onPosts}>Posts</a></li>
                    <li><a onClick={onUserPosts}>User Posts</a></li>
                    <li><a onClick={onNewPost}>Add Post</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    {token !== undefined?null:<li><a onClick={onRegister}>Register</a></li>}
                    {token !== undefined?null:<li><a onClick={onlogin}>Login</a></li>}
                    {token !== undefined?<div className='round-profile' onClick={onDetails}>{name[0].toUpperCase()}</div>:null}
                    {token !== undefined?<button onClick={onLogout} className='logout-button'>Logout</button>:null}

                </ul>
            </nav>
            <nav className='mobile-nav'>
                <ul className='mobile-right'>
                {token !== undefined?null:<li><a onClick={onRegister}>Register</a></li>}
                {token !== undefined?null:<li><a onClick={onlogin}>Login</a></li>}
                {token !== undefined?<div className='round-profile' onClick={onDetails}>{name[0].toUpperCase()}</div>:null}
                {token !== undefined?<button onClick={onLogout} className='mobile-button'>Logout</button>:null}
                </ul>
            </nav>
        </header>
    )
}

export default Header
