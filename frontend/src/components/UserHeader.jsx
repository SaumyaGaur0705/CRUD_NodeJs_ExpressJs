import logo3 from "../assests/logo3.png";
import React, { useState } from 'react';
import { FaEllipsisH } from "react-icons/fa";
import { useToast } from '@chakra-ui/react';

const UserHeader = ({ showCopyLink, onPublicClick, onPrivateClick, handleSearchList, setSearchTerm }) => {
  const toast = useToast();
  const [sideMenu, setSideMenu] = useState(false);
  const [postPrivate, setPostPrivate] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const copyURL = () => {
    const currenturl = window.location.href;
    navigator.clipboard.writeText(currenturl).then(() => {
      toast({
        title: 'Profile Link Copied',
        description: "",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
    setSideMenu(false); 
  }

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    handleSearchList(); 
    setSearchTerm(searchTerm); 
   
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-gray-200 flex flex-col justify-between gap-4 p-4">
          <div className='flex justify-between'>
            <div className='text-3xl font-bold'>Full Name</div>
            <div>
              <img className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-600 dark:ring-gray-500" src={logo3} alt="Bordered avatar" />
            </div>
          </div>
          <div className='flex justify-between'>This is the bio of the username</div>
          <div className='flex justify-between'>
            <div className='italic'>Joined on this date</div>
            {showCopyLink &&
              (<button onClick={() => { setSideMenu(!sideMenu) }}>
                <FaEllipsisH />
              </button>)}
          </div>
          {showCopyLink && sideMenu && (
            <button className='bg-gray-300 px-2 py-1.5 border-2 font-semibold' onClick={copyURL} > Copy Link </button>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-gray-200 flex">
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
          <div className="relative w-full px-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 ml-2 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search Titles, Category..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-3xl bg-gray-200 flex">
          <div className="flex-1 border-b text-center">
            <button className={`block w-full py-2 border-b ${postPrivate ? 'border-gray-400' : 'border-black'}`}
              onClick={() => {
                setPostPrivate(false);
                onPublicClick();
              }}>Public Posts</button>
          </div>
          <div className="flex-1 border-b text-center">
            <button className={`block w-full py-2 border-b ${postPrivate ? 'border-black' : 'border-gray-400'}`}
              onClick={() => {
                setPostPrivate(true);
                onPrivateClick();
              }}>Private Posts</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHeader;
