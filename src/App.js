import {useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/'
import Register from './components/Register';
import Login from './components/Login'
import Posts from './components/Posts'
import UserPosts from './components/UserPosts';
import Blog from './components/Blog';
import EditPost from './components/EditPost'
import NewPost from './components/NewPost'
import ProtectedRoute from './components/ProtectedRoutes';
import Context from './context/Context.js'
import './App.css';

//there are the routes which has private and public routes
const App = ()=>{
  let commentRendering = (()=>{

  });

  const [commentCount,setCount] = useState('')

  return(
  <Context.Provider value={{commentRendering,commentCount,setCount}}>
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/posts" element={<Posts/>}/>
      <Route path="/posts/:id" element={<Blog/>}/>
      <Route element={<ProtectedRoute/>}>
          <Route path="/newpost" element={<NewPost/>}/>
          <Route path="/editpost/:id" element={<EditPost/>}/>
          <Route path="/userposts" element={<UserPosts/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
  </Context.Provider>
  )

}
export default App;
