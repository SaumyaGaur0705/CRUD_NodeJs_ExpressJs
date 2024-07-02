import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { FaBookReader } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import UserHeader from '../components/UserHeader';
import axios from "axios";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [showPublicPosts, setShowPublicPosts] = useState(true);
  const [searchList, setSearchList] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/mypost');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const onDelete = async (postId) => {
    const res = await axios.delete(`http://localhost:5000/post/${postId}`);
    if (res.status === 200) {
      alert(res.data);
      fetchPosts();
    }
  };

  const handlePublicClick = () => {
    setShowPublicPosts(true);
  };

  const handlePrivateClick = () => {
    setShowPublicPosts(false);
  };

  const handleSearchList = () => {
    
    setSearchList(true);
  };

  const filteredPosts = posts.filter(post =>
    (showPublicPosts && post.status === 'Public') || (!showPublicPosts && post.status === 'Private')
  ).filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4">
      <UserHeader
        showCopyLink={false}
        onPublicClick={handlePublicClick}
        onPrivateClick={handlePrivateClick}
        handleSearchList={handleSearchList} // Pass the function to set searchList
        setSearchTerm={setSearchTerm}
      />
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="flex justify-center">
          <div className="w-full max-w-3xl bg-gray-200 p-4">
            {searchList ? (
              filteredPosts.map(post => (
                <div key={post.postid} className="bg-white rounded-lg shadow-md mb-4">
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{post.category}</p>
                    <div className="mb-4 flex justify-center">
                      {post.imageData && (
                        <img src={post.imageData} alt={post.title} className="rounded-md w-1/2 " />
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <span className="mr-2">{post.collab ? 'Collaboration' : 'Solo'}</span>
                      <span>&bull;</span>
                      <span className="ml-2">{post.status}</span> 
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: post.text_content }} />
                  </div>
                  <div className="flex gap-2 mt-4 justify-between text-xl p-4 bg-gray-200">
                    <div className="flex gap-2 items-center">
                      <CiEdit className="mt-1" /> Edit
                    </div>
                    <div className="flex gap-2 items-center">
                      <FaBookReader className="mt-1" /> Read More
                    </div>
                    <button className="flex gap-2 items-center" onClick={()=>onDelete(post.postid)}>
                      <RiDeleteBinLine className="mt-1" /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              posts.map(post => {
                if ((showPublicPosts && post.status === 'Public') || (!showPublicPosts && post.status === 'Private')) {
                  return (
                    <div key={post.postid} className="bg-white rounded-lg shadow-md mb-4">
                      <div className="p-4">
                        <h2 className="text-xl font-bold">{post.title}</h2>
                        <p className="text-sm text-gray-500 mb-2">{post.category}</p>
                        <div className="mb-4 flex justify-center">
                          {post.imageData && (
                            <img src={post.imageData} alt={post.title} className="rounded-md w-1/2 " />
                          )}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span className="mr-2">{post.collab ? 'Collaboration' : 'Solo'}</span>
                          <span>&bull;</span>
                          <span className="ml-2">{post.status}</span> 
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: post.text_content }} />
                      </div>
                      <div className="flex gap-2 mt-4 justify-between text-xl p-4 bg-gray-200">
                        <div className="flex gap-2 items-center">
                          <CiEdit className="mt-1" /> Edit
                        </div>
                        <div className="flex gap-2 items-center">
                          <FaBookReader className="mt-1" /> Read More
                        </div>
                        <button className="flex gap-2 items-center" onClick={() => onDelete(post.postid)}>
                          <RiDeleteBinLine className="mt-1" /> Delete
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return null; // Return null if the condition is not met
                }
              })
            )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsList;
