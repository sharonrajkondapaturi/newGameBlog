import { useNavigate } from 'react-router-dom'
import './index.css'

const PostList = props =>{
    const {posts} = props
    const {id,title,imageUrl,publishedBy,publishedDate} = posts
    const navigate = useNavigate()
    
    const onRedirect = () =>{
        navigate(`/posts/${posts.id}`)
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
            </article>
        </li>
    )
}

export default PostList