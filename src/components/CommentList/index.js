import {useState} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import axios from 'axios'
import './index.css'

const CommentList = (props)=>{
    const {commentDetails,onRenderComment} = props
    const {id,blogId,username,commentDate,comment} = commentDetails
    const [tempComment,setTempComment] = useState(comment)
    const [isEdited,setEdit] = useState(false)
    const newCommentDate = formatDistanceToNow(commentDate)
    const getName = localStorage.getItem("username")

    const onEdit = ()=>{
        setEdit(prevState=> !prevState)
    }

    const onTempComment = event =>{
        setTempComment(event.target.value)
    }

    const onEditConfirm = async()=>{
        const jwtToken = Cookies.get('jwt_token')
        const commentEditApiUrl = `https://sharongameblog.onrender.com/posts/${blogId}/comments/${id}`
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const editComment = {
            comment:tempComment
        }
        await axios.put(commentEditApiUrl,editComment,config)
        onRenderComment()
        setEdit(prevState=>!prevState)
    }

    const onDelete = async()=>{
        const jwtToken = Cookies.get('jwt_token')
        const commentDeleteApiUrl = `https://sharongameblog.onrender.com/comments/${id}`
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        await axios.delete(commentDeleteApiUrl,config)
        onRenderComment()
    }

    const commentChange = ()=>(
        <>
        {isEdited?null:(
        <div className="edit-rows">
            <button type="button" className='comment-change-edit' onClick={onEdit}>Edit</button>
            <button type="button" className='comment-change-delete' onClick={onDelete}>Delete</button>
        </div>)}
        </>
    )

    return(
        <li className="comment-list">
            <div className="comment-user">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" className="user"/>
            <div className="comment-user-details">
                <span style={{color:"#3078f2"}} className="user-name">@{username} </span>
                <span style={{color:"#919090"}} className="user-date">{newCommentDate} ago</span>
                {isEdited?(<div className='comment-edit-container'>
                <input type="text" className='comment-edit-input' value={tempComment} onChange={onTempComment}/>
                <button type="button" onClick={onEditConfirm} className='confirm-button'>confirm</button>
                </div>):<p className='comment-para'>{comment}</p>}
                {getName === username?commentChange():null}
            </div>
            </div>
        </li>
    )
}

export default CommentList