import express from "express";
import {Router} from "express";

import {getUsers, createUser,getUser,deleteUser,updateUser, addPost,myPosts, deletepost,followUnfollow} from "../logic/users.js";
import {checkauth} from "../Middleware/checkauth.js";
import { upload } from "../Middleware/fileupload.js";
const router=Router();
// let users=[];
router.get("/users",checkauth,getUsers);

router.post("/user",checkauth,createUser);

router.post("/addPost",upload.single('image'),addPost)
router.get("/mypost",myPosts);
router.delete("/post/:postid",deletepost);
router.get("/user/:id",getUser);
router.delete("/user/:id",deleteUser);
router.put("/user/:id",updateUser);
router.post("/follow/:id",followUnfollow)
export default router;