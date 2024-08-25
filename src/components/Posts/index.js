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
    const [postDetails,setPost] = useState([])
    const [action,setaction] = useState(false)
    const [adventure,setadventure] = useState(false)
    const [racing,setracing] = useState(false)
    const [horror,sethorror] = useState(false)
    const [genre,setGenre] = useState('')

    const onRender = async()=>{
        setApiStatus(apiStatus.loading)
        const postApiurl = `https://sharongameblog.onrender.com/posts/?title=${title}&genre=${genre}`
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
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )

    const onRenderSuccess = () => (
        <div className='main-content'>
            <ul className='post-unlist'>
            {postDetails.map(eachPost=>
                <PostList key={eachPost.id} posts={eachPost}/>
            )}
        </ul>
        </div>
    )

    const onRenderFailure = () => (
        <>
        <h1>Failure</h1>
        </>
    )

    const onTitle = (event) => {
        setTitle(event.target.value)
    }

    const onToggleAction = () => {
        setaction(prevState=> !prevState)
        setadventure(false)
        setracing(false)
        sethorror(false)
        setGenre("Action")
    }
    const onToggleAdventure = () => {
        setaction(false)
        setadventure(prevState=> !prevState)
        setracing(false)
        sethorror(false)
        setGenre("Adventure")
    }
    const onToggleRacing = () => {
        setaction(false)
        setadventure(false)
        setracing(prevState=> !prevState)
        sethorror(false)
        setGenre("Racing")
    }
    const onToggleHorror = () => {
        setaction(false)
        setadventure(false)
        setracing(false)
        sethorror(prevState=> !prevState)
        setGenre("Survival horror")
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
    },[title,genre])
return(
    <div>
    <Header/>
    <section className='input-section'>
        {onRenderStatus()}
        <aside>
            <div>
            <input type="input"  onChange = {onTitle} value={title}/>
            </div>
            <div>
            <input id = "action" type="radio" checked={action} value={genre} onClick={onToggleAction}/>
            <label htmlFor="action">Action</label>
            </div>
            <div>
            <input id = "adventure" type="radio" checked={adventure} value={genre} onClick={onToggleAdventure}/>
            <label htmlFor="adventure">Adventure</label>
            </div>
            <div>
            <input id = "racing" type="radio" checked={racing} value={genre} onClick={onToggleRacing}/>
            <label htmlFor="racing">Racing</label>
            </div>
            <div>
            <input id = "survival" type="radio" checked={horror} value={genre} onClick={onToggleHorror}/>
            <label htmlFor="survival">Survival Horror</label>
            </div>
        </aside>
    </section>
    </div>
)
}

export default Posts