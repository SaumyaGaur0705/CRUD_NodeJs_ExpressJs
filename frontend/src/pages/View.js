import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import axios from "axios";

const View = () => {
    const [user,setUser]=useState(null);
const {id}=useParams();

useEffect(()=>{
    if(id){
        getSingleUser(id);
    }
},[id]);

const getSingleUser=async (id)=> {
    const res=await axios.get(`http://localhost:5000/user/${id}`);
    if(res.status===200){
        setUser({...res.data[0]});
    }
};
  return (
    <div>
        <h1>View</h1>
    <div style={{marginTop: "150px", padding:"20px"}}>

        <p>User Details</p>
        <div>
            <strong>ID: </strong>
            <span>{id}</span>
            <br/>
            <br/>
            <strong>Name: </strong>
            <span>{user && user.name}</span>
            <br/>
            <br/>
            <strong>Email: </strong>
            <span>{user && user.email}</span>
            <br/>
            <br/>
            <strong>Contact: </strong>
            <span>{user && user.contact}</span>
            <br/>
            <br/>
            <Link to="/"><button>Go back</button></Link>
        </div>
    </div>
    </div>
  )
}

export default View