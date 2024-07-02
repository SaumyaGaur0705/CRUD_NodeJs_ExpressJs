import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo3 from "../assests/logo3.png"

function SignUp() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/auth/signup", { firstname, lastname, email, password })
      .then(() => {
        alert('Registration Successful');
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const responseData = error.response.data;
          setErrors(responseData);
        } else {
          setErrors({ general: 'An error occurred' });
          console.error(error);
        }
      });
  }

  return (
    <div className='w-full h-screen flex justify-between flex-col md:flex-row'>
      <div className='flex-1 bg-[#d6dbf1] text-black flex justify-center items-center'>
        <form className=' text-center  rounded-lg w-[400px] h-[700px] p-9' onSubmit={handleSubmit}>
          {errors.general && <p className="text-red-500">{errors.general}</p>}
          <div className='flex flex-col'>
          <label className='text-left'>First name</label>
          <input className='w-[320px] h-[40px] rounded-lg bg-gray-200 p-5'
            type='text'
            placeholder='Firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)} />
 
          {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
          </div>
          <div className='flex flex-col'>
          <label className='text-left'>Last name</label>
          <input className='w-[320px] h-[40px] rounded-lg bg-gray-200 p-5'
            type='text'
            placeholder='Lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)} />
          {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
          </div>
          <div className='flex flex-col'>
          <label className='text-left'>Email</label>
          <input className='w-[320px] h-[40px] rounded-lg bg-gray-200 p-5'
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className='flex flex-col'>
          <label className='text-left'>Password</label>
          <input className='w-[320px] h-[40px] rounded-lg bg-gray-200 p-5 mt-2'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          </div>
          <button className='w-[320px] h-[40px] border border-black rounded-xl hover:bg-slate-100 font-semibold mt-8' type='submit'>Sign Up</button>
          <div className='pt-4 text-sm text-left'>
         <span>Already have an Account ? <Link to="/login" className='text-sky-900 font-bold'>Log In</Link></span>
          </div>
        </form>
        
                  
      </div>
      <div className='flex-1 '>
               <img src={logo3} alt="Logo" className=" ml-24 mt-12 " />
               <p className='font-bold mt-4 ml-32'>Explore, Describe, and Inscribe Your Stories with D-Scribe! </p>
            </div>
    </div>
  )
}

export default SignUp;
