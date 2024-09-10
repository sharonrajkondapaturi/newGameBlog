import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {FidgetSpinner} from 'react-loader-spinner'
import axios from 'axios'
import Header from '../Header'
import './index.css'

//used to register for the new user
const Register = ()=>{
    const [username,setname] = useState('')
    const [password,setpassword] = useState('')
    const [confirmPassword,setconfirm] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
  
   
    //after submitting it validates the new user credentials
    const onCredentials = async(event) =>{
        event.preventDefault()
        const userDetails = {
            username,password
        }
        setError('')
        setLoading(prevState => !prevState)
        //if the password and confirm password is same it will fetch the data
        if(password === confirmPassword && password !== "" && confirmPassword!==""){
            //try method will fetch the data if the username is not present in user Database
            try{
                const loginUrl = "https://sharongameblog.onrender.com/register"
                await axios.post(loginUrl,userDetails)
                setError('')
                navigate('/login')
            }
            //catch occurs when the username is already present in the dataBase and errorMessage occurs
            catch{
                setLoading(prevState => !prevState)
                setError("User already exists")
                setname('')
                setpassword('')
                setconfirm('')
            }
        }
        //if the password is not Match errorMessage occurs
        else{
            setLoading(prevState => !prevState)
            setError("password is mismatched or did't fill ")
            setpassword('')
            setconfirm('')
        }
    }

    //credentials of user,password,confirmPassword where user enters in input area
    const onUser = event =>{
            setname(event.target.value)
            setError('')
        }
    
        const onPassword = event =>{
            setpassword(event.target.value)
            setError('')
        }
    
        const onConfirm = event =>{
            setconfirm(event.target.value)
            setError('')
        }
    
        const onLoading = ()=>(
            <center style={{marginTop:10,marginBottom:10}}>
                <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
            </center>
        )
    
    return(
        <div>
        <Header/>
        <div className='register-container'>
        <div className='register-background'>
            <img src="https://cdn.prod.website-files.com/6618fe1082001b3c60e5ad83/6647129899fa2558fe2b837b_HardcoreGamers-Blog-Header.webp" alt="login" className='register-img'/>
            <form className="register-form" onSubmit={onCredentials}>
                <h1 className='register-head'>Register</h1>
                <label htmlFor='username'>Username</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username} className='register-input'/>
                <label htmlFor='password'>password</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='register-input'/>
                <label htmlFor='confirmpassword'>Confirm Password</label>
                <input id = "confirmpassword" type="password" placeholder='Enter password' onChange={onConfirm} value={confirmPassword} className='register-input'/>
                {loading?onLoading():null}
                <center>
                <button className="register-button" type="submit">Login</button>
                </center>
                {error===''?null:<p className='error'>{error}</p>}
                <a  href="http://localhost:3000/login" className='blink'>Already an user?</a>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Register
