import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import PostList from '../PostList'
import './index.css'

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

    const onRender = async()=>{
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
                publishedTime:eachResponse.published_time,
                company:eachResponse.company,
                officialWebsite:eachResponse.official_website
            }))
            setApiStatus(apiStatus.success)
            setPost(postDetails)
        }
        catch{
            setApiStatus(apiStatus.failure)
        }
    }
   
    //dispaly Loading
    const onRenderLoading = ()=>(
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )
   
    //when it successfully fetched it will display the list of post
    const onRenderSuccess = () => (
        <div className='main-content'>
        <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost}/>
            )}
        </ul>
        </div>
    )
   
    //when the api fails to fetch it display failure view
    const onRenderFailure = () => (
        <>
        <img style={{width:320,height:320}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcKcoquPvJ-O9WfgEYiUF34hYhzaGcrtamQ&s" alt="failure-image"/>
        <button onClick={onRender}>Retry</button>
        </>
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
        onRender()
        // eslint-disable-next-line
    },[title])
return(
    <div className='post-ground'>
    <Header/>
    <input type="input" className="post-input" onChange = {onTitle} value={title} placeholder='Enter a Blog'/>
    {onRenderStatus()}
    </div>
)
}

export default Posts
