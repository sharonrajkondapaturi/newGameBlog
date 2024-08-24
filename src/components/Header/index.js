import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import './index.css'

const Header = ()=>{
    const [ham,setHam] = useState(false)
    const navigate = useNavigate()

    const onHam = ()=>{
        setHam(prevState=>!prevState)
    }

    const onLogin = () => {
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
                    <li><a href="www.google.com" className='mobile-anchors'>User Posts</a></li>
                    <li><a href="www.google.com" className='mobile-anchors'>About</a></li>
                </ul>:null
                }
            </nav>
            <nav>
                <ul>
                    <li><a href="http://localhost:3000/">Home</a></li>
                    <li><a href="http://localhost:3000/posts">Posts</a></li>
                    <li><a href="www.google.com">User Posts</a></li>
                    <li><a href="www.google.com">About</a></li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li><a href="www.google.com">UserDetails</a></li>
                    <li><button onClick={onLogin}>Login</button></li>
                </ul>
            </nav>
            <nav className='mobile-nav'>
                <ul className='mobile-right'>
                <li><a href="www.google.com">UserDetails</a></li>
                <li><button className='mobile-button' onClick={onLogin}>Login</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header