import {useEffect,useContext} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import CommentList from '../CommentList'
import Context from '../../context/Context.js'
import './index.css'

const Comments = (props)=>{
    const {blogId,onRenderCount,count} = props
    const {commentDetails,setCommentDetails} = useContext(Context)
    const jwtToken = Cookies.get('jwt_token')
    const config = {
        headers: {Authorization:`Bearer ${jwtToken}`}
    }
    
    const onRenderComment = async()=>{
        const commentApiUrl = `https://sharongameblog.onrender.com/posts/${blogId}/comments/`
        const responseComment = await axios.get(commentApiUrl)
        const commentData = responseComment.data.map(eachComment=>({
            id:eachComment.id,
            userId:eachComment.user_id,
            blogId:eachComment.blog_id,
            username:eachComment.username,
            comment:eachComment.comment,
            commentDate:eachComment.comment_date
        }))
        setCommentDetails(commentData)
        onRenderCounting()
    }

    const onRenderCounting = async()=> {
        const commentCountApiUrl = `https://sharongameblog.onrender.com/comments/${blogId}`
        await axios.get(commentCountApiUrl,config)
        //below is a prop
        onRenderCount()
    }


//render the comment List
    const commentList = ()=>(
        <ul className='comment-unlist'>
        {
            commentDetails.map(eachDetail=>
            <CommentList key={eachDetail.id} commentDetails={eachDetail} onRenderComment={onRenderComment}/>
        )
        }
        </ul>
    )

//if comment is empty it will be displaed
    const noComment = () => (
        <h1 style={{textAlign:"center"}}>No Comments</h1>
    )
    useEffect(()=>{
        onRenderComment()
        // eslint-disable-next-line
    },[])

    return(
        <>
        {
            count>0?commentList():noComment()
        }
        </>
    )
}

export default Comments