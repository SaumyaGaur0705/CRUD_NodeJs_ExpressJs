import React, {useState,useEffect} from 'react'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
const intialState={
    name:"",
    email:"",
    contact:"",
};

const AddEdit = () => {
    const [state,setState]=useState(intialState);
    const{name,email,contact}=state;

    const history=useNavigate();
    
    const {id}=useParams();

    useEffect(()=>{
        if(id){
            getSingleUser(id);
        }
    },[id]);

    const getSingleUser=async (id)=>{
    const res=await axios.get(`http://localhost:5000/user/${id}`);
    if(res.status===200 && res.data.length > 0){
        const userData = res.data[0];
        console.log(userData);
        setState({
            name: userData.name || "",  
            email: userData.email || "",
            contact: userData.contact || "",
        });
    }
    };

    const addUser = async (data) => {
        const res=await axios.post("http://localhost:5000/user",data);
        if(res.status===200){
            alert(res.data);
        }
    };

    const updateUser = async (data,id) => {
        const res=await axios.put(`http://localhost:5000/user/${id}`,data);
        if(res.status===200){
            alert(res.data);
        }
    };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if (!name || !email || !contact) {
            alert('Fill all fields');
        }
        else{
          if(!id){  
        await addUser(state);
          }
          else{
              updateUser(state,id);
          }
        history('/');
        }
    }

    const handleInputChnage=(e)=>{
        let {name,value}=e.target;
        setState({...state,[name]: value});
    }
    
  return (
    <div style={{marginTop:"100px"}}>
        <form style={{ margin: "auto", padding: "15px", maxWidth:"400px",alignContent:"center"}} onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input 
            type="text"
            id="name"
            name="name"
            placeholder="Enter your Name"
            onChange={handleInputChnage}
            value={name}
            
            />
             <label htmlFor="email">Email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            onChange={handleInputChnage}
            value={email}
            />
             <label htmlFor="contact">Contact</label>
            <input 
            type="number"
            id="contact"
            name="contact"
            placeholder="Enter your Contact"
            onChange={handleInputChnage}
            value={contact}
            />
            <input type="submit" value={id?"Update":"Add"}/>
        </form>
        
    </div>
  )
}

export default AddEdit