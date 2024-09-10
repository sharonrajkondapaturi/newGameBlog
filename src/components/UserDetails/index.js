import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

//to know the current apiStatus
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    failure:"FAILURE"
}

const UserDetails = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [commentCount,setCommentCount] = useState('')
    const [postCount,setPostCount] = useState('')
    const name = localStorage.getItem("username")
    const navigate = useNavigate()
    
    const onCounts = async()=>{
        setApiStatus(apiStatus.loading)
        const commentCountApi = `https://sharongameblog.onrender.com/user/commentsCount`
        const postCountApi = `https://sharongameblog.onrender.com/user/postsCount`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const responseComment = await axios.get(commentCountApi,config)
        const responsePost = await axios.get(postCountApi,config)
        if(responseComment.status === 200 && responsePost.status === 200){
            setCommentCount(responseComment.data.user_comment_count)
            setPostCount(responsePost.data.user_post_count)
            setApiStatus(apiStatus.success)
        }
        else if(responseComment.status === 200 && responsePost.status !== 200){
            setCommentCount(responseComment.data.user_comment_count)
        }
    }

    const onLogout = () => {
        Cookies.remove('jwt_token')
        localStorage.clear()
        navigate('/login')
    }

    useEffect(()=>{
        onCounts()
    },[])
return(
    <>
    <Header/>
    <section className='details-back'>
    <article className='user-profile-background'>
        <center>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" className="user-detail-profile"/>
        <div className='line-row'>
            <span className='style-up'>USERNAME: </span>
            {apiStatus.loading === currentApiStatus?<ThreeDots visible={true} height="40" width="40" style={{marginLeft:5}}/>:<span className='span-up' style={{color:"#4c8af5"}}> {name}</span>}
        </div>
        <div className='line-row'>
            <span className='style-up'>POSTCOUNT: </span>
            {apiStatus.loading === currentApiStatus?<ThreeDots visible={true} height="40" width="40"/>:<span className='span-up'> {postCount}</span>}
        </div>
        <div className='line-row'> 
            <span className='style-up'>COMMENTCOUNT:</span> 
            {apiStatus.loading === currentApiStatus?<ThreeDots visible={true} height="40" width="40"/>:<span className='span-up'> {commentCount}</span>}
        </div>
        <button type="button" className='logout-user' onClick={onLogout}>Logout</button>
        </center>
    </article>
    </section>
    </>
)
}

export default UserDetails