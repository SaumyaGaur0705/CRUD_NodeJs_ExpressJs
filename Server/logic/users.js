import {v4 as uuid } from "uuid";
let users=[];

export const getUsers=(req,res)=>{
    res.send(users);

};

export const createUser=(req,res)=>{
    const user=req.body;
    users.push({id:uuid(),...user});
    res.send("User Added");

};

export const getUser=(req,res)=>{
    
    const singleUser=users.filter((user)=>user.id===req.params.id);
    res.send(singleUser);

};
export const deleteUser=(req,res)=>{
    
    const userIndex=users.findIndex((user)=>user.id===req.params.id);
    users.splice(userIndex,1);
    res.send("Delete Success");

};

export const updateUser=(req,res)=>{
    
    const userIndex=users.findIndex((user)=>user.id===req.params.id);
    users[userIndex]={id:req.params.id,...req.body}; //Don't use just body!!

    //Seperate logic for same thing 

    // const user=users.find((user)=>user.id===parsedId);
    // user.name=req.body.name;
    // user.email=req.body.email;
    // user.contact=req.body.contact;

    res.send("User Updated");

};

export const patchUser=(req,res)=>{
    
    const userIndex=users.findIndex((user)=>user.id===req.params.id);
    users[userIndex]={...users[userIndex],...req.body};
    res.send("Details Patched Up");
};