import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {FidgetSpinner} from 'react-loader-spinner'
import axios from 'axios'
import Header from '../Header'
import './index.css'

const Register = ()=>{
    const [username,setname] = useState('')
    const [password,setpassword] = useState('')
    const [confirmPassword,setconfirm] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const onSuccess = jwtToken =>{
        Cookies.set('jwt_token',jwtToken,{expires:30})
        navigate('/posts')
    }

    const onCredentials = async(event) =>{
        event.preventDefault()
        const userDetails = {
            username,password
        }
        setError('')
        setLoading(prevState => !prevState)
        //if the password and confirm password is same it will fetch the data
        if(password === confirmPassword){
            //try method will fetch the data if the username is not present in user Database
            try{
                const loginUrl = "https://sharongameblog.onrender.com/register"
                const response = await axios.post(loginUrl,userDetails)
                setError('')
                onSuccess(response.data.jwtToken)
            }
            //catch occurs when the username is already present in the dataBase and errorMessage occurs
            catch{
                setLoading(prevState => !prevState)
                setError("User already exists")
            }
        }
        //if the password is not Match errorMessage occurs
        else{
            setLoading(prevState => !prevState)
            setError("password is not matched")
        }
        
        
    }

    //credentials of user,password,confirmPassword where user enters in input area
    const onUser = event =>{
            setname(event.target.value)
        }
    
        const onPassword = event =>{
            setpassword(event.target.value)
        }
    
        const onConfirm = event =>{
            setconfirm(event.target.value)
        }
    
        const onLoading = ()=>(
            <center style={{marginTop:10}}>
                <FidgetSpinner visible={true} height="50" width="50" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
            </center>
        )
    
    return(
        <div className='background'>
        <Header/>
            <form className="register-form" onSubmit={onCredentials}>
                <h1 className='login-head'>Register</h1>
                <label htmlFor='username'>Username</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username} className='login-input'/>
                <label htmlFor='password'>password</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='login-input'/>
                <label htmlFor='password'>Confirm Password</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='login-input'/>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input id = "confirmpassword" type="password" placeholder='Enter password' onChange={onConfirm} value={confirmPassword} className='login-input'/>
                <center>
                <button type="submit">Login</button>
                </center>
                {loading?onLoading():null}
                {error===''?null:<p className='error'>{error}</p>}
                <a href="http://localhost:3000/register" className='blink'>Are you a new user?</a>
            </form>
        </div>
    )
}

export default Register