import {v4 as uuid } from "uuid";
let users=[];

export const getUsers=(req,res)=>{
    res.send(users);

};

export const createUser=(req,res)=>{
    const user=req.body;
    users.push({id:(users.length+1),...user});
    res.send("User Added");

};

export const getUser=(req,res)=>{
    const parsedId=parseInt(req.params.id);
    const singleUser=users.filter((user)=>user.id===parsedId);
    res.send(singleUser);

};
export const deleteUser=(req,res)=>{
    const parsedId=parseInt(req.params.id);
    const userIndex=users.findIndex((user)=>user.id===parsedId);
    users.splice(userIndex,1);
    res.send("Delete Success");

};

export const updateUser=(req,res)=>{
    const parsedId=parseInt(req.params.id);
    const userIndex=users.findIndex((user)=>user.id===parsedId);
    users[userIndex]={id:parsedId,...req.body}; //Don't use just body!!

    //Seperate logic for same thing 

    // const user=users.find((user)=>user.id===parsedId);
    // user.name=req.body.name;
    // user.email=req.body.email;
    // user.contact=req.body.contact;

    res.send("User Updated");

};

export const patchUser=(req,res)=>{
    const parsedId=parseInt(req.params.id);
    const userIndex=users.findIndex((user)=>user.id===parsedId);
    users[userIndex]={...users[userIndex],...req.body};
    res.send("Details Patched Up");
};