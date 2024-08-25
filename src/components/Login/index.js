import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {FidgetSpinner} from 'react-loader-spinner'
import axios from 'axios'
import Header from '../Header'
import './index.css'

//used to login with correct credentials
const Login = ()=>{
    const [username,setname] = useState('')
    const [password,setpassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    //below were triggered when the user enter the credentials
    const onUser = (event)=>{
        setname(event.target.value)
    }
    const onPassword = (event)=>{
        setpassword(event.target.value)
    }
    
    //credentials were matched it will redirect to posts page
    const onSuccess = jwtToken =>{
        Cookies.set('jwt_token',jwtToken,{expires:30})
        navigate('/posts')
    }
   
    //verify the user when the click login
    const onVerify = async(event)=>{
        event.preventDefault()
        const userDetails = {
            username,password
        }
        setError('')
        setLoading(prevState=>!prevState)

        try{
            const loginApiUrl = `https://sharongameblog.onrender.com/login`
            const response = await axios.post(loginApiUrl,userDetails)
            console.log(response)
            onSuccess(response.data.jwtToken)
        }
        catch{
            setLoading(prevState => !prevState)
            setError("Invalid username or password")
        }
    }

    const onLoading = ()=>(
        <center style={{marginTop:10}}>
            <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
        </center>
    )
    return(
        <>
        <Header/>
        <div className='background'>
            <form className="login-form" onSubmit={onVerify}>
                <h1 className='login-head'>Login</h1>
                <label htmlFor='username'>Username</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username} className='login-input'/>
                <label htmlFor='password'>password</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='login-input'/>
                <center>
                <button type="submit">Login</button>
                </center>
                {loading?onLoading():null}
                {error===''?null:<p className='error'>{error}</p>}
                <a href="http://localhost:3000/register" className='blink'>Are you a new user?</a>
            </form>
        </div>
        </>
    )
}

export default Login
