import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/'
import Login from './components/Login'
import Posts from './components/Posts'
import UserPosts from './components/UserPosts';
import Blog from './components/Blog';
import EditPost from './components/EditPost'
import './App.css';

const App = ()=>(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/posts" element={<Posts/>}/>
    <Route path="/userposts" element={<UserPosts/>}/>
    <Route path="/posts/:id" element={<Blog/>} />
    <Route path="/editpost" element={<EditPost/>}/>
  </Routes>
  </BrowserRouter>
)

export default App;
