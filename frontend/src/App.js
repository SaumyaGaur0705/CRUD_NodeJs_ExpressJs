import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './pages/Home.js';
import AddEdit from './pages/AddEdit.js';
import View from './pages/View.js';
import Nav from './components/Nav.js';


function App() {
  return (
    <>
    <Nav/> 
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/add' element={<AddEdit/>}></Route>
      <Route path='/update/:id' element={<AddEdit/>}></Route>
      <Route path='/view/:id' element={<View/>}></Route>
    </Routes>
    </>
  );
}

export default App;
