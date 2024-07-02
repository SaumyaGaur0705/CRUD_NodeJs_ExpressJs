import React from 'react'
import UserPost from '../components/UserPost'
import logo from '../assests/logo.png'
import Postcomment from '../components/Postcomment.jsx'

const PostPage = () => {
  return (
    <>
    <UserPost username="Saumya Gaur" likes={1200} comments={481} postimg={logo} postTitle="All about D-scribe" para={true}/>
    <div className="flex justify-center ">
    <div className="w-full max-w-3xl bg-gray-200 flex p-4 ">
    <div className="w-12  bg-gray-200 p-2 flex flex-col justify-between ">
      </div>
      <div className="w-full bg-gray-300 px-4  py-2 flex flex-col rounded-xl">
      <div className='border-t border-gray-700 px-4 py-2 '></div>
      <Postcomment commentimg={logo} username="saumya" comment="Trial comment for trial post"/>
      <Postcomment commentimg={logo} username="saumya" comment="Trial comment for trial post"/>
      <Postcomment commentimg={logo} username="saumya" comment="Trial comment for trial post"/>
      </div>
      </div>
   
    </div>
    </>
  )
}

export default PostPage