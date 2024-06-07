import {v4 as uuid } from "uuid";
import { getusers,getusersid, checkemailexists, adduser,deleteuser,updateuser } from "../queries/queries.js";
import pool from "../db.js";
let users=[];

export const getUsers=(req,res)=>{
   // res.send(users);
   pool.query(getusers, (err, result) => {
    if (err) throw err;
    res.status(200).json(result.rows);
});

};

export const createUser=(req,res)=>{
    const user=req.body;

    const {id,name,email,contact}={id:uuid(),...user};
    pool.query(checkemailexists,[email],(err, result) => {
        if (result.rows.length){
            res.send("Email already exists");
        }
        pool.query(adduser,[id,name,email,contact],(err, result) => {
            if (err) throw err;
            res.send("User Added");
        });
    });

    // users.push({id:uuid(),...user});
    // res.send("User Added");

};

export const getUser=(req,res)=>{
    
    // const singleUser=users.filter((user)=>user.id===req.params.id);
    // res.send(singleUser);
    const id=req.params.id;
    pool.query(getusersid,[id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    });

};
export const deleteUser=(req,res)=>{

    const id=req.params.id;
    pool.query(deleteuser,[id], (err, result) => {
        if (err) throw err;
        res.send("User Delered!!");
    });
    
    // const userIndex=users.findIndex((user)=>user.id===req.params.id);
    // users.splice(userIndex,1);
    // res.send("Delete Success");

};

export const updateUser=(req,res)=>{
    
 
    const{id,name,email,contact}={id:req.params.id,...req.body}; //Don't use just body!!
    
    
        pool.query(updateuser,[id,name,email,contact],(err, result) => {
            if (err) throw err;
            res.send("User Updated");
        });
  
   

    //Seperate logic for same thing 

    // const user=users.find((user)=>user.id===parsedId);
    // user.name=req.body.name;
    // user.email=req.body.email;
    // user.contact=req.body.contact;

   

};

// export const patchUser=(req,res)=>{
    
//     const userIndex=users.findIndex((user)=>user.id===req.params.id);
//     users[userIndex]={...users[userIndex],...req.body};
//     res.send("Details Patched Up");
// };