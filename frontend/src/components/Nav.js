import React, {useState} from 'react'
import {Link} from "react-router-dom";

const Nav = () => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <nav>
      <p>CRUD APPLICATION</p>
      <Link 
        to='/' 
        className={`${activeTab === "Home" ? "active" : ""}`} 
        onClick={() => setActiveTab("Home")}
      >
        Home
      </Link>
      <Link 
        to='/add' 
        className={`${activeTab === "Add User" ? "active" : ""}`} 
        onClick={() => setActiveTab("Add User")}
      >
        Add User
      </Link>
    </nav>
  );
};

export default Nav;
