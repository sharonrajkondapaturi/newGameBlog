import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import Header from '../Header'
import './index.css'

//Display The Blog
const Blog = () => {
    const [post,setPost] = useState([])
    const {id} = useParams()
    const onRender = async() =>{
        const postApiurl = `https://sharongameblog.onrender.com/posts/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }

    const response = await axios.get(postApiurl,config)
    const postDetails = response.data.map(eachResponse=>({
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
    setPost(...postDetails)
}

    useEffect(()=>{
        onRender()
        // eslint-disable-next-line
    },[])
    
    return(
        <div className='blog'>
            <Header/>
            <section className='blog-section'>
                <center>
                <img src={post.imageUrl} alt={post.title} className='blog-img'/>
                <h1 className='blog-title'>{post.title}</h1>
                </center>
                <article className='blog-details'>
                    <FaCircleUser size={30} style={{paddingRight:10,paddingBottom:10}}/>
                    <span>{post.publishedBy}</span>
                </article>
                <article className='blog-details'>
                    <CiCalendarDate size={30} style={{paddingRight:10,paddingBottom:10}}/>
                    <span>{post.publishedDate}</span>
                </article>
                <article className='blog-details'>
                    <FaRegClock size={30} style={{paddingRight:10,paddingBottom:10}}/>
                    <span>{post.publishedTime}</span>
                </article>
                <article className='blog-details'>
                    <span style={{paddingRight:10}}>Genre:</span>
                    <span> {post.genre}</span>
                </article>
                <p className='blog-para'>{post.content}</p>
            </section>

        </div>
    )
}

export default Blog
