import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { FaLock,FaLockOpen } from "react-icons/fa";
import { RiSearchLine } from "react-icons/ri";
import UserSearch from '../components/UserSearch';


const NewPost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [collab, setCollab] = useState(false);
  const [status, setStatus] = useState('Public');
  const [text, setText] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('collab', collab);
    formData.append('status', status);
    formData.append('text', text);
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/addPost', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post Successfull');
      setTitle('');
      setCategory('Uncategorized');
      setCollab(true);
      setStatus('Public');
      setText('');
      setDropdown(false);
      setFile(null);
      navigate('/mypost');
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCollabToggle = () => {
    setCollab(!collab);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    setDropdown(false);
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between h-12'>
          <input
            type='text'
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            id='title'
            className='flex-1 rounded-xl p-4 border mt-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className='mt-2 w-36 rounded-xl border-gray-300 focus:ring-blue-500'
          >
            <option value='Uncategorized'>Category</option>
            <option value='Technology'>Technology</option>
            <option value='Travel'>Travel</option>
            <option value='Food'>Food</option>
            <option value='Fashion'>Fashion</option>
            <option value='Lifestyle'>Lifestyle</option>
            <option value='Education'>Education</option>
            <option value='Sports'>Sports</option>
            <option value='Health & Fitness'>Health & Fitness</option>
            <option value='Finance'>Finance</option>
            <option value='Arts & Culture'>Arts & Culture</option>
          </select>
        </div>
         
        

        {/* Other form elements */}

        <div className='w-full border border-gray-300 flex mt-2 rounded-xl p-2 justify-between relative bg-white'>
        <div className='relative flex-1 flex-col w-24'>
            <div
              className={`w-24 border border-gray-300  py-1 cursor-pointer rounded-xl hover:bg-slate-100   flex gap-8   ${
                dropdown ? 'rounded-sm bg-slate-100 ' : ''
              }`}
              onClick={() => setDropdown(!dropdown)} 
            >
              <div className='flex px-4'>{status} <RiArrowDropDownLine className=' pb-1 text-3xl text-gray-600 '/></div>
            </div>

            {dropdown && (
              <div className='absolute top-full left-0 w-32 pl-2 border border-gray-300 flex-1 flex-col bg-white'>
                <label className='flex items-center bg-white'>
                  <input
                    type='radio'
                    value='Public'
                    checked={status === 'Public'}
                    onChange={() => handleStatusChange('Public')}
                    name='status'
                    className='mr-2'
                  />
                  Public<FaLockOpen />
                </label>

                <label className='flex items-center bg-white'>
                  <input
                    type='radio'
                    value='Private'
                    checked={status === 'Private'}
                    onChange={() => handleStatusChange('Private')}
                    name='status'
                    className='mr-2'
                  />
                  Private <FaLock />
                </label>
              </div>
            )}
          </div>
         {
         <div className='mt-2 flex-1'>
            {collab ? (
              <div className='flex gap-2'>
                <FaToggleOn className='text-2xl' onClick={handleCollabToggle} />
                <p className=''>Allow Collaboration</p>
              </div>
            ) : (
              <div className='flex gap-2'>
                <FaToggleOff className='text-2xl' onClick={handleCollabToggle} />
                <p className=''>No Collaboration</p>
              </div>
            )}
          </div>}
          {
            
            <div className=''>
            {collab===true&&
           
          <UserSearch/>
           
         
            
            }
            </div>
          }
          
        </div>
        

        <div className='border-2 border-gray-300 border-dotted p-3'>
          <label
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            htmlFor='file_input'
          >
            Upload Thumbnail
          </label>
          <input
            className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
            aria-describedby='file_input_help'
            id='file_input'
            type='file'
            onChange={handleFileUpload}
          />
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-300' id='file_input_help'>
            PNG, JPG or JPEG.
          </p>
        </div>


        <ReactQuill
          theme='snow'
          value={text}
          onChange={setText}
          placeholder='Write Something....'
          className='h-40'
        />
        
        <div className='flex justify-center mt-6'>
          <button type='submit' className='border border-gray-300 w-44 rounded-xl mt-4 p-2  hover:bg-slate-100 hover:text-blue-400 hover:font-'>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
