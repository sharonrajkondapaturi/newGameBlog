import {useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import CommentList from '../CommentList'
import './index.css'

const Comments = (props)=>{
    const {blogId} = props
    const [commentDetails,setCommentDetails] = useState([])
    const [commentStatement,setCommentState] = useState(false)
    const onRenderComment = async()=>{
        const commentApiUrl = `https://sharongameblog.onrender.com/posts/${blogId}/comments/`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const responseComment = await axios.get(commentApiUrl,config)
        const commentData = responseComment.data.map(eachComment=>({
            id:eachComment.id,
            userId:eachComment.user_id,
            blogId:eachComment.blog_id,
            username:eachComment.username,
            comment:eachComment.comment,
            commentDate:eachComment.comment_date
        }))
        try{
            if(commentData.length !== 0){
                setCommentDetails(commentData)
                setCommentState(true)
            }
        }
        catch{
            setCommentState(false)
        }
    }

    const commentList = ()=>(
        <ul className='comment-unlist'>
        {
            commentDetails.map(eachDetail=>
            <CommentList key={eachDetail.id} commentDetails={eachDetail}/>
        )
        }
        </ul>
    )

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
            commentStatement?commentList():noComment()
        }
        </>
    )
}

export default Comments