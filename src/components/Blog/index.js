import {useState,useEffect,useContext} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { FaCircleUser } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import Header from '../Header'
import Comments from '../Comments'
import Context from '../../context/Context.js'
import './index.css'

//Display The Blog
const Blog = () => {
    const [post,setPost] = useState([])
    const [comment,setComment] = useState('')
    const {commentCount,setCount} = useContext(Context)
    const {id} = useParams()
    const jwtToken = Cookies.get('jwt_token')
    const config = {
        headers: {Authorization:`Bearer ${jwtToken}`}
    }

    const onRender = async() =>{
        const postApiurl = `https://sharongameblog.onrender.com/posts/${id}`
        const response = await axios.get(postApiurl,config)
        const postDetails = response.data.map(eachResponse=>({
            title:eachResponse.title,
            genre:eachResponse.genre,
            imageUrl:eachResponse.image_url,
            content:eachResponse.content,
            videoUrl:eachResponse.video_url,
            publishedBy:eachResponse.published_by,
            publishedDate:eachResponse.published_date,
        }))
        setPost(...postDetails)
   }     

   const onRenderCount = async()=> {
    const commentCountApiUrl = `https://sharongameblog.onrender.com/comments/${id}`
    const counts = await axios.get(commentCountApiUrl,config)
    setCount(counts.data.comments_count)
   }

const onNewComment = async(commentInput)=>{
    const newCommentData = {
        blog_id:id,
        comment:commentInput
    }
    const newCommentApiUrl = `https://sharongameblog.onrender.com/posts/${id}/comments/`
    await axios.post(newCommentApiUrl,newCommentData,config)
    onRenderCount()
    setComment('')
}
    
const onCancel = ()=>{
    setComment('')
}

const onComment = ()=>{
    if(comment.length === 0){
        setComment('')
    }
    else{
        onNewComment(comment)
    }
}

const onColorComment = (event)=>{
    setComment(event.target.value)
}


    useEffect(()=>{
        onRender()
        // eslint-disable-next-line
    },[])

    useEffect(()=>{
        onRenderCount()
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
                    <span style={{paddingRight:10}}>Genre:</span>
                    <span> {post.genre}</span>
                </article>
                <p className='blog-para'>{post.content}</p>
            </section>
            <section className='comment-section'>
                <h1>{commentCount!== 0?commentCount:null} Comments</h1>
                <article className='comment-article'>
                    <FaCircleUser size={40} style={{marginRight:20}}/>
                    <div className='comment-details'>
                        <input type="text" className='comment-input'onChange={onColorComment} placeholder="Add a comment ..." value={comment}/>
                        <div className='comment-rows'>
                            <button type="button" className="comment-cancel" onClick={onCancel} style={{marginRight:10}}>Cancel</button>
                            <button type="button" className= {comment.length > 0 ? "comment-button-color":"comment-button-no-color"}  onClick={onComment} value={comment}>Comment</button>
                        </div>
                    </div>
                </article>
            </section>
            <section>
                <Comments blogId={id}/>
            </section>
        </div>
    )
}

export default Blog
