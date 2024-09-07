
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentList = (props)=>{
    const {commentDetails} = props
    const {username,commentDate,comment} = commentDetails
    const newCommentDate = formatDistanceToNow(commentDate)

    return(
        <li className="comment-list">
            <div className="comment-user">
            <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" className="user"/>
            <div className="comment-user-details">
                <span style={{color:"#3078f2"}} className="user-name">@{username} </span>
                <span style={{color:"#919090"}} className="user-date">{newCommentDate} ago</span>
                <p className='comment-para'>{comment}</p>
            </div>
            </div>
        </li>
    )
}

export default CommentList