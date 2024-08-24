import {useState,useEffect} from 'react'
import { ThreeDots } from 'react-loader-spinner'
import Header from '../Header'
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const EditPost = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [title,setTitle] = useState('')
    const [content,setContent] = useState('')
    const [image,setImage] = useState('')
    const [video,setVideo] = useState('')

    const onRender = ()=>{
        const editPostApiUrl = ``
    }

    const onRenderLoading = ()=>(
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )

    const onRenderSuccess = ()=>(
        <div>
            <h1>Hello</h1>
        </div>
    )

    const onRenderFailure = () => (
        <>
        <h1>Failure</h1>
        </>
    )

    const onRenderStatus = ()=>{
        switch(currentApiStatus){
            case apiStatus.loading:
                return onRenderLoading()
            case apiStatus.success:
                return onRenderSuccess()
            default:
                return onRenderFailure()
        }
    }

    useEffect(()=>{
        onRender()
    })

    return(
        <div>
            <Header/>
            {onRenderStatus()}
        </div>
    )
}

export default EditPost