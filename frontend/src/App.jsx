import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';


import Header from './components/Header';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import UserPage from './pages/UserPage';
import NewPost from './pages/NewPost';
import Homenew from './pages/Homenew';
import PostPage from './pages/PostPage';
import Collab from './pages/Collab';
import About from './pages/About';

function App() {
  return (
    <>
      <Header/> 
      <Routes>
        
     
        <Route path='/username' element={<UserPage/>} />
        <Route path='/username/post/:pid' element={<PostPage/>} />
        <Route path='/about' element={<About/>}/>
        <Route path='/signUp' element={<SignUp/>} />
        <Route path='/login' element={<LogIn/>} />
        <Route path='/newpost' element={<NewPost/>}/>
        <Route path='/mypost' element={<Homenew/>}/>
        <Route path='/mycollabs' element={<Collab/>}/>
      </Routes>
    </>
  );
}

export default App;
