import Header from '../Header'
import './index.css'

const Home = ()=>{
    return(
        <div>
            <Header/>
            <section className='section-odd'>
                <aside>
                    <img src="https://i.blogs.es/b06eda/bo300/1366_2000.jpg" 
                    alt="call-of-duty" 
                    className='even-img'/>
                </aside>
                <article class="odd-article">
                    <h1>Experience the war Zone</h1>
                    <p>Call of duty Black ops 3 has Muliplayer options</p>
                </article>
            </section>
            <section className='section-even'>
                <article className='even-article'>
                    <h1>Experience the Leap of Faith</h1>
                    <p>After the Ezio Generation dive into new generation of Kenway</p>
                </article>
                <aside>
                    <img src="https://www.godisageek.com/wp-content/uploads/assassins-creed-3-remastered-review-1024x576.jpg" 
                    className='even-img'
                    alt="assassins creed"/>
                </aside>
            </section>
            <section className='section-odd'>
                <aside>
                    <img src="https://m.economictimes.com/thumb/height-450,width-600,imgsize-45140,msid-104388013/marvels-spider-man-2-set-to-release-soon-heres-all-you-need-to-know.jpg" 
                    alt="marvel-spiderman"
                    className='even-img'
                    />
                </aside>
                <article className='odd-article'>
                    <h1>Experience the war Zone</h1>
                    <p>Call of duty Black ops 3 has Muliplayer options</p>
                </article>
            </section>
        </div>
    )
}

export default Home