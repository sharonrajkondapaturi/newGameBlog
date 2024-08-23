import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import './index.css'

const Header = ()=>{
    const [ham,setHam] = useState(false)
    const [login,setlogin] = useState(false)

    const onHam = ()=>{
        setHam(prevState=>!prevState)
    }

    const onLogin = () => {
        setlogin(prevState=>!prevState)
    }
    
    return(
        <header>
            <nav className="ham" onClick={onHam}>
                <GiHamburgerMenu fill='#fff' size={20}/>
                {
                ham?<ul className='mobile-ham'>
                    <li><a href="www.google.com" className='mobile-anchors'>Home</a></li>
                    <li><a href="www.google.com" className='mobile-anchors'>Games</a></li>
                    <li><a href="www.google.com" className='mobile-anchors'>Consoles</a></li>
                    <li><a href="www.google.com" className='mobile-anchors'>About</a></li>
                </ul>:null
                }
            </nav>
            <nav>
                <ul>
                    <li><a href="www.google.com">Home</a></li>
                    <li><a href="www.google.com">Games</a></li>
                    <li><a href="www.google.com">Consoles</a></li>
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
                <li><button className='mobile-button'>Login</button></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header