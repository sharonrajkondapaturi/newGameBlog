import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NewPost = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [genre,setGenre] = useState('Action')
    const [image,setImage] = useState('')
    const [video,setVideo] = useState('')
    const navigate = useNavigate()

    const onRender = async(event)=>{
        event.preventDefault()
        const postApiurl = `https://sharongameblog.onrender.com/posts/`
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
        if(content === "" && genre === "" && image === "" && title === ""){
            const response = await axios.post(postApiurl,postData,config)
            console.log(response)
            navigate('/userposts')
        }
        else{
            alert("Fill the details")
        }
        
    }

    const onTitle = event => {
        setTitle(event.target.value)
    }

    const onContent = event => {
        setContent(event.target.value)
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

    const onRenderSuccess = ()=>(
        <form className='edit-post' onSubmit={onRender}>
            <label htmlFor='title'>Title {star()}</label>
            <textarea type="text" id = "title" className="title-text" value={title} onChange={onTitle}/>
            <label htmlFor='genre' style={{marginTop:10}} onChange={onGenre}>Game Type Genre {star()}</label>
            <select value={genre} onChange={onGenre}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Racing">Racing</option>
                <option value="Action-Adventure-Stealth">Action-Adventure-Stealth</option>
                <option value="Survival Horror">Survival Horror</option>
            </select>
            <label htmlFor='content' style={{marginTop:10}}>Content {star()}</label>
            <textarea id = "content" value={content} className='title-content' onChange={onContent}/>
            <label htmlFor="image" style={{marginTop:10}}>Type Image Url {star()}</label>
            <input id="image" value={image} className='input-image' onChange={onImage}/>
            <label id="video" style={{marginTop:10}}>Type Video url (Optional)</label>
            <input htmlFor = "video" className='input-image' value={video} onChange={onVideo}/>
            <button type="submit" style={{marginTop:10}} className='add-post-button'>Add Post</button>
        </form>
    )


    return(
        <>
            <Header/>
            <div className='wall'>
               {onRenderSuccess()}  
            </div>
        </>
    )
}

export default NewPost
