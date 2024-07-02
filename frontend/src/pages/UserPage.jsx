import React, { useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import logo from '../assests/logo.png'
import logo3 from '../assests/logo3.png'
import logo1 from '../assests/logo1.png'
const UserPage = () => {
  
  return (
    <div>
        <UserHeader showCopyLink={true}/>
        <UserPost  username="Saumya Gaur" likes={1200} comments={481} postimg={logo} postTitle="All about D-scribe" para={false}/>
        <UserPost  username="Saumya Gaur" likes={1200} comments={481} postimg={logo3} postTitle="All about D-scribe" para={false}/>
        <UserPost  username="Saumya Gaur" likes={1200} comments={481} postimg={logo1} postTitle="All about D-scribe" para={false}/>
   </div>
  )
}

export default UserPage