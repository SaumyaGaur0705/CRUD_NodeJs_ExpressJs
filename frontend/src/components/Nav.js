import React, {useState} from 'react'
import {Link} from "react-router-dom";

const Nav = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div className="header">
      <p className="logo">CRUD APPLICATION</p>
      <div className="header-right">
      <Link 
        to='/' 
      >
        <p className={`${activeTab === "Home" ? "active" : ""}`} 
        onClick={() => setActiveTab("Home")}> Home</p>
       
      </Link>
      <Link 
        to='/add' >
        <p className={`${activeTab === "Add User" ? "active" : ""}`} 
        onClick={() => setActiveTab("Add User")}>  Add User </p>
       
      </Link>
      </div>
    </div>
  );
};

export default Nav;
