import {useNavigate} from 'react-router-dom'
import './index.css'

const NotFound = ()=>{
    const navigate = useNavigate()
    const onHome = ()=>{
        navigate('/')
    }
return(
    <div className="error-back">
        <h1 className="errorpage-head">404</h1>
        <p className='errorpage-para'>Oops...page not found </p>
        <button type="button" className='error-button' onClick={onHome}>Home Page</button>
    </div>
)
}

export default NotFound