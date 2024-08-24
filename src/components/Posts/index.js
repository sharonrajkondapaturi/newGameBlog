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

const Posts = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [title,setTitle] = useState('')
    const [genre,setGenre] = useState('')
    const [postDetails,setPost] = useState([])

    const onRender = async()=>{
        setApiStatus(apiStatus.loading)
        const postApiurl = `https://sharongameblog.onrender.com/posts/?title=Resident&genre=${genre}`
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
                video_url:eachResponse.video_url,
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
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )

    const onRenderSuccess = () => (
        <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost}/>
            )}
        </ul>
    )

    const onRenderFailure = () => (
        <>
        <h1>Failure</h1>
        </>
    )

    const onTitle = (event) => {
        setTitle(event.target.value)
    }

    const onGenre = (event) => {
        setGenre(event.target.value)
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
    },[title,genre])
return(
    <div className='post-background'>
    <Header/>
    <section className='input-section'>
        {onRenderStatus()}
        <aside>
            <div>
            <input type="input" onChange = {onTitle} value={title}/>
            </div>
            <div>
            <input id = "action" type="checkbox" value="Action" onClick={onGenre}/>
            <label htmlFor="action">Action</label>
            </div>
            <div>
            <input id = "adventure" type="checkbox" value="Adventure" onClick={onGenre}/>
            <label htmlFor="adventure">Adventure</label>
            </div>
            <div>
            <input id = "racing" type="checkbox" value="Racing" onClick={onGenre}/>
            <label htmlFor="racing">Racing</label>
            </div>
        </aside>
    </section>
    </div>
)
}

export default Posts