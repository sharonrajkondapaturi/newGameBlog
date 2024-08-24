import './index.css'

const PostList = props =>{
    const {posts} = props
    const {id,user_id,title,content,imageUrl,publishedBy,publishedDate} = posts

    return(
        <li className='post-list'>
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