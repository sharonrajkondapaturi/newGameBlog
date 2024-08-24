import { useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import './index.css'

const PostList = props =>{
    const {posts,access} = props
    const {id,title,imageUrl,publishedBy,publishedDate} = posts
    const navigate = useNavigate()
    
    const onRedirect = () =>{
        navigate(`/posts/${id}`)
    }
    
    return(
        <li className='post-list' onClick={onRedirect}>
            <aside >
            <img src={imageUrl} alt={title} className='post-image'/>
            </aside>
            <article className='post-article'>
                <h1 className='post-title'>{title}</h1>
                <p>PublishedBy: {publishedBy}</p>
                <p>PublishedDate: {publishedDate}</p>
                {access?(
                <article>
                    <button className='edit-button'>
                        <FaEdit/>
                        Edit
                    </button>
                    <button className='delete-button'>
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