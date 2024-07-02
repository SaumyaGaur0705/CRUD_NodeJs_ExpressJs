import React from 'react'
import logo3 from '../assests/logo3.png';
const Postcomment = ({commentimg,username,comment}) => {
  return (
    <div className="flex justify-center ">
    <div className="w-12  bg-gray3200 p-2 flex flex-col justify-between ">
    <div><img className="w-10  h-7 p-1 rounded-full ring-2 ring-gray-600 dark:ring-gray-500" src={commentimg} alt="Bordered avatar" /></div>
    
  </div>
  <div className="w-full bg-gray-300 px-4  py-2 flex flex-col rounded-xl">
    <div className='font-semibold pb-1'>{username}</div>
    <div>{comment} </div>
    <div className='border-t border-gray-700 px-4 py-2 '></div>
    </div>
    
    </div>
  )
}

export default Postcomment