import {useState,useEffect} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Home = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    
    const onRender = ()=>{
        setApiStatus(apiStatus.loading)
        setApiStatus(apiStatus.success)
    }
    const onRenderLoading = ()=>(
    <center style={{marginTop:100}}>
        <ThreeDots visible={true} height="80" width="80"/>
    </center>
    )

const onRenderSuccess = () =>(
    <>
    <section className='section-odd'>
    <aside>
        <img src="https://i.blogs.es/b06eda/bo300/1366_2000.jpg" 
        alt="call-of-duty" 
        />
    </aside>
    <article>
        <h1>Experience the war Zone</h1>
        <p>Call of duty Black ops 3 has Muliplayer options</p>
    </article>
    </section>
    <section className='section-even'>
        <article className='even-article'>
            <h1>Experience the Leap of Faith towards the Generation of Kenway</h1>
            <p>After the Ezio Generation dive into new generation of Kenway timeline</p>
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
        />
    </aside>
    <article>
        <h1>Swing over the city of New York and many cities</h1>
        <p>Peter Parker and Spiderman will save the neighbourhood</p>
    </article>
    </section>
    <section className='section-even'>
        <article className='even-article'>
            <h1>Can we Forget the horrror of Racoon City</h1>
            <p>Will Leon and Claire save the Nightmare of the Nightmare</p>
        </article>
        <aside>
            <img src="https://m.media-amazon.com/images/I/71vgPG6gLiL._AC_UF1000,1000_QL80_.jpg" 
            className='even-img'
            alt="resident-evil"/>
        </aside>
    </section>
    </>
)
    const onRenderStatus = ()=>{
        switch(currentApiStatus){
            case apiStatus.loading:
                return onRenderLoading()
            case apiStatus.success:
                return onRenderSuccess()
            default:
                return null
        }
    }

    useEffect(()=>{
        onRender()
    },[])
    return(
        <div>
            <Header/>
            {onRenderStatus()}
        </div>
    )
}

export default Home