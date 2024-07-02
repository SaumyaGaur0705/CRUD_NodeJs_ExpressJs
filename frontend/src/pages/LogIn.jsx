import React, { useState } from 'react';
import axios from 'axios';
import logo3 from "../assests/logo3.png"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            console.log('Response data:', response.data);
            const token = response.data.token;
            console.log('Token:', token);

            //alert(response.data);
            setEmail('');
            setPassword('');
            if (response.data === "User isn't registered. Please Sign Up"||response.data === "Password Incorrect") {
                setError({ general: response.data });
            }
             else {
                navigate('/');
                localStorage.setItem('token', token);
            }
           // window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                setError(responseData);
              } else {
                setError({ general: 'An error occurred' });
                console.error(error);
              }
        }
    }

    return (
        <div className='w-full h-screen flex justify-between flex-col md:flex-row '>
            <div className='flex-1 '>
               <img src={logo3} alt="Logo" className=" ml-12 mt-12 " />
               <p className='font-bold mt-4 ml-20'>Explore, Describe, and Inscribe Your Stories with D-Scribe! </p>
            </div>
            <div className=' flex-1 bg-[#d6dbf1] text-black flex justify-center items-center'>
                <form className='text-center w-[400px] h-3/4 p-8'
                    onSubmit={handleLogin}>
                        {error.general && <p className="text-red-500">{error.general}</p>}
                   
                    {/*Username Input */}
                    <div className='flex flex-col'>
                         <label className='text-left'>Your Email</label>

                                <input className='h-10 rounded-lg bg-gray-200 px-3 mt-2'
                                 type='text'
                                 placeholder='Email'
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 />
                            {error.email && <p className="text-red-500">{error.email}</p>}
                    </div>
                    <div className='flex flex-col'>
                    <label className='text-left'>Password</label>
                    
                    <input className='h-10 rounded-lg bg-gray-200 px-3 mt-2'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />

                    {error.password && <p className="text-red-500">{error.password}</p>}
                    </div>
                    <button className='w-[336px] h-[40px] border border-black rounded-xl hover:bg-slate-100 font-semibold mt-8'
                        type='submit'>Login</button>
                        <div className='pt-4 text-sm text-left'>
                    <span>Don't have an account? <Link to="/signUp" className='text-sky-900 font-bold'>Sign Up</Link></span>
                    </div>
                </form>
                
            </div>
            </div>
            
    )
}

export default Login;
