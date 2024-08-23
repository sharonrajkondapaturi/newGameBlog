import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home/'
import Login from './components/Login'
import './App.css';

const App = ()=>(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
  </Routes>
  </BrowserRouter>
)

export default App;
