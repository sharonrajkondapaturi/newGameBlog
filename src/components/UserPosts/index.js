import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
import PostList from '../PostList'
import './index.css'

const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const UserPosts = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [postDetails,setPost] = useState([])

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
                publishedTime:eachResponse.published_time,
                company:eachResponse.company,
                officialWebsite:eachResponse.official_website
            }))
            console.log(postDetails)
            setApiStatus(apiStatus.success)
            setPost(postDetails)
        }
        catch{
            setApiStatus(apiStatus.failure)
        }
    }

    const onRenderLoading = ()=>(
        <ThreeDots visible={true} height="80" width="80"/>
    )

    const onRenderSuccess = () => (
        <div className='main-content'>
            {
                postDetails.length !== 0 ?
                <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost} access={true}/>
            )}
            </ul>:<h1>Add New Post</h1>
            }
        </div>
    )

    const onRenderFailure = () => (
        <>
        <h1>Failure</h1>
        </>
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
    <div className='post-background'>
    <Header/>
    <section className='input-section'>
        {onRenderStatus()}
    </section>
    </div>
)
}

export default UserPosts