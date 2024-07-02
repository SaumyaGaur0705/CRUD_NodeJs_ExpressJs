import React, { useState, useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import logo3 from "../assests/logo3.png"
import { Button, Navbar, TextInput } from 'flowbite-react'
import {AiOutlineMenuUnfold , AiOutlineSearch } from "react-icons/ai";
import { FaMoon} from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Header = () => {
 
  const navigate = useNavigate();
  const [sidebarOpen,setsidebarOpen]=useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
   <nav className='border p-0 px-4 m-0 flex justify-between items-center h-16 bg-white '>
      <div className='text-sm sm:text-lg font-sans hover:font-serif h-16 p-0 m-0 flex justify-between items-center gap-3'>
      <TfiMenuAlt  className='h-16 w-8 pt-4 cursor-pointer lg:hidden' onClick={()=>setsidebarOpen(true)}/>
        <Link to="/" className=' h-16'>
            <img src={logo3} alt="Logo" className="h-14 m-0 p-0" />
        </Link>
      </div>
      
      {/* MobileMenu */}

      {sidebarOpen && (
    <div className='fixed w-screen h-screen lg:hidden bg-black/20 backdrop-blur-sm top-0 right-0'>
        <div className='text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex'>
      <IoIosCloseCircleOutline onClick={() => setsidebarOpen(false)} className='mt-0 mb-8 text-3xl cursor-pointer'/>
      
      <Link to="/mypost">MyPost</Link> 
      <Link to="/newpost">Add Post</Link>  
      <Link to="/username">About</Link>  
        </div>
    </div>
      )}
     
     {/* MobileMenu */}


      <div className='text-sm sm:text-lg flex justify-between items-center gap-3'>
       
       <Link to="/mypost" className='rounded-3xl px-4 py-2 hidden lg:inline  hover:bg-slate-100 hover:text-blue-400  '>MyPost</Link>
       <Link to="/newpost" className='rounded-3xl px-4 py-2 hidden lg:inline hover:bg-slate-100 hover:text-blue-400 '>Add Post</Link> 
       <Link to="/mycollabs" className='rounded-3xl  px-4 py-2 hidden lg:inline  hover:bg-slate-100 hover:text-blue-400 '>Collabs</Link> 
       <Link to="/about" className='rounded-3xl  px-4 py-2 hidden lg:inline  hover:bg-slate-100 hover:text-blue-400 '>About</Link> 
        
        {/* <form>
            <TextInput type='text' placeholder='Search...'rightIcon={AiOutlineSearch} className='hidden lg:inline'  >
            
            </TextInput>
        </form>
        <button className='border-2 w-12 h-10 rounded-3xl px-4 lg:hidden  hover:bg-slate-100 hover:text-blue-400  font-semibold' >
            <AiOutlineSearch/>
        </button> */}
      </div>

      <div className='text-sm sm:text-lg flex space-x-4'>
        <button className='border-2 w-12 h-10 rounded-3xl px-3 hover:bg-slate-100 hover:text-blue-400  font-semibold' >
        <FaMoon/>
        </button>

        {localStorage.getItem('token') ?( <button onClick={handleLogout} className='border-2 h-10 rounded-3xl px-2 hover:bg-slate-100 hover:text-blue-400  font-semibold'>
            Logout
          </button>):(
        <Link to="/login">
        <button className='border-2 h-10 rounded-3xl px-2 hover:bg-slate-100 hover:text-blue-400  font-semibold'>
                 Sign In
        </button>
        </Link>
          )}
      </div>
   </nav>

  )
}

export default Header
