import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Blog = () => {
    const [post,setPost] = useState([])
    const {id} = useParams()
    const onRender = async() =>{
        const postApiurl = `https://sharongameblog.onrender.com/posts/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const response = await axios.get(postApiurl,jwtToken)
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
    setPost(...postDetails)
}

    useEffect(()=>{
        onRender()
    },[])
    
    return(
        <div className='blog'>
            <Header/>
            <section className='blog-section'>
                <center>
                <img src={post.imageUrl} alt={post.title} className='blog-img'/>
                <h1 className='blog-title'>{post.title}</h1>
                </center>
                <p className='blog-para'>{post.content}</p>
            </section>

        </div>
    )
}

export default Blog