import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate,useLocation,useParams} from 'react-router-dom'
import {FidgetSpinner} from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

//To Edit the blog
const EditPost = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [genre,setGenre] = useState('')
    const [image,setImage] = useState('')
    const [video,setVideo] = useState('')
    const [titleError,setTitleError] = useState('')
    const [contentError,setContentError] = useState('')
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const {id} = useParams()

    const onRender = async(event)=>{
        event.preventDefault()
        const postApiurl = `https://sharongameblog.onrender.com/posts/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const postData = {
            title:title,
            content:content,
            genre:genre,
            image_url:image,
            video_url:video,
        }
        if(content !== "" && genre !== "" && image !== "" && title !== ""){
            if(title.length < 10 && content.length < 100){
                setTitleError(true)
                setContentError(true)
            }
            else if(title.length < 10){
                setTitleError(true)
                setContentError(false)
            }
            else if(content.length < 100){
                setTitleError(false)
                setContentError(true)
            }
            else{
                setLoading(true)
                await axios.put(postApiurl,postData,config)
                navigate('/userposts')
            }
        }
        else{
            alert("Seems like one of the details is Empty")
        }
        
    }

    //Below aere triggered while editing the blog

    const onTitle = event => {
        setTitle(event.target.value)
        setTitleError(false)
    }

    const onContent = event => {
        setContent(event.target.value)
        setContentError(false)
    }

    const onGenre = event => {
        setGenre(event.target.value)
    }

    const onImage = event => {
        setImage(event.target.value)
    }

    const onVideo = event => {
        setVideo(event.target.value)
    }

    const star = () => (
        <span style={{color:"#ed154f",fontWeight:'bolder'}}>*</span>
    )

    const onLoading = ()=>(
        <center style={{marginTop:10,marginBottom:10}}>
            <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
        </center>
    )

    useEffect(()=>{
        setTitle(location.state.title)
        setContent(location.state.content)
        setImage(location.state.imageUrl)
        setVideo(location.state.videoUrl)
        setGenre(location.state.genre)
        // eslint-disable-next-line
    },[location.state.title,location.state.content,location.state.imageUrl,location.state.videoUrl])

    const onRenderSuccess = ()=>(
        <form className='edit-post' onSubmit={onRender}>
            <label htmlFor='title'>Update Title {star()}</label>
            <textarea type="text" id = "title" className="title-text" value={title} onChange={onTitle}/>
            {titleError?<p className='register-error'>* Title length should be minium 10</p>:null}
            <label htmlFor='genre' style={{marginTop:10}} onChange={onGenre}>Game Type Genre {star()}</label>
            <select value={genre} onChange={onGenre}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Racing">Racing</option>
                <option value="Action-Adventure-Stealth">Action-Adventure-Stealth</option>
                <option value="Survival Horror">Survival Horror</option>
            </select>
            <label htmlFor='content'>Content {star()}</label>
            <textarea id = "content" value={content} className='title-content' onChange={onContent}/>
            {contentError?<p className='register-error'>* Content length should be minium 100</p>:null}
            <label htmlFor="image" style={{marginTop:10}}>Update Image Url {star()}</label>
            <input id="image" value={image} className='input-image' onChange={onImage}/>
            <label id="video" style={{marginTop:10}}>Update Video Url {star()}</label>
            <input htmlFor = "video" className='input-image' value={video} onChange={onVideo}/>
            {loading?onLoading():null}
            <button style={{marginTop:10}} type="submit" className='update-post-button'>Update Post</button>
        </form>
    )


    return(
        <>
        <div className='wall'>
            <Header/>
            {onRenderSuccess()}
        </div>
        </>
    )
}

export default EditPost
