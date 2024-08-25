import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './index.css'

const PostList = props =>{
    const {posts,access} = props
    const {id,title,imageUrl,publishedBy,publishedDate,content,videoUrl,genre,officialWebsite} = posts
    const postData = {
        id,title,imageUrl,content,videoUrl,genre,officialWebsite
    }
    const navigate = useNavigate()
    
    const onRedirect = () =>{
        navigate(`/posts/${id}`)
    }

    const onDelete = async() => {
        const deletePostApiUrl = `https://sharongameblog.onrender.com/posts/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`} 
        }
        await axios.delete(deletePostApiUrl,config)
        window.location.reload()
    }

    const onEdit = () =>{
        navigate(`editpost/${id}`)
    }

    return(
        <li className='post-list'>
            <aside onClick={onRedirect}>
            <img src={imageUrl} alt={title} className='post-image'/>
            </aside>
            <article className='post-article'>
                <h1 className='post-title'>{title}</h1>
                <p className="publish">PublishedBy: {publishedBy}</p>
                <p className='publish'>PublishedDate: {publishedDate}</p>
                {access?(
                <article>
                    <Link to= {`/editpost/${id}`} state={postData} style={{textDecoration:"none"}}>
                    <button type="button" className='edit-button' onClick={onEdit} >
                        <FaEdit/>
                        Edit
                    </button>
                    </Link>
                    <button type="button" className='delete-button' onClick={onDelete}>
                        <MdDelete/>
                        Delete
                    </button>
                </article>
            ):null}
            </article>
        </li>
    )
}

export default PostList