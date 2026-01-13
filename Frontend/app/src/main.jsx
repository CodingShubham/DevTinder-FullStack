import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './Login.jsx'
import Profile from './Profile.jsx'
import Feed from './Feed.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={ <App />}>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/Feed' element={<Feed/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)
