import {useState,useEffect,useContext} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import CommentList from '../CommentList'
import Context from '../../context/Context.js'
import './index.css'

const Comments = (props)=>{
    const {blogId} = props
    const [commentDetails,setCommentDetails] = useState([])
    const [commentStatement,setCommentState] = useState(false)
    const {setCount} = useContext(Context)
    let {commentRendering} = useContext(Context)
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
        try{
            if(commentData.length !== 0){
                setCommentDetails(commentData)
                setCommentState(true)
                commentRendering()
                onRenderCount()
            }
        }
        catch{
            setCommentState(false)
        }
    }

    const onRenderCount = async()=> {
        const commentCountApiUrl = `https://sharongameblog.onrender.com/comments/${blogId}`
        const counts = await axios.get(commentCountApiUrl,config)
        setCount(counts.data.comments_count)
       }

    

//render the comment details
    commentRendering = (()=>{
        onRenderComment()
    })

//render the comment List
    const commentList = ()=>(
        <ul className='comment-unlist'>
        {
            commentDetails.map(eachDetail=>
            <CommentList key={eachDetail.id} commentDetails={eachDetail} commentRender={onRenderComment}/>
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
            commentStatement?commentList():noComment()
        }
        </>
    )
}

export default Comments