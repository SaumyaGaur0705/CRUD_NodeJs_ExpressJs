import {v4 as uuid } from "uuid";
import { getusers,getusersid, checkemailexists, adduser,deleteuser,updateuser,userfindid,addfollowing } from "../queries/queries.js";
import { addpost,getposts,deletepostwitid} from "../queries/newpost.js";
import pool from "../db.js";
import fs from "fs";

import path from 'path';
export const getUsers=(req,res)=>{
    pool.query(getusers, (err, result) => {
        if (err) throw err;
        res.status(200).json(result.rows);
    });
    // res.send(users);

};

export const getNoUsers=(req,res)=>{
    res.send('Please Login/SignUp to see the Data');
     
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
    
    // const userIndex=users.findIndex((user)=>user.id===req.params.id);
    // users.splice(userIndex,1);
    // res.send("Delete Success");
    const id=req.params.id;
    pool.query(deleteuser,[id], (err, result) => {
        if (err) throw err;
        res.send("User Delered!!");
    });

};

export const updateUser=(req,res)=>{
    
    // const userIndex=users.findIndex((user)=>user.id===req.params.id);
    // users[userIndex]={id:req.params.id,...req.body}; //Don't use just body!!

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

    // res.send("User Updated");



};


export const myPosts=(req,res)=>{
    pool.query(getposts, (err, result) => {
        if (err) {
            console.error('Error fetching posts:', err);
            return res.status(500).json({ error: 'Error fetching posts' });
          }
          const posts = result.rows.map(post => {
            const imageData = Buffer.from(post.image).toString('base64');
            const imageType = 'image/png';
            const imageSrc = `data:${imageType};base64,${imageData}`;
            return {
              ...post,
              imageData: imageSrc 
            };
          });
      
          res.status(200).json(posts);
        });
      };

export const addPost=(req,res)=>{
    

   console.log(req.body);
   console.log(req.file.path);
   const postid = uuid();
   console.log(postid);
   const imageDataPath = req.file.path;
   fs.readFile(req.file.path, (err, imageData) => {
    if (err) {
      console.error('Error reading image file:', err);
      return res.status(500).json({ error: 'Error reading image file' });
    }

   
    const { title, category, collab, status, text } = req.body;

    const values = [
      postid,
      title,
      category,
      collab === 'true',  
      status,
      text,
      imageData 
    ];

    
    pool.query(addpost, values)
      .then(result => {
        console.log('Post inserted successfully:', result);
        res.status(200).json({ message: 'Post inserted successfully' });
      })
      .catch(err => {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Error inserting data' });
      })
      .finally(() => {
       
        fs.unlink(req.file.path, err => {
          if (err) {
            console.error('Error deleting image file:', err);
          }
        });
      });
  });
};

export const deletepost=(req,res)=>{
  const id=req.params.postid;
  pool.query(deletepostwitid,[id], (err, result) => {
      if (err) throw err;
      res.send("Post Deleted!!");
  });

};


export const followUnfollow= async(req,res)=>{
  try {
		const { id } = req.params;
    const { rows } = await pool.query(userfindid, [id]);
    
    const currentuserid=req.body.id;
    const { rows: userRows } = await pool.query(userfindid, [id]);
    const userToModify = userRows[0];

    // Query the current user
    const { rows: currentRows } = await pool.query(userfindid, [currentuserid]);
    const currentUser = currentRows.length > 0 ? currentRows[0] : null;
    if(id===req.body.id) return res.status(400).json({message:"You can't follow unfollow yourself"});

    if(!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });
     const isFollowing = currentUser.following.includes(id);

     console.log(req.body.id);

     console.log(id);
     console.log(userToModify);
     console.log(currentUser);

     if (isFollowing) {
			pool.query(addfollowing,[userToModify.id,currentUser.id]);
			res.status(200).json({ message: "User unfollowed successfully" });
		} else {
			
			res.status(200).json({ message: "User followed successfully" });
		}

    

	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log("Error in followUnFollowUser: ", err.message);
	}
};