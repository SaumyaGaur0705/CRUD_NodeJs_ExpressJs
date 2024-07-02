import { checkemailexists, adduser, username } from "../queries/auth.js";
import pool from "../db.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const authsignup= async (req,res)=>{
    const user=req.body;
    const {firstname, lastname, email, password}=user;
    const hashedPassword = await bcrypt.hash(password, 10);
    

    pool.query(checkemailexists,[email],async (err, result) => {
        if (result.rows.length){
            res.send("Email already exists");
        }
        const token= JWT.sign({
            email
        },process.env.JWT_SECRET,{expiresIn:3600000});
        res.json({token});

     pool.query(adduser,[firstname, lastname, email, hashedPassword],(err, result) => {
            if (err) throw err; 
        });

       

    });
};

export const authlogin=(req,res)=>{
const {email,password}=req.body;
try{
pool.query(checkemailexists,[email],async (err, result) => {
    
    if (result.rows.length===0){
        res.send("User isn't registered. Please Sign Up");
    }
    else{
const userpass=result.rows[0].password;
let isMatch=await bcrypt.compare(password,userpass);
if(!isMatch){
    res.send("Password Incorrect");
}
else{
const token= JWT.sign({
    email
},process.env.JWT_SECRET,{expiresIn:3600000});
res.json({ msg:"LogIn Successfull",token });
    }
    }
});
}
catch(error){
    res.status(500).json({error: 'Error Logging'})
}
};

export const usernamedata=(req,res)=>{
    pool.query(username,(err, result) => {
        if (err) {
            console.error('Error fetching pUsers:', err);
            return res.status(500).json({ error: 'Error fetching Users' });
          }
          const users = result.rows.map(user => {
            const username=user.firstname+" "+user.lastname;
            return {
              username
            };
          });
      
          res.status(200).json(users);

    });
}