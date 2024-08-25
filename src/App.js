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
import './App.css';

//there are the routes which has private and public routes
const App = ()=>(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/posts" element={<Posts/>}/>
    <Route path="/posts/:id" element={<Blog/>} />
    <Route element={<ProtectedRoute/>}>
    <Route path="/newpost" element={<NewPost/>}/>
    <Route path="/editpost/:id" element={<EditPost/>}/>
    <Route path="/userposts" element={<UserPosts/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
)

export default App;
