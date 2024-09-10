import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import PostList from '../PostList'
import './index.css'
import { useNavigate } from 'react-router-dom'

//to know the current apiStatus
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

//used to fetch the post the api with the help axios
const Posts = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [title,setTitle] = useState('')
    const [postDetails,setPost] = useState([])
    const navigate = useNavigate()

//render the post details
    const postRendering = async()=>{
        setApiStatus(apiStatus.loading)
        const postApiurl = `https://sharongameblog.onrender.com/posts/?title=${title}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        try{
            const response = await axios.get(postApiurl,config)
            const postDetails = response.data.map(eachResponse=>({
                id:eachResponse.id,
                userId:eachResponse.user_id,
                title:eachResponse.title,
                genre:eachResponse.genre,
                imageUrl:eachResponse.image_url,
                content:eachResponse.content,
                videoUrl:eachResponse.video_url,
                publishedBy:eachResponse.published_by,
                publishedDate:eachResponse.published_date,
            }))
            setApiStatus(apiStatus.success)
            setPost(postDetails)
        }
        catch(error){
            if(error.name === "TypeError"){
                setApiStatus(apiStatus.success)
            }
            else{
                setApiStatus(apiStatus.failure)
            }
        }
    }

    const onNewPost = () => {
        navigate('/newpost')
    }
   
    //dispaly Loading
    const onRenderLoading = ()=>(
        <div className="post-loading" style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </div>
    )
   
    //when it successfully fetched it will display the list of post
    const onRenderSuccess = () => (
        <div>
            {
            postDetails.length !== 0 ?
            <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost}/>
            )}
            </ul>:(
                <div className='empty-failure-list'>
                    <h1>Add New Post</h1>
                    <button type="button" className='empty-button' onClick={onNewPost}>Add Post</button>
                </div>
            )
            }
        </div>
    )
   
    //when the api fails to fetch it display failure view
    const onRenderFailure = () => (
        <div className='empty-failure-list'>
        <img style={{width:300,height:300,marginBottom:40}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcKcoquPvJ-O9WfgEYiUF34hYhzaGcrtamQ&s" alt="failure-image"/>
        <button type="button" onClick={postRendering} className='empty-button'>Retry</button>
        </div>
    )

    const onTitle = (event) => {
        setTitle(event.target.value)
    }

    const onRenderStatus = ()=>{
        switch(currentApiStatus){
            case apiStatus.loading:
                return onRenderLoading()
            case apiStatus.success:
                return onRenderSuccess()
            default:
                return onRenderFailure()
        }
    }

    useEffect(()=>{
        postRendering()
        // eslint-disable-next-line
    },[title])
return(
    <>
    <Header/>
    <div className="input-contain">
    <input type="input" className="post-input" onChange = {onTitle} value={title} placeholder='Enter a Blog'/>
    </div>
    {onRenderStatus()}
    </>
)
}

export default Posts
