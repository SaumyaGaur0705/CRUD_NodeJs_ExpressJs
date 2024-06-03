import React,{useState,useEffect} from 'react'
import {Link} from "react-router-dom";
import axios from "axios";
const Home = () => {
    const [data,setData]=useState([]);
    useEffect(()=>{
        getUsers();
    },[])

    const getUsers= async()=>{
        const res=await axios.get("http://localhost:5000/users");
        if(res.status===200){
            setData(res.data);
        }
    };
    console.log("data " ,data);

const onDelete= async(id)=>{
    const res=await axios.delete(`http://localhost:5000/user/${id}`);
    if(res.status===200){
        alert(res.data);
        getUsers();
    }

}

  return (
    <div style={{marginTop: "150px"}}>
        <table className="styled-table">
           <thead>
            <tr>
                <th style={{textAlign: "center"}}>No.</th>
                <th style={{textAlign: "center"}}>Name </th>
                <th style={{textAlign: "center"}}>Email</th>
                <th style={{textAlign: "center"}}>Contact</th>
                <th style={{textAlign: "center"}}>Action</th>
            </tr>
           </thead>
           <tbody>
            {data &&
            data.map((item,index)=>{
                return (
                    <tr key={index}>
                        <th>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button>Edit</button>
                            </Link>
                            <Link >
                                <button onClick={()=>onDelete(item.id)}>Delete</button>
                            </Link>
                            <Link to={`/view/${item.id}`}>
                                <button>View</button>
                            </Link>
                        </td>
                    </tr>
                )
            })}
           </tbody>
        </table>
        
    </div>
  )
}

export default Home