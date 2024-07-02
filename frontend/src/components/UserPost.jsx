import {useState,React} from 'react'
import logo3 from "../assests/logo3.png";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { Link , useNavigate} from 'react-router-dom';
import { FaArrowsRotate } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
const UserPost = ({username,likes,comments,postimg,postTitle,para}) => {
  const [likesCount,setLikesCount]=useState(0);
  const [liked, setLiked]=useState(false);
  
  const toggleLike=()=>{
    if(likesCount === 0){
      setLikesCount(likesCount+1);
      setLiked(true);
    } else {
      setLikesCount(likesCount-1);
      setLiked(false);
    }
  };

  return (
   <>
   <Link to='/username/post/:pid'>
   <div className="flex justify-center ">
    {/* Each post */}
  <div className="w-full max-w-3xl bg-gray-200 flex p-4 ">
  
      <div className="w-12  bg-gray-200 p-2 flex flex-col justify-between ">
        <div><img className="w-10  h-7 p-1 rounded-full ring-2 ring-gray-600 dark:ring-gray-500" src={logo3} alt="Bordered avatar" /></div>
        <div className='h-full border-r-2 border-gray-300 mr-3 my-2'> </div>
      </div>
      <div className="w-full bg-gray-300 px-4  py-2 flex flex-col rounded-xl">
        <div className='font-semibold'>{username}</div>
        <div>{postTitle}</div>
        <div className='flex-grow flex items-center justify-center p-4'><img className='h-40 rounded-xl ' src={postimg}/></div>
        {
          para&&<div>Paragraph</div>
        }
        <div className='items-start justify-start sm:h-10 h-8 bg-gray-200 rounded-xl flex gap-2'>
          {/* <div className='heart-bg'>
          <div className={`heart-icon ${liked?'liked':''} relative`} onClick={toggleLike}>
          
          </div>
          </div> */}
          {/* <div className='likes-amount'>{likesCount}</div> */}
          <div className="relative">
          <FaHeart className={` ml-4 mt-2 sm:text-2xl ${liked?'text-red-600':'text-gray-500'}`}  onClick={toggleLike}/>
          
          </div>
          <div className="relative">
           <FaRegComment className='ml-4 sm:text-2xl  text-gray-500 mt-2' />
             <span className="absolute top-0 left-0  flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 mt-2 pt-5 font-semibold">
                Comments
  </span>
</div>
<div className="relative">
  <FaArrowsRotate className='ml-4 sm:text-2xl  text-gray-500 mt-2' />
  <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 mt-2 pt-7 pl-4 font-semibold">
    Repost
  </span>
</div>
<div className="relative">
  <IoPaperPlane className='ml-4 sm:text-2xl  text-gray-500 mt-2' />
  <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 mt-2 pt-7 pl-4 font-semibold">
    Share
  </span>
</div>

         
        </div>
       <div className='flex justify-start items-start text-gray-600'> {likes} likes . {comments} comments</div>
      
      </div>
    </div>
   
  
</div>
</Link>
        </> 
  )
}

export default UserPost