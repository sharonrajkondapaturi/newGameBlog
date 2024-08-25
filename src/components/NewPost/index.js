import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NewPost = ()=>{
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [genre,setGenre] = useState('')
    const [image,setImage] = useState('')
    const [video,setVideo] = useState('')
    const [offWeb,setWeb] = useState('')
    const [company,setCompany] = useState('')
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
            official_website:offWeb,
            image_url:image,
            video_url:video,
            company:company,
        }
        console.log(postData)
        const response = await axios.post(postApiurl,postData,config)
        console.log(response)
        navigate('/userposts')
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

    const onWeb = event => {
        setWeb(event.target.value)
    }

    const onCompany = event => {
        setCompany(event.target.value)
    }

    const onRenderSuccess = ()=>(
        <form className='edit-post' onSubmit={onRender}>
            <label htmlFor='title'>Title</label>
            <textarea type="text" id = "title" className="title-text" value={title} onChange={onTitle}/>
            <label htmlFor='genre' style={{marginTop:10}} onChange={onGenre}>Game Type Genre</label>
            <select value={genre} onChange={onGenre}>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Racing">Racing</option>
                <option value="Action-Adventure-Stealth">Action-Adventure-Stealth</option>
                <option value="Survival Horror">Survival Horror</option>
            </select>
            <label htmlFor='content' style={{marginTop:10}}>Content</label>
            <textarea id = "content" value={content} className='title-content' onChange={onContent}/>
            <label htmlFor="image" style={{marginTop:10}}>Type Image Url</label>
            <input id="image" value={image} className='input-image' onChange={onImage}/>
            <label id="video" style={{marginTop:10}}>Copy Embeded url</label>
            <input htmlFor = "video" className='input-image' value={video} onChange={onVideo}/>
            <label htmlFor="web" style={{marginTop:10}}>officialWebsite</label>
            <input id="web" value={offWeb} className='input-image' onChange={onWeb}/>
            <label htmlFor="company" style={{marginTop:10}}>company</label>
            <input id="company" value={company} className='input-image' onChange={onCompany}/>
            <button type="submit" style={{marginTop:10}}>submit</button>
        </form>
    )


    return(
        <div>
            <Header/>
            {onRenderSuccess()}
        </div>
    )
}

export default NewPost
