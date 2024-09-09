import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import PostList from '../PostList'
import './index.css'
import { useNavigate } from 'react-router-dom'

//check the api statsus
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

//used to display UserPosts
const UserPosts = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [postDetails,setPost] = useState([])
    const navigate = useNavigate()

    //render process
    const onRender = async()=>{
        setApiStatus(apiStatus.loading)
        const postApiurl = `https://sharongameblog.onrender.com/userAuthenticatePosts/`
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
   
    //Loading Status
    const onRenderLoading = ()=>(
        <div className="post-loading" style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </div>
    )
  

    //When the data is successfully fetched
    const onRenderSuccess = () => (
        <div style={{marginTop:100}}>
            {
            postDetails.length !== 0 ?
            <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost} access={true}/>
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

    //Failure view when it fails to fetch the data
    const onRenderFailure = () => (
        <div className='empty-failure-list'>
        <img style={{width:300,height:300,marginBottom:40}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcKcoquPvJ-O9WfgEYiUF34hYhzaGcrtamQ&s" alt="failure-image"/>
        <button type="button" onClick={onRender} className='empty-button'>Retry</button>
        </div>
    )

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
    },[])
return(
    <>
    <Header/>
    <section>
        {onRenderStatus()}
    </section>
    </>
)
}

export default UserPosts
